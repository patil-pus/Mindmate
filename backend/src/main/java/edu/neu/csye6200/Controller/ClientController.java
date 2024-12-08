package edu.neu.csye6200.Controller;

import edu.neu.csye6200.Config.JwtUtil;
import edu.neu.csye6200.Models.Client;
import edu.neu.csye6200.Models.JournalEntry;
import edu.neu.csye6200.Services.ClientService;
import edu.neu.csye6200.enums.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Register a new client
    @PostMapping("/register")
    public ResponseEntity<?> registerClient(@RequestBody Client client) {
        // Basic validation checks
        if (client.getUsername() == null || client.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is required."));
        }
        if (client.getPassword() == null || client.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password is required."));
        }
        if (client.getName() == null || client.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Name is required."));
        }
        if (client.getProfession() == null || client.getProfession().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Profession is required for a client."));
        }

        try {
            Client registeredClient = clientService.registerClient(client);
            return ResponseEntity.ok(registeredClient);
        } catch (Exception e) {
            // Log the error and return a 500 with a message
            System.err.println("Error registering client: " + e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of("message", "Internal server error while registering client."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginClient(@RequestBody Client client) throws Exception {
        if (client.getUsername() == null || client.getUsername().trim().isEmpty() ||
                client.getPassword() == null || client.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username and password are required."));
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(client.getUsername(), client.getPassword())
            );
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(401).body(Map.of("message", "Incorrect username or password."));
        }

        final UserDetails userDetails = clientService.loadUserByUsername(client.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername()+"::"+ UserType.CLIENT.toString());

        Client getAuthenticatedClient = clientService.getClientByUserName(client.getUsername());
        Integer clientId = getAuthenticatedClient.getId();

        ResponseCookie cookie = ResponseCookie.from("token", jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("clientId", clientId, "client", getAuthenticatedClient, "message", "Login successful"));
    }

    @PostMapping("/{clientId}/journal")
    public ResponseEntity<String> addJournalEntry(@PathVariable int clientId, @RequestBody JournalEntry entry) {
        entry.setEntryDate(new Date());
        clientService.addJournalEntry(clientId, entry);
        return ResponseEntity.ok("Journal entry added successfully");
    }

    @GetMapping("/{clientId}/getJournal")
    public ResponseEntity<List<JournalEntry>> getJournalEntries(@PathVariable int clientId) {
        List<JournalEntry> journalEntries = clientService.getJournalEntriesByClientId(clientId);
        if (journalEntries != null && !journalEntries.isEmpty()) {
            return ResponseEntity.ok(journalEntries);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping("/{clientId}/therapist/{therapistId}")
    public ResponseEntity<Client> assignTherapist(@PathVariable int clientId, @PathVariable int therapistId) {
        clientService.assignTherapist(clientId, therapistId);
        Client updatedClient = clientService.getClientById(clientId);
        return ResponseEntity.ok(updatedClient);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<Client> getClient(@PathVariable int clientId) {
        Client client = clientService.getClientById(clientId);
        if (client != null) {
            return ResponseEntity.ok(client);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
