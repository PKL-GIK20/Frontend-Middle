package org.example;

import java.util.Observable;
import java.util.Observer;

public class PengamatNotifikasi implements Observer {

    @Override
    public void update(Observable o, Object arg) {
        if (o instanceof NotifikasiManager) {
            String notifikasi = (String) arg;
            System.out.println("Pengamat menerima notifikasi: " + notifikasi);
        }
    }
}

