package org.example;

public class MinumanBiasa implements Minuman {
    @Override
    public String getDeskripsi() {
        return "Minuman Biasa";
    }

    @Override
    public double harga() {
        return 5.0;
    }
}
