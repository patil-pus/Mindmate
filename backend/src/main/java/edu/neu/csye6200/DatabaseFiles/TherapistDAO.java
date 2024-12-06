package edu.neu.csye6200.DatabaseFiles;

import edu.neu.csye6200.Models.Therapist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TherapistDAO extends JpaRepository<Therapist, Integer> {
    Optional<Therapist> findByUsername(String username);
}
