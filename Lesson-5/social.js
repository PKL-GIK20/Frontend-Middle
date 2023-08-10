const readlineSync = require('readline-sync');

// Simulasikan database pengguna yang terdaftar
const userDatabase = {
    john123: {
      username: 'john123',
      email: 'john@example.com',
      socialNetwork: 'Facebook'
    },
    jane456: {
      username: 'jane456',
      email: 'jane@example.com',
      socialNetwork: 'Google'
    },
    mike789: {
      username: 'mike789',
      email: 'mike@example.com',
      socialNetwork: 'Twitter'
    }
  };
  
  // Fungsi untuk memverifikasi pengguna dengan Social Authentication
  function verifikasiSocialAuthentication(username, socialNetwork) {
    if (username in userDatabase) {
      const user = userDatabase[username];
      if (user.socialNetwork === socialNetwork) {
        return true; // Verifikasi sukses
      }
    }
    return false; // Verifikasi gagal atau username tidak ditemukan
  }
  
  // Contoh penggunaan
  const usernameInput = readlineSync.question('Masukkan username: ');
  const socialNetworkInput = readlineSync.question('Masukkan social network: ');
  
  // Verifikasi Social Authentication
  const isSocialAuthenticationValid = verifikasiSocialAuthentication(usernameInput, socialNetworkInput);
  
  if (isSocialAuthenticationValid) {
    console.log('Social Authentication valid. Anda berhasil diautentikasi.');
    console.log('Selamat datang, ' + usernameInput + '!');
  } else {
    console.log('Social Authentication tidak valid. Autentikasi gagal.');
  }
