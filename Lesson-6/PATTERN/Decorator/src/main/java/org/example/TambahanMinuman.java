package org.example;

public abstract class TambahanMinuman implements Minuman {
    protected Minuman minuman;

    public TambahanMinuman(Minuman minuman) {
        this.minuman = minuman;
    }

    public abstract String getDeskripsi();
}

