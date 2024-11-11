package edu.neu.csye6200.DatabaseFiles;

import edu.neu.csye6200.Models.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionDAO extends JpaRepository<Session, Integer> {

    // Find all sessions by client ID
    List<Session> findByClientId(int clientId);

    // Find all sessions by therapist ID
    List<Session> findByTherapistId(int therapistId);
}
