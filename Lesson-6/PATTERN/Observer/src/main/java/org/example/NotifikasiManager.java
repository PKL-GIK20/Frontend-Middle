package org.example;

import java.util.Observable;

public class NotifikasiManager extends Observable {

    public void kirimNotifikasi(String notifikasi) {
        setChanged();
        notifyObservers(notifikasi);
    }
}

