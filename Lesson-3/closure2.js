// Fungsi untuk membuat random number generator dengan batas atas tertentu
function createRandomNumberGenerator(max) {
    return function() {
      return Math.floor(Math.random() * max) + 1;
    };
  }
  
  // Membuat dua fungsi random number generator dengan batas atas yang berbeda
  const generateRandomNumberUpTo10 = createRandomNumberGenerator(10);
  const generateRandomNumberUpTo50 = createRandomNumberGenerator(50);
  
  // Menggunakan closure untuk memanggil fungsi-fungsi random number generator
  console.log(generateRandomNumberUpTo10()); // Menghasilkan angka acak antara 1 dan 10
  console.log(generateRandomNumberUpTo10()); // Menghasilkan angka acak antara 1 dan 10 lagi
  
  console.log(generateRandomNumberUpTo50()); // Menghasilkan angka acak antara 1 dan 50
  console.log(generateRandomNumberUpTo50()); // Menghasilkan angka acak antara 1 dan 50 lagi
  