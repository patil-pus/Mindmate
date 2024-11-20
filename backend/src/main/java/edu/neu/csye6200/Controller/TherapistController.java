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
import org.springframework.security.core.AuthenticationException;
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
        therapistService.registerTherapist(therapist);
        return ResponseEntity.ok(therapist);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginTherapist(@RequestBody Therapist therapist) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(therapist.getUsername(), therapist.getPassword()));
        } catch (UsernameNotFoundException e) {
            throw new Exception("Incorrect username or password", e);
        }
        // Generate JWT after successful login
        final UserDetails userDetails = therapistService.loadUserByUsername(therapist.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        Therapist getAuthenticatedTherapist = therapistService.getTherapistByUserName(therapist.getUsername());
        Integer therapistId = getAuthenticatedTherapist.getId();

        ResponseCookie cookie = ResponseCookie.from("token", jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("therapistId", therapistId, "therapist", getAuthenticatedTherapist, "message",
                        "Login successful"));
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

    // Get all clients assigned to a specific therapist
    @GetMapping("/{therapistId}/clients")
    public ResponseEntity<List<Client>> getClients(@PathVariable int therapistId) {
        Therapist therapist = therapistService.getTherapistById(therapistId);
        if (therapist != null) {
            List<Client> clients = therapist.getClients();
            return ResponseEntity.ok(clients);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
