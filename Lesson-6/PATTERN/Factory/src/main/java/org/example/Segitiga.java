package org.example;

public class Segitiga extends BentukGeometri {
    private double alas;
    private double tinggi;
    private double sisi1;
    private double sisi2;
    private double sisi3;

    public Segitiga() {
        this.alas = 1.0;
        this.tinggi = 1.0;
        this.sisi1 = 1.0;
        this.sisi2 = 1.0;
        this.sisi3 = 1.0;
    }

    public Segitiga(double alas, double tinggi, double sisi1, double sisi2, double sisi3) {
        this.alas = alas;
        this.tinggi = tinggi;
        this.sisi1 = sisi1;
        this.sisi2 = sisi2;
        this.sisi3 = sisi3;
    }

    @Override
    public String getJenis() {
        return "Segitiga";
    }

    @Override
    public double hitungLuas() {
        return 0.5 * alas * tinggi;
    }

    @Override
    public double hitungKeliling() {
        return sisi1 + sisi2 + sisi3;
    }

    // Setter untuk alas
    public void setAlas(double alas) {
        this.alas = alas;
    }

    // Setter untuk tinggi
    public void setTinggi(double tinggi) {
        this.tinggi = tinggi;
    }

    // Setter untuk sisi1
    public void setSisi1(double sisi1) {
        this.sisi1 = sisi1;
    }

    // Setter untuk sisi2
    public void setSisi2(double sisi2) {
        this.sisi2 = sisi2;
    }

    // Setter untuk sisi3
    public void setSisi3(double sisi3) {
        this.sisi3 = sisi3;
    }
}


