// script.js
// Skrip ini tidak memiliki proteksi CSRF
// Anda hanya akan melihat simulasi respons transfer dana sukses pada halaman ini

function simulateTransfer() {
    const amount = document.getElementById("amount").value;
    const account = document.getElementById("account").value;
  
    // Simulasi respons transfer dana sukses
    document.getElementById("message").innerHTML = `Transfer dana sebesar ${amount} ke rekening ${account} berhasil!`;
  }
  