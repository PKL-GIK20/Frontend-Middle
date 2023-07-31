// Ambil referensi form
const form = document.getElementById("dataForm");

// Tambahkan event listener untuk form ketika disubmit
form.addEventListener("submit", function (event) {
  // Hentikan aksi submit default agar halaman tidak ter-refresh
  event.preventDefault();

  // Validasi data sebelum mengirimkan form
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Reset pesan error
  clearErrorMessages();

  // Validasi apakah input sudah diisi atau tidak
  if (name === "") {
    showError("name", "Nama harus diisi.");
  }

  if (email === "") {
    showError("email", "Email harus diisi.");
  } else if (!isValidEmail(email)) {
    showError("email", "Email tidak valid.");
  }

  if (message === "") {
    showError("message", "Pesan harus diisi.");
  }

  // Jika semua validasi sukses, kirimkan form
  if (name !== "" && isValidEmail(email) && message !== "") {
    // Lakukan pengiriman data atau tindakan lainnya di sini
    alert("Form berhasil dikirim!");
    form.reset();
  }
});

// Fungsi untuk menampilkan pesan error pada input
function showError(inputName, errorMessage) {
  const errorElement = document.getElementById(inputName + "Error");
  errorElement.innerText = errorMessage;
}

// Fungsi untuk membersihkan pesan error
function clearErrorMessages() {
  const errors = document.getElementsByClassName("error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].innerText = "";
  }
}

// Fungsi untuk memeriksa validitas email menggunakan regex
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
