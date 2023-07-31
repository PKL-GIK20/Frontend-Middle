package org.example;

public class BankFacade {
    private Account account1;
    private Account account2;
    private Customer customer;
    private Transaction transaction;

    public BankFacade(String accountNumber1, double balance1, String accountNumber2, double balance2,
                      String customerName, String customerAddress) {
        account1 = new Account(accountNumber1, balance1);
        account2 = new Account(accountNumber2, balance2);
        customer = new Customer(customerName, customerAddress);
        transaction = new Transaction();
    }

    public void transferMoney(double amount) {
        transaction.transferMoney(account1, account2, amount);
    }

    public String getAccount1Info() {
        return "Account Number: " + account1.getAccountNumber() + ", Balance: " + account1.getBalance();
    }

    public String getAccount2Info() {
        return "Account Number: " + account2.getAccountNumber() + ", Balance: " + account2.getBalance();
    }

    public String getCustomerInfo() {
        return "Customer Name: " + customer.getName() + ", Address: " + customer.getAddress();
    }
}

