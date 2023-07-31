package org.example;

public class Main {
    public static void main(String[] args) {
        // Pesan minuman biasa
        Minuman minuman1 = new MinumanBiasa();
        System.out.println("Pesanan 1: " + minuman1.getDeskripsi() + ", Harga: " + minuman1.harga() + " USD");

        // Pesan minuman dengan tambahan gula
        Minuman minuman2 = new Gula(new MinumanBiasa());
        System.out.println("Pesanan 2: " + minuman2.getDeskripsi() + ", Harga: " + minuman2.harga() + " USD");

        // Pesan minuman dengan tambahan susu dan gula
        Minuman minuman3 = new Susu(new Gula(new MinumanBiasa()));
        System.out.println("Pesanan 3: " + minuman3.getDeskripsi() + ", Harga: " + minuman3.harga() + " USD");

        // Pesan minuman dengan tambahan whip cream, susu, dan gula
        Minuman minuman4 = new WhipCream(new Susu(new Gula(new MinumanBiasa())));
        System.out.println("Pesanan 4: " + minuman4.getDeskripsi() + ", Harga: " + minuman4.harga() + " USD");
    }
}
