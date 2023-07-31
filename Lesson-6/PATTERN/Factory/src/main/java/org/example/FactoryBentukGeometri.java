package org.example;

public class FactoryBentukGeometri {
    public BentukGeometri createBentuk(String jenis) {
        if (jenis.equalsIgnoreCase("persegi")) {
            return new Persegi();
        } else if (jenis.equalsIgnoreCase("lingkaran")) {
            return new Lingkaran();
        } else if (jenis.equalsIgnoreCase("segitiga")) {
            return new Segitiga();
        } else {
            throw new IllegalArgumentException("Jenis bentuk geometri tidak valid.");
        }
    }
}

