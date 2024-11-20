package edu.neu.csye6200.Models;

public interface Person {

    // Method signatures for common properties
    int getId();
    String getName();
    void setName(String name);
    int getAge();
    void setAge(int age);
    String getSex();
    void setSex(String sex);
    String getUsername();
    void setUsername(String username);
    String getPassword();
    void setPassword(String password);
    String getRole();
    void setRole(String role);

    @Override
    String toString();
}
