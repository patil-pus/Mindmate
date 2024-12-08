package edu.neu.csye6200.Controller;

import edu.neu.csye6200.Config.JwtUtil;
import edu.neu.csye6200.Models.Client;
import edu.neu.csye6200.Models.Therapist;
import edu.neu.csye6200.Services.TherapistService;
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
    public ResponseEntity<?> registerTherapist(@RequestBody Therapist therapist) {
        // Basic validation checks
        if (therapist.getUsername() == null || therapist.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is required for therapist."));
        }
        if (therapist.getPassword() == null || therapist.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password is required for therapist."));
        }
        if (therapist.getName() == null || therapist.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Name is required for therapist."));
        }
        if (therapist.getLocation() == null || therapist.getLocation().trim().isEmpty() ||
                therapist.getSpecialization() == null || therapist.getSpecialization().trim().isEmpty() ||
                therapist.getLanguage() == null || therapist.getLanguage().trim().isEmpty() ||
                therapist.getInsurance() == null || therapist.getInsurance().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Location, specialization, language, and insurance are required for therapist."));
        }

        try {
            Therapist registeredTherapist = therapistService.registerTherapist(therapist);
            return ResponseEntity.ok(registeredTherapist);
        } catch (Exception e) {
            System.err.println("Error registering therapist: " + e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of("message", "Internal server error while registering therapist."));
        }
    }

    // Login for therapist
    @PostMapping("/login")
    public ResponseEntity<?> loginTherapist(@RequestBody Therapist therapist) throws Exception {
        if (therapist.getUsername() == null || therapist.getUsername().trim().isEmpty() ||
                therapist.getPassword() == null || therapist.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username and password are required for therapist login."));
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(therapist.getUsername(), therapist.getPassword())
            );
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(401).body(Map.of("message", "Incorrect username or password."));
        }

        final UserDetails userDetails = therapistService.loadUserByUsername(therapist.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername()+"::"+ UserType.THERAPIST.toString());

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

    @GetMapping("/{therapistId}")
    public ResponseEntity<Therapist> getTherapist(@PathVariable int therapistId) {
        Therapist therapist = therapistService.getTherapistById(therapistId);
        if (therapist != null) {
            return ResponseEntity.ok(therapist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAllTherapists")
    public ResponseEntity<List<Therapist>> getAllTherapists() {
        List<Therapist> therapists = therapistService.getAllTherapists();
        return ResponseEntity.ok(therapists);
    }

    @PutMapping("/{therapistId}")
    public ResponseEntity<Therapist> updateTherapist(
            @PathVariable int therapistId,
            @RequestBody Therapist updatedTherapist) {
        Therapist therapist = therapistService.updateTherapist(therapistId, updatedTherapist);
        return ResponseEntity.ok(therapist);
    }

    @PostMapping("/{therapistId}/client/{clientId}")
    public ResponseEntity<Therapist> assignClient(@PathVariable int therapistId, @PathVariable int clientId) {
        therapistService.addClientToTherapist(therapistId, clientId);
        Therapist updatedTherapist = therapistService.getTherapistById(therapistId);
        return ResponseEntity.ok(updatedTherapist);
    }

    @GetMapping("/{therapistId}/clients")
    public ResponseEntity<List<Client>> getClients(@PathVariable int therapistId) {
        List<Client> clients = therapistService.getClientsByTherapistId(therapistId);
        return ResponseEntity.ok(clients);
    }
}
