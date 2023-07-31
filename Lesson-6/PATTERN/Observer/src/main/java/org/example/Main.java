package org.example;

public class Main {
    public static void main(String[] args) {
        NotifikasiManager notifikasiManager = new NotifikasiManager();
        PengamatNotifikasi pengamat1 = new PengamatNotifikasi();
        PengamatNotifikasi pengamat2 = new PengamatNotifikasi();

        // Menambahkan pengamat ke subjek
        notifikasiManager.addObserver(pengamat1);
        notifikasiManager.addObserver(pengamat2);

        // Mengirim notifikasi
        notifikasiManager.kirimNotifikasi("Ini adalah notifikasi pertama.");

        // Menghapus pengamat
        notifikasiManager.deleteObserver(pengamat1);

        // Mengirim notifikasi lagi setelah menghapus pengamat1
        notifikasiManager.kirimNotifikasi("Ini adalah notifikasi kedua.");
    }
}
