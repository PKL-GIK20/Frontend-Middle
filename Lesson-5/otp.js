const readlineSync = require('readline-sync');
const { v4: uuidv4 } = require('uuid');

// Simulasikan database pengguna yang terdaftar
const userDatabase = [
    {
      nama: 'John Doe',
      nomorTelepon: '08123456789',
      otp: ''
    },
    {
      nama: 'Jane Smith',
      nomorTelepon: '08987654321',
      otp: ''
    },
    {
      nama: 'Mike Johnson',
      nomorTelepon: '08765432109',
      otp: ''
    }
  ];

// Fungsi untuk mengirim kode OTP ke pengguna (simulasi)
function kirimOTP(nomorTelepon) {
    const user = userDatabase.find(user => user.nomorTelepon === nomorTelepon);
    if (user) {
      const otp = uuidv4().substr(0, 6); 
      user.otp = otp; // Simpan kode OTP dalam database pengguna
      console.log(`Kode OTP ${otp} telah dikirim ke ${nomorTelepon}`);
    } else {
      console.log('Nomor telepon tidak ditemukan dalam database.');
    }
  }
  
// Fungsi untuk memverifikasi OTP yang dimasukkan oleh pengguna
function verifikasiOTP(nomorTelepon, otp) {
    const user = userDatabase.find(user => user.nomorTelepon === nomorTelepon);
    if (user) {
      if (otp === user.otp) {
        console.log(`OTP valid. Anda berhasil diautentikasi sebagai ${user.nama}.`);
      } else {
        console.log('OTP tidak valid. Autentikasi gagal.');
      }
    } else {
      console.log('Nomor telepon tidak ditemukan dalam database.');
    }
}
  
  // Contoh penggunaan
  const nomorTeleponInput = readlineSync.question('Masukkan nomor telepon: ');
  
  // Kirim OTP ke nomor telepon yang dimasukkan
  kirimOTP(nomorTeleponInput);
  
  // Meminta pengguna memasukkan OTP yang diterima
  const otpInput = readlineSync.question('Masukkan kode OTP yang diterima: ');
  
  // Verifikasi OTP yang dimasukkan oleh pengguna
  verifikasiOTP(nomorTeleponInput, otpInput);
