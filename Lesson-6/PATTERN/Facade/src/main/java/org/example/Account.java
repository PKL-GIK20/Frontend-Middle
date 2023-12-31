package org.example;

public class Account {
    private String accountNumber;
    private double balance;

    public Account(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    // Metode untuk menambah saldo
    public void deposit(double amount) {
        balance += amount;
    }

    // Metode untuk mengurangi saldo
    public void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Saldo tidak cukup.");
        }
    }
}

