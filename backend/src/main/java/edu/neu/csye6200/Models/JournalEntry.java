package edu.neu.csye6200.Models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "JournalEntry")
public class JournalEntry extends Journal{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(name = "mood")
    private String mood;

    public JournalEntry(Date entryDate, String content, Client client, String mood) {
        super(entryDate, content);
        this.client = client;
        this.mood = mood;
    }

    public JournalEntry() {}

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @Override
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    @Override
    public void displayEntry() {
        System.out.println("Mood: " + mood + ", Content: " + getContent() + ", Date: " + getEntryDate());
    }
}