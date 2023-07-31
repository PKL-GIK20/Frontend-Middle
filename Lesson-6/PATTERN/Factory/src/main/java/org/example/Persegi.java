package org.example;

public class Persegi extends BentukGeometri {
    private double sisi;

    public Persegi() {
        this.sisi = 1.0;
    }

    public Persegi(double sisi) {
        this.sisi = sisi;
    }

    @Override
    public String getJenis() {
        return "Persegi";
    }

    @Override
    public double hitungLuas() {
        return sisi * sisi;
    }

    @Override
    public double hitungKeliling() {
        return 4 * sisi;
    }

    // Setter untuk sisi
    public void setSisi(double sisi) {
        this.sisi = sisi;
    }
}


