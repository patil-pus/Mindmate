package edu.neu.csye6200.Controller;

import edu.neu.csye6200.Models.Session;
import edu.neu.csye6200.Services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    // Add a new session between a client and a therapist
    @PostMapping
    public ResponseEntity<Session> createSession(@RequestBody Session session) {
        sessionService.addSession(session);
        return ResponseEntity.ok(session);
    }

    // Get session by session ID
    @GetMapping("/{sessionId}")
    public ResponseEntity<Session> getSessionById(@PathVariable int sessionId) {
        return ResponseEntity.ok(sessionService.getSessionById(sessionId));
    }

    // Get all sessions for a specific client
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Session>> getSessionsByClientId(@PathVariable int clientId) {
        return ResponseEntity.ok(sessionService.getSessionsByClientId(clientId));
    }

    // Get all sessions for a specific therapist
    @GetMapping("/therapist/{therapistId}")
    public ResponseEntity<List<Session>> getSessionsByTherapistId(@PathVariable int therapistId) {
        return ResponseEntity.ok(sessionService.getSessionsByTherapistId(therapistId));
    }
}
