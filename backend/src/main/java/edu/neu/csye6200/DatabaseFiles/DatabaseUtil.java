package edu.neu.csye6200.DatabaseFiles;
import io.github.cdimascio.dotenv.Dotenv;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.SQLException;

public class DatabaseUtil {
    public static void createDatabaseIfNotExists() {
        Dotenv dotenv = Dotenv.configure().directory("./src/main/resources").load();
        String dbUrl = dotenv.get("DB_URL");
        String dbName = dotenv.get("DB_NAME");
        String user = dotenv.get("DB_USERNAME");
        String password = dotenv.get("DB_PASSWORD");

        Connection connection = null;
        Statement statement = null;

        try {
            // Connect to MySQL without specifying the database
            connection = DriverManager.getConnection(dbUrl, user, password);
            statement = connection.createStatement();

            // Create the database if it doesn't exist
            String sql = "CREATE DATABASE IF NOT EXISTS " + dbName;
            statement.executeUpdate(sql);
            System.out.println("Database " + dbName + " checked/created successfully.");

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
