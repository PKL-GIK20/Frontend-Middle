function pesanTiket() {
    const ticketId = parseInt(document.getElementById("ticketId").value);
    const quantity = parseInt(document.getElementById("quantity").value);
  
    // Simulasikan pemesanan tiket
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `Anda telah memesan ${quantity} tiket dengan ID ${ticketId}.`;
  }
  