package edu.neu.csye6200.Services;


import edu.neu.csye6200.DatabaseFiles.SessionDAO;
import edu.neu.csye6200.Models.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    @Autowired
    private SessionDAO sessionDAO;

    // Add a new session
    public void addSession(Session session) {
        sessionDAO.save(session);  // Save the session to the database
    }

    // Retrieve a session by its ID
    public Session getSessionById(int sessionId) {
        return sessionDAO.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session with id " + sessionId + " not found."));
    }

    // Retrieve all sessions for a specific client
    public List<Session> getSessionsByClientId(int clientId) {
        return sessionDAO.findByClientId(clientId);
    }

    // Retrieve all sessions for a specific therapist
    public List<Session> getSessionsByTherapistId(int therapistId) {
        return sessionDAO.findByTherapistId(therapistId);
    }
}

