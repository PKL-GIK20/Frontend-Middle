package org.example;

public class Transaction {
    public void transferMoney(Account fromAccount, Account toAccount, double amount) {
        fromAccount.withdraw(amount);
        toAccount.deposit(amount);
        System.out.println("Transfer berhasil.");
    }
}

