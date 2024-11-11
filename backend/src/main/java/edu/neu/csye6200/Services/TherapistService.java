package edu.neu.csye6200.Services;

import edu.neu.csye6200.DatabaseFiles.TherapistDAO;
import edu.neu.csye6200.Models.Client;
import edu.neu.csye6200.Models.Therapist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class TherapistService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TherapistDAO therapistDAO;

    // Register a new therapist
    public Therapist registerTherapist(Therapist therapist) {
        therapist.setPassword(passwordEncoder.encode(therapist.getPassword()));
        return therapistDAO.save(therapist);
    }

    // Retrieve a therapist by ID
    public Therapist getTherapistById(int therapistId) {
        return therapistDAO.findById(therapistId)
                .orElseThrow(() -> new IllegalArgumentException("Therapist with id " + therapistId + " not found."));
    }

    // Add a client to a therapist's client list
    public void addClientToTherapist(int therapistId, Client client) {
        Therapist therapist = therapistDAO.findById(therapistId)
                .orElseThrow(() -> new IllegalArgumentException("Therapist with id " + therapistId + " not found."));

        // Check if the client is already assigned to the therapist
        if (!therapist.getClients().contains(client)) {
            therapist.addClient(client);  // Adds client to therapist's list and sets therapist reference in Client
            therapistDAO.save(therapist);  // Save the updated therapist
        } else {
            throw new IllegalStateException("Client is already assigned to this therapist.");
        }
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Therapist> therapistOpt = therapistDAO.findByUsername(username);
        if (!therapistOpt.isPresent()) {
            throw new UsernameNotFoundException("Therapist not found with username: " + username);
        }

        Therapist therapist = therapistOpt.get();

        // Create a UserDetails object that Spring Security can use
        return new User(therapist.getUsername(), therapist.getPassword(), new ArrayList<>());  // Roles/authorities can be passed if needed
    }

    // Remove a client from a therapist's client list
    public void removeClientFromTherapist(int therapistId, Client client) {
        Therapist therapist = therapistDAO.findById(therapistId)
                .orElseThrow(() -> new IllegalArgumentException("Therapist with id " + therapistId + " not found."));

        if (therapist.getClients().contains(client)) {
            therapist.removeClient(client);  // Removes client from therapist's list and clears therapist reference in Client
            therapistDAO.save(therapist);  // Save the updated therapist
        } else {
            throw new IllegalStateException("Client is not assigned to this therapist.");
        }
    }
}
