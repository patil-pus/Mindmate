package edu.neu.csye6200.Config;

import edu.neu.csye6200.DatabaseFiles.AdminRepository;
import edu.neu.csye6200.Models.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;

@Configuration
public class AdminInitializer {

    private final String adminUsername;
    private final String adminPassword;

    private final AdminRepository adminRepository;

    public AdminInitializer(AdminRepository adminRepository) {
        Dotenv dotenv = Dotenv.load();
        this.adminUsername = dotenv.get("ADMIN_USERNAME");
        this.adminPassword = dotenv.get("ADMIN_PASSWORD");
        this.adminRepository = adminRepository;
    }

    @PostConstruct
    public void initializeAdmin() {
        // Check if an admin already exists
        if (adminRepository.findByUsername(adminUsername) == null) {
            Admin admin = new Admin(adminUsername, adminPassword);
            adminRepository.save(admin);
            System.out.println("Admin user created with username: " + adminUsername);
        } else {
            System.out.println("Admin user already exists with username: " + adminUsername);
        }
    }
}
