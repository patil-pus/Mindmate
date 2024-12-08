package edu.neu.csye6200.Services;
import java.util.ArrayList;
import java.util.List;

import edu.neu.csye6200.DatabaseFiles.ClientDAO;
import edu.neu.csye6200.DatabaseFiles.TherapistDAO;
import edu.neu.csye6200.Models.Client;
import edu.neu.csye6200.Models.JournalEntry;
import edu.neu.csye6200.Models.Therapist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService implements UserDetailsService {

    @Autowired
    private ClientDAO clientDAO;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TherapistDAO therapistDAO;

    // Register a new client
    public Client registerClient(Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        return clientDAO.save(client);
    }

    // Add a journal entry to a client's list of entries
    public void addJournalEntry(int clientId, JournalEntry journalEntry) {
        
        Optional<Client> clientOpt = clientDAO.findById(clientId);
        if (clientOpt.isPresent()) {
            Client client = clientOpt.get();
            journalEntry.setClient(client);  // Set the client reference in the journal entry
            client.addJournalEntry(journalEntry);  // Add entry to client's journal entries
            clientDAO.save(client);  // Save the client with the new entry
        } else {
            throw new IllegalArgumentException("Client with id " + clientId + " not found.");
        }
    }

    public List<JournalEntry> getJournalEntriesByClientId(int clientId) {
        Optional<Client> clientOpt = clientDAO.findById(clientId);
        if (clientOpt.isPresent()) {
            return clientOpt.get().getJournalEntries();
        } else {
            throw new IllegalArgumentException("Client with id " + clientId + " not found.");
        }
    }

    // Assign a therapist to a client
    public void assignTherapist(int clientId, int therapistId) {
        Optional<Client> clientOpt = clientDAO.findById(clientId);
        Optional<Therapist> therapistOpt = therapistDAO.findById(therapistId);
        if (clientOpt.isPresent() && therapistOpt.isPresent()) {
            Client client = clientOpt.get();
            Therapist therapist = therapistOpt.get();
            client.assignTherapist(therapist);  // Establish client-therapist association
            clientDAO.save(client);  // Save updated client
        } else {
            throw new IllegalArgumentException("Client or Therapist not found.");
        }
    }

    // Retrieve client by ID
    public Client getClientById(int clientId) {
        return clientDAO.findById(clientId).orElse(null);
    }

    public Client getClientByUserName(String username)  throws UsernameNotFoundException{
        Optional<Client> clientOpt = clientDAO.findByUsername(username);
        if (!clientOpt.isPresent()) {
            throw new UsernameNotFoundException("Client not found with username: " + username);
        }

        Client client = clientOpt.get();

        return client;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find the client by username (assumed to be email or similar identifier)
        Optional<Client> clientOpt = clientDAO.findByUsername(username);

        if (!clientOpt.isPresent()) {
            throw new UsernameNotFoundException("Client not found with username: " + username);
        }

        Client client = clientOpt.get();

        // Create a UserDetails object that Spring Security can use
        return new User(client.getUsername(), client.getPassword(), new ArrayList<>());  // Roles/authorities can be passed if needed
    }


    // Retrieve all journal entries for a client
    public List<JournalEntry> getJournalEntries(int clientId) {
        Optional<Client> clientOpt = clientDAO.findById(clientId);
        if (clientOpt.isPresent()) {
            return clientOpt.get().getJournalEntries();
        } else {
            throw new IllegalArgumentException("Client with id " + clientId + " not found.");
        }
    }
}
