package edu.neu.csye6200.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Client")
public class Client implements Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "age")
    private int age;

    @Column(name = "sex")
    private String sex;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "profession")
    private String profession;

    @Column(name = "role")
    private String role = "client";

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<JournalEntry> journalEntries = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

    public Client() {}

    public Client(String name, int age, String sex, String username, String password, String profession, String role) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.username = username;
        this.password = password;
        this.profession = profession;
        this.role = role;
    }


    @Override
    public int getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }
    

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int getAge() {
        return age;
    }

    @Override
    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String getSex() {
        return sex;
    }

    @Override
    public void setSex(String sex) {
        this.sex = sex;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }


    @Column(name = "image_url", length = 512)
    private String imageUrl;

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getRole() {
        return role;
    }

    @Override
    public void setRole(String role) {
        this.role = role;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public Therapist getTherapist() {
        return therapist;
    }

    public void setTherapist(Therapist therapist) {
        this.therapist = therapist;
    }

    public List<JournalEntry> getJournalEntries() {
        return journalEntries;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void addJournalEntry(JournalEntry entry) {
        entry.setClient(this);
        this.journalEntries.add(entry);
    }

    public void assignTherapist(Therapist therapist) {
        this.therapist = therapist;
        therapist.addClient(this);
    }

    @Override
    public String toString() {
        return "Name: " + name + ", Age: " + age + ", Sex: " + sex + ", Username: " + username +
                ", Profession: " + profession;
    }
}