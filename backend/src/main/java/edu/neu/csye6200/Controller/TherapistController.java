package edu.neu.csye6200.Controller;

import edu.neu.csye6200.Config.JwtUtil;
import edu.neu.csye6200.Models.Client;
import edu.neu.csye6200.Models.Therapist;
import edu.neu.csye6200.Services.TherapistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> loginTherapist(@RequestBody Therapist therapist) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(therapist.getUsername(), therapist.getPassword())
            );

            // Generate JWT after successful login
            final UserDetails userDetails = therapistService.loadUserByUsername(therapist.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails.getUsername());
            return ResponseEntity.ok(jwt);  // Return the JWT token

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Incorrect username or password");
        }
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
