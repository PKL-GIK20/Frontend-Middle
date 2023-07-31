function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Validasi di sisi klien
    if (name === "" || email === "" || password === "") {
      document.getElementById("message").innerHTML = "Harap isi semua bidang.";
      return false;
    } else if (!email.includes("@")) {
      document.getElementById("message").innerHTML = "Harap masukkan email yang valid.";
      return false;
    } else if (password.length < 6) {
      document.getElementById("message").innerHTML = "Kata sandi harus terdiri dari minimal 6 karakter.";
      return false;
    } else {
      document.getElementById("message").innerHTML = "";
      return true;
    }
  }
  