(function() {
    // Mengambil data belanjaan dari input pengguna
    var items = [];
    var numItems = parseInt(prompt("Masukkan jumlah item belanjaan:"));
  
    for (var i = 1; i <= numItems; i++) {
      var name = prompt("Masukkan nama item ke-" + i + ":");
      var price = parseInt(prompt("Masukkan harga item ke-" + i + ":"));
  
      items.push({ name: name, price: price });
    }
  
    // Fungsi IIFE untuk menghitung total harga belanjaan
    var totalPrice = (function() {
      var total = 0;
  
      for (var i = 0; i < items.length; i++) {
        total += items[i].price;
      }
  
      return total;
    })();
  
    // Output hasil total harga belanjaan
    console.log("Total harga belanjaan: " + totalPrice);
  })();

