package edu.neu.csye6200.Services;

import edu.neu.csye6200.DatabaseFiles.TherapistDAO;
import edu.neu.csye6200.DatabaseFiles.ClientDAO;
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
import java.util.List;
import java.util.Optional;

@Service
public class TherapistService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final TherapistDAO therapistDAO;
    private final ClientDAO clientDAO;

    @Autowired
    public TherapistService(PasswordEncoder passwordEncoder, TherapistDAO therapistDAO, ClientDAO clientDAO) {
        this.passwordEncoder = passwordEncoder;
        this.therapistDAO = therapistDAO;
        this.clientDAO = clientDAO;
    }

    public Therapist registerTherapist(Therapist therapist) {
        therapist.setPassword(passwordEncoder.encode(therapist.getPassword()));
        return therapistDAO.save(therapist);
    }

    public Therapist getTherapistById(int therapistId) {
        return therapistDAO.findById(therapistId)
                .orElseThrow(() -> new IllegalArgumentException("Therapist with id " + therapistId + " not found."));
    }

    public Therapist getTherapistByUserName(String username) throws UsernameNotFoundException {
        return therapistDAO.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Therapist not found with username: " + username));
    }

    public List<Therapist> getAllTherapists() {
        return therapistDAO.findAll();
    }

    public Therapist updateTherapist(int therapistId, Therapist updatedTherapist) {
        Therapist existingTherapist = getTherapistById(therapistId);
        if (updatedTherapist.getName() != null) {
            existingTherapist.setName(updatedTherapist.getName());
        }
        if (updatedTherapist.getSpecialization() != null) {
            existingTherapist.setSpecialization(updatedTherapist.getSpecialization());
        }
        if (updatedTherapist.getLocation() != null) {
            existingTherapist.setLocation(updatedTherapist.getLocation());
        }
        if (updatedTherapist.getInsurance() != null) {
            existingTherapist.setInsurance(updatedTherapist.getInsurance());
        }
        if (updatedTherapist.getImageUrl() != null) {
            existingTherapist.setImageUrl(updatedTherapist.getImageUrl());
        }
        return therapistDAO.save(existingTherapist);
    }

    public void addClientToTherapist(int therapistId, int clientId) {
        Therapist therapist = getTherapistById(therapistId);
        Client client = clientDAO.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client with id " + clientId + " not found."));
        therapist.getClients().add(client);
        client.setTherapist(therapist);
        therapistDAO.save(therapist);
        clientDAO.save(client);
    }

    public List<Client> getClientsByTherapistId(int therapistId) {
        Therapist therapist = getTherapistById(therapistId);
        return therapist.getClients();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Therapist therapist = getTherapistByUserName(username);
        return new User(therapist.getUsername(), therapist.getPassword(), new ArrayList<>());
    }
}
