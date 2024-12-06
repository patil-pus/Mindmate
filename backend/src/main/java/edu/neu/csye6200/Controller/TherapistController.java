package edu.neu.csye6200.Controller;

import edu.neu.csye6200.Config.JwtUtil;
import edu.neu.csye6200.Models.Client;
import edu.neu.csye6200.Models.Therapist;
import edu.neu.csye6200.Services.TherapistService;
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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/therapists")
public class TherapistController {

    @Autowired
    private TherapistService therapistService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Register a new therapist
    @PostMapping("/register")
    public ResponseEntity<Therapist> registerTherapist(@RequestBody Therapist therapist) {
        Therapist registeredTherapist = therapistService.registerTherapist(therapist);
        return ResponseEntity.ok(registeredTherapist);
    }

    // Login for therapist
    @PostMapping("/login")
    public ResponseEntity<?> loginTherapist(@RequestBody Therapist therapist) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(therapist.getUsername(), therapist.getPassword())
            );
        } catch (UsernameNotFoundException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = therapistService.loadUserByUsername(therapist.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        Therapist authenticatedTherapist = therapistService.getTherapistByUserName(therapist.getUsername());
        Integer therapistId = authenticatedTherapist.getId();

        ResponseCookie cookie = ResponseCookie.from("token", jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("therapistId", therapistId, "therapist", authenticatedTherapist, "message", "Login successful"));
    }

    // Retrieve a therapist by ID
    @GetMapping("/{therapistId}")
    public ResponseEntity<Therapist> getTherapist(@PathVariable int therapistId) {
        Therapist therapist = therapistService.getTherapistById(therapistId);
        return ResponseEntity.ok(therapist);
    }

    // Retrieve all therapists
    @GetMapping("/getAllTherapists")
    public ResponseEntity<List<Therapist>> getAllTherapists() {
        List<Therapist> therapists = therapistService.getAllTherapists();
        return ResponseEntity.ok(therapists);
    }

    // Update therapist details
    @PutMapping("/{therapistId}")
    public ResponseEntity<Therapist> updateTherapist(
            @PathVariable int therapistId,
            @RequestBody Therapist updatedTherapist) {
        Therapist therapist = therapistService.updateTherapist(therapistId, updatedTherapist);
        return ResponseEntity.ok(therapist);
    }

    // Assign a client to a therapist
    @PostMapping("/{therapistId}/client/{clientId}")
    public ResponseEntity<Therapist> assignClient(@PathVariable int therapistId, @PathVariable int clientId) {
        therapistService.addClientToTherapist(therapistId, clientId);
        Therapist updatedTherapist = therapistService.getTherapistById(therapistId);
        return ResponseEntity.ok(updatedTherapist);
    }

    // Retrieve all clients assigned to a therapist
    @GetMapping("/{therapistId}/clients")
    public ResponseEntity<List<Client>> getClients(@PathVariable int therapistId) {
        List<Client> clients = therapistService.getClientsByTherapistId(therapistId);
        return ResponseEntity.ok(clients);
    }
}
