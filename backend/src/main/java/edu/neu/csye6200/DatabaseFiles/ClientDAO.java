package edu.neu.csye6200.DatabaseFiles;

import edu.neu.csye6200.Models.Client;
import edu.neu.csye6200.Models.Therapist;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientDAO extends JpaRepository<Client, Integer> {
    // Custom query to find Client by username (email or another unique field)
    Optional<Client> findByUsername(String username);
}

//
//    public void saveClient(Client client) {
//        Transaction transaction = null;
//        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
//            transaction = session.beginTransaction();
//
//            Therapist therapist = client.getTherapist();
//            if (therapist != null && therapist.getId() == 0) {
//                session.save(therapist);  // Save the therapist first
//            }
//
//            session.save(client);  // Then save the client
//            transaction.commit();
//        } catch (Exception e) {
//            if (transaction != null) {
//                transaction.rollback();
//            }
//            e.printStackTrace();
//        }
//    }

