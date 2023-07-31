package org.example;

public class WhipCream extends TambahanMinuman {
    public WhipCream(Minuman minuman) {
        super(minuman);
    }

    @Override
    public String getDeskripsi() {
        return minuman.getDeskripsi() + ", Whip Cream";
    }

    @Override
    public double harga() {
        return minuman.harga() + 1.5;
    }
}

