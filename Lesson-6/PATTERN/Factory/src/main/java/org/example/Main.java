package org.example;


import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        FactoryBentukGeometri factory = new FactoryBentukGeometri();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Pilih jenis bentuk geometri: ");
        System.out.println("1. Persegi");
        System.out.println("2. Lingkaran");
        System.out.println("3. Segitiga");
        System.out.print("Pilihan Anda: ");
        int pilihan = scanner.nextInt();

        BentukGeometri bentuk = null;

        if (pilihan == 1) {
            System.out.print("Masukkan panjang sisi persegi: ");
            double sisi = scanner.nextDouble();
            bentuk = factory.createBentuk("persegi");
            ((Persegi) bentuk).setSisi(sisi);
        } else if (pilihan == 2) {
            System.out.print("Masukkan jari-jari lingkaran: ");
            double jariJari = scanner.nextDouble();
            bentuk = factory.createBentuk("lingkaran");
            ((Lingkaran) bentuk).setJariJari(jariJari);
        } else if (pilihan == 3) {
            System.out.print("Masukkan panjang alas segitiga: ");
            double alas = scanner.nextDouble();
            System.out.print("Masukkan tinggi segitiga: ");
            double tinggi = scanner.nextDouble();
            System.out.print("Masukkan panjang sisi 1 segitiga: ");
            double sisi1 = scanner.nextDouble();
            System.out.print("Masukkan panjang sisi 2 segitiga: ");
            double sisi2 = scanner.nextDouble();
            System.out.print("Masukkan panjang sisi 3 segitiga: ");
            double sisi3 = scanner.nextDouble();
            bentuk = factory.createBentuk("segitiga");
            ((Segitiga) bentuk).setAlas(alas);
            ((Segitiga) bentuk).setTinggi(tinggi);
            ((Segitiga) bentuk).setSisi1(sisi1);
            ((Segitiga) bentuk).setSisi2(sisi2);
            ((Segitiga) bentuk).setSisi3(sisi3);
        } else {
            System.out.println("Pilihan tidak valid.");
            System.exit(0);
        }

        if (bentuk != null) {
            System.out.println("Jenis Bentuk: " + bentuk.getJenis());
            System.out.println("Luas: " + bentuk.hitungLuas());
            System.out.println("Keliling: " + bentuk.hitungKeliling());
        }

        scanner.close();
    }
}
