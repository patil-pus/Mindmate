package edu.neu.csye6200;


import edu.neu.csye6200.DatabaseFiles.DatabaseUtil;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Scanner;

@SpringBootApplication
public class Driver {
	public static void main(String[] args) {
		//Dotenv dotenv = Dotenv.configure().load();
		DatabaseUtil.createDatabaseIfNotExists();
		SpringApplication.run(Driver.class, args);
	}
}
