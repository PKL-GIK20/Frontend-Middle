const readlineSync = require('readline-sync');

// Simulasikan database pengguna yang terdaftar
const userDatabase = {
  john123: {
    password: 'password123',
    secretQuestion: 'Siapa nama ibu kandung Anda?',
    secretAnswer: 'Bu Rachel'
  },
  jane456: {
    password: 'securePass789',
    secretQuestion: 'Nama hewan peliharaan Anda?',
    secretAnswer: 'Grace'
  },
  mike789: {
    password: 'letmein',
    secretQuestion: 'Apa warna favorit Anda?',
    secretAnswer: 'Sage'
  }
};

// Fungsi untuk memverifikasi kata sandi pengguna
function verifikasiKataSandi(username, password) {
  if (username in userDatabase) {
    const user = userDatabase[username];
    if (password === user.password) {
      return true; // Kata sandi cocok
    }
  }
  return false; // Kata sandi tidak cocok atau username tidak ditemukan
}

// Fungsi untuk memverifikasi pertanyaan keamanan pengguna
function verifikasiPertanyaanKeamanan(username) {
  if (username in userDatabase) {
    const user = userDatabase[username];
    const secretQuestion = user.secretQuestion;
    const answerInput = user.secretAnswer; 
    const userAnswer = readlineSync.question(`Pertanyaan keamanan: ${secretQuestion} `);
    if (answerInput === userAnswer) {
      return true; // Jawaban benar
    }
  }
  return false; // Jawaban salah atau username tidak ditemukan
}

// Contoh penggunaan
const usernameInput = readlineSync.question('Masukkan username: ');
const passwordInput = readlineSync.question('Masukkan kata sandi: ');

// Verifikasi kata sandi pengguna
const isPasswordValid = verifikasiKataSandi(usernameInput, passwordInput);

if (isPasswordValid) {
  console.log('Kata sandi valid.');

  // Memverifikasi pertanyaan keamanan pengguna
//   const answerInput = readlineSync.question('Masukkan jawaban untuk pertanyaan keamanan: ');
  const isSecurityQuestionValid = verifikasiPertanyaanKeamanan(usernameInput);

  if (isSecurityQuestionValid) {
    console.log('Autentikasi 2FA/MFA berhasil.');
    console.log('Selamat datang, ' + usernameInput + '!');
  } else {
    console.log('Jawaban pertanyaan keamanan salah. Autentikasi gagal.');
  }
} else {
  console.log('Kata sandi tidak valid. Autentikasi gagal.');
}
