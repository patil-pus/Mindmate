package edu.neu.csye6200.Controller;

import edu.neu.csye6200.Config.JwtUtil;
import edu.neu.csye6200.Models.Client;
import edu.neu.csye6200.Models.JournalEntry;
import edu.neu.csye6200.Services.ClientService;
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

    //register
    @PostMapping("/register")
    public ResponseEntity<Client> registerClient(@RequestBody Client client) {
        Client registeredClient = clientService.registerClient(client); // Save the client and retrieve the saved instance
        return ResponseEntity.ok(registeredClient); // Return the registered client in the response
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginClient(@RequestBody Client client) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(client.getUsername(), client.getPassword())
            );
        } catch (UsernameNotFoundException e) {
            throw new Exception("Incorrect username or password", e);
        }
        // Generate JWT after successful login
        final UserDetails userDetails = clientService.loadUserByUsername(client.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

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

    // Endpoint to add a journal entry to a client
    @PostMapping("/{clientId}/journal")
    public ResponseEntity<String> addJournalEntry(@PathVariable int clientId, @RequestBody JournalEntry entry) {
        entry.setEntryDate(new Date());  // Set the current date for the journal entry
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

    // Endpoint to assign a therapist to a client
    @PostMapping("/{clientId}/therapist/{therapistId}")
    public ResponseEntity<Client> assignTherapist(@PathVariable int clientId, @PathVariable int therapistId) {
        clientService.assignTherapist(clientId, therapistId);
        Client updatedClient = clientService.getClientById(clientId);
        return ResponseEntity.ok(updatedClient);
    }

    // Endpoint to retrieve a client by ID
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
