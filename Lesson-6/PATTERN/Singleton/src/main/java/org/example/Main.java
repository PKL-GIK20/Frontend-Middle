package org.example;

public class Main {
    public static void main(String[] args) {
        // Mendapatkan instansi dari DatabaseConnection
        DatabaseConnection connection1 = DatabaseConnection.getInstance();
        DatabaseConnection connection2 = DatabaseConnection.getInstance();

        // Memastikan connection1 dan connection2 adalah objek yang sama
        if (connection1 == connection2) {
            System.out.println("connection1 dan connection2 adalah objek yang sama.");
        } else {
            System.out.println("connection1 dan connection2 adalah objek yang berbeda.");
        }

        // Mengakses koneksi database
        System.out.println("Database Connection String: " + connection1.getConnectionString());
    }
}
