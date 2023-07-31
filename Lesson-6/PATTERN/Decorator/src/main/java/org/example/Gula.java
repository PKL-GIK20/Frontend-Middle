package org.example;

public class Gula extends TambahanMinuman {
    public Gula(Minuman minuman) {
        super(minuman);
    }

    @Override
    public String getDeskripsi() {
        return minuman.getDeskripsi() + ", Gula";
    }

    @Override
    public double harga() {
        return minuman.harga() + 0.5;
    }
}
