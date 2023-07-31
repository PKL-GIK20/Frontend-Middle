package org.example;

public class Main {
    public static void main(String[] args) {
        BankFacade bankFacade = new BankFacade("123456", 1000, "987654", 2000, "John Doe", "123 Main Street");

        System.out.println("Customer Info: " + bankFacade.getCustomerInfo());
        System.out.println("Account 1 Info: " + bankFacade.getAccount1Info());
        System.out.println("Account 2 Info: " + bankFacade.getAccount2Info());

        bankFacade.transferMoney(500);
        System.out.println("Account 1 Info: " + bankFacade.getAccount1Info());
        System.out.println("Account 2 Info: " + bankFacade.getAccount2Info());
    }
}
