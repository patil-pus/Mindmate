package edu.neu.csye6200.Models;

import javax.persistence.*;

@Entity
@Table(name = "Insurance")
public class Insurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int insuranceId;

    @Column(name = "name", nullable = false)
    private String name;  // Name of the insurance provider

    @Column(name = "coverageDetails")
    private String coverageDetails;  // Brief description of coverage

    @Column(name = "contactInfo")
    private String contactInfo;  // Contact information for the insurance provider

    // Default constructor
    public Insurance() {}

    // Constructor with parameters
    public Insurance(String name, String coverageDetails, String contactInfo) {
        this.name = name;
        this.coverageDetails = coverageDetails;
        this.contactInfo = contactInfo;
    }

    // Getters and Setters
    public int getInsuranceId() {
        return insuranceId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCoverageDetails() {
        return coverageDetails;
    }

    public void setCoverageDetails(String coverageDetails) {
        this.coverageDetails = coverageDetails;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    @Override
    public String toString() {
        return "Insurance [Name=" + name + ", Coverage Details=" + coverageDetails + ", Contact Info=" + contactInfo + "]";
    }
}
