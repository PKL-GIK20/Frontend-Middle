function createAdder() {
    let total = 0; 
  
    // Closure untuk menambahkan nilai ke total
    function adder(number) {
      total += number;
      console.log(`Memasukkan angka ${number}, total saat ini: ${total}`);
    }
  
    // Closure untuk mendapatkan total saat ini
    function getTotal() {
      console.log(`Total akhir: ${total}`);
    }
  
    return {
      add: adder,
      getTotal: getTotal,
    };
  }
  
  // Membuat instance adder
  const adderInstance = createAdder();
  
  // Menggunakan closure add untuk menambahkan angka
  adderInstance.add(5); 
  adderInstance.add(10); 
  adderInstance.add(3); 
  
  // Menggunakan closure getTotal untuk mendapatkan total akhir
  adderInstance.getTotal(); 
  