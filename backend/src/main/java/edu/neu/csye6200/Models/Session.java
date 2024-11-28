package edu.neu.csye6200.Models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Session")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sessionId;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "therapist_id", nullable = false)
    private Therapist therapist;

    @Column(name = "sessionDate", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date sessionDate;

    @Column(name = "duration", nullable = false)
    private int duration;
    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private String status;  // Status of the session (e.g., scheduled, completed, canceled)

    // Default constructor
    public Session() {}

    // Getters and Setters

    public int getSessionId() {
        return sessionId;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Therapist getTherapist() {
        return therapist;
    }

    public void setTherapist(Therapist therapist) {
        this.therapist = therapist;
    }

    public Date getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(Date sessionDate) {
        this.sessionDate = sessionDate;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
