package edu.neu.csye6200.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Therapist")
public class Therapist implements Person {
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

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "insurance")
    private String insurance;

    @Column(name = "location")
    private String location;

    @Column(name = "language")
    private String language;

    @Column(name = "role")
    private String role = "therapist";

    @Column(name = "image_url", length = 512)
    private String imageUrl;

    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference(value = "client-therapist")
    private List<Client> clients = new ArrayList<>();

    // Constructors
    public Therapist() {
    }

    public Therapist(String name, int age, String sex, String username, String password, String specialization,
                     String insurance, String location, String language, String role, String imageUrl) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.username = username;
        this.password = password;
        this.specialization = specialization;
        this.insurance = insurance;
        this.location = location;
        this.language = language;
        this.role = role;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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

    public String getInsurance() {
        return insurance;
    }

    public void setInsurance(String insurance) {
        this.insurance = insurance;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<Client> getClients() {
        return clients;
    }

    public void setClients(List<Client> clients) {
        this.clients = clients;
    }

    // Add a client to the therapist's list
    public void addClient(Client client) {
        if (!clients.contains(client)) {
            clients.add(client);
            client.setTherapist(this);
        }
    }

    // Remove a client from the therapist's list
    public void removeClient(Client client) {
        if (clients.contains(client)) {
            clients.remove(client);
            client.setTherapist(null);
        }
    }

    @Override
    public String toString() {
        return "Name: " + name + ", Age: " + age + ", Sex: " + sex + ", Username: " + username +
                ", Specialization: " + specialization + ", Location: " + location + ", Image URL: " + imageUrl;
    }
}
