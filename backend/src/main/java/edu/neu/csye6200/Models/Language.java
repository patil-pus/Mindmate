package edu.neu.csye6200.Models;

import javax.persistence.*;

@Entity
@Table(name = "Language")
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int languageId;

    @Column(name = "name", nullable = false)
    private String name;  // Name of the language (e.g., English, Spanish)

    // Default constructor
    public Language() {}

    // Constructor with parameters
    public Language(String name) {
        this.name = name;
    }

    // Getters and Setters
    public int getLanguageId() {
        return languageId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Language [Name=" + name + "]";
    }
}
