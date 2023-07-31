package org.example;

public class DatabaseConnection {
    private static DatabaseConnection instance;
    private String connectionString;

    private DatabaseConnection() {
        // Private constructor to prevent external instantiation
        // In a real implementation, you would set the database connection details here.
        connectionString = "jdbc:mysql://localhost:3306/mydatabase";
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }

    public String getConnectionString() {
        return connectionString;
    }

    // Add other database-related methods here
}
