package org.example;

public class Lingkaran extends BentukGeometri {
    private double jariJari;

    public Lingkaran() {
        this.jariJari = 1.0;
    }

    public Lingkaran(double jariJari) {
        this.jariJari = jariJari;
    }

    @Override
    public String getJenis() {
        return "Lingkaran";
    }

    @Override
    public double hitungLuas() {
        return Math.PI * jariJari * jariJari;
    }

    @Override
    public double hitungKeliling() {
        return 2 * Math.PI * jariJari;
    }

    // Setter untuk jari-jari
    public void setJariJari(double jariJari) {
        this.jariJari = jariJari;
    }
}


