package org.example;

public class Susu extends TambahanMinuman {
    public Susu(Minuman minuman) {
        super(minuman);
    }

    @Override
    public String getDeskripsi() {
        return minuman.getDeskripsi() + ", Susu";
    }

    @Override
    public double harga() {
        return minuman.harga() + 1.0;
    }
}
