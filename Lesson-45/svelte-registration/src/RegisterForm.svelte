<script>
  import { createEventDispatcher } from "svelte";

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";

  // variabel untuk menyimpan status validasi
  let nameValid = true;
  let emailValid = true;
  let passwordValid = true;
  let confirmPasswordValid = true;

  // variabel untuk menyimpan status pengiriman
  let isSubmitting = false;

  // variabel untuk menyimpan pesan kesalahan
  let nameError = "";
  let emailError = "";
  let passwordError = "";
  let confirmPasswordError = "";

  // fungsi untuk memeriksa validasi nama
  function validateName() {
    // nama harus diisi dan memiliki panjang maksimal 20 karakter
    if (!name) {
      return "Name is required";
    }

    if (name.length > 20) {
      return "Name must be less than 20 characters";
    }

    return "";
  }

  // fungsi untuk memeriksa validasi email
  function validateEmail() {
    // email harus diisi dan memiliki format email yang benar
    // menggunakan ekspresi reguler untuk memeriksa format email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      return "Email is required";
    }

    if (!emailRegex.test(email)) {
      return "Email is not valid";
    }

    return "";
  }

  // fungsi untuk memeriksa validasi kata sandi
  function validatePassword() {
    // kata sandi harus diisi dan memiliki panjang minimal 8 karakter
    if (!password) {
      return "Password is required";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    return "";
  }

  // fungsi untuk memeriksa validasi konfirmasi kata sandi
  function validateConfirmPassword() {
    // konfirmasi kata sandi harus diisi dan sama dengan kata sandi
    if (!confirmPassword) {
      return "Confirm Password is required";
    }

    if (confirmPassword !== password) {
      return "Confirm Password must match the password";
    }

    return "";
  }

  // fungsi untuk menangani pengiriman formulir
  async function handleSubmit(event) {
    // mencegah perilaku bawaan browser
    event.preventDefault();

    // mengubah status pengiriman menjadi true
    isSubmitting = true;

    // memanggil semua fungsi validasi dan menetapkan hasilnya ke variabel
    nameError = validateName();
    emailError = validatePassword();
    passwordError = validatePassword();
    confirmPasswordError = validateConfirmPassword();

    // mengubah status validasi berdasarkan nilai variabel
    nameValid = !nameError;
    emailValid = !emailError;
    passwordValid = !passwordError;
    confirmPasswordValid = !confirmPasswordError;

    // jika semua input valid, kirim data ke server
    if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
      try {
        // membuat objek data yang berisi nilai input
        const data = { name, email, password };

        // mengirim permintaan HTTP POST ke server dengan data sebagai body
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // mengubah respon menjadi objek JSON
        const result = await response.json();

        // jika respon berhasil, tampilkan pesan sukses dan kosongkan input
        if (result.success) {
          alert("Form submitted successfully!");
          name = "";
          email = "";
          password = "";
          confirmPassword = "";
        }

        // jika respon gagal, tampilkan pesan kesalahan dari server
        else {
          alert(result.message);
        }
      } catch (error) {
        // jika terjadi kesalahan jaringan, tampilkan pesan kesalahan
        alert(error.message);
      }

      // mengubah status pengiriman menjadi false
      isSubmitting = false;
    }
  }
</script>

<form on:submit={handleSubmit}>
  <label for="name">Name</label>
  <input
    id="name"
    type="text"
    name="name"
    bind:value={name}
    on:input={() => {
      // memanggil fungsi validasi dan menetapkan hasilnya ke variabel
      nameError = validateName();

      // mengubah status validasi berdasarkan nilai variabel
      nameValid = !nameError;
    }}
  />
  {#if !nameValid}
    <p class="error">{nameError}</p>
  {/if}

  <label for="email">Email</label>
  <input
    id="email"
    type="email"
    name="email"
    bind:value={email}
    on:input={() => {
      // memanggil fungsi validasi dan menetapkan hasilnya ke variabel
      emailError = validateEmail();

      // mengubah status validasi berdasarkan nilai variabel
      emailValid = !emailError;
    }}
  />
  {#if !emailValid}
    <p class="error">{emailError}</p>
  {/if}

  <label for="password">Password</label>
  <input
    id="password"
    type="password"
    name="password"
    bind:value={password}
    on:input={() => {
      // memanggil fungsi validasi dan menetapkan hasilnya ke variabel
      passwordError = validatePassword();

      // mengubah status validasi berdasarkan nilai variabel
      passwordValid = !passwordError;
    }}
  />
  {#if !passwordValid}
    <p class="error">{passwordError}</p>
  {/if}

  <label for="confirmPassword">Confirm Password</label>
  <input
    id="confirmPassword"
    type="password"
    name="confirmPassword"
    bind:value={confirmPassword}
    on:input={() => {
      // memanggil fungsi validasi dan menetapkan hasilnya ke variabel
      confirmPasswordError = validateConfirmPassword();

      // mengubah status validasi berdasarkan nilai variabel
      confirmPasswordValid = !confirmPasswordError;
    }}
  />
  {#if !confirmPasswordValid}
    <p class="error">{confirmPasswordError}</p>
  {/if}

  <button
    type="submit"
    disabled={!nameValid ||
      !emailValid ||
      !passwordValid ||
      !confirmPasswordValid ||
      isSubmitting}
  >
    {#if isSubmitting}
      Submitting...
    {:else}
      Submit
    {/if}
  </button>
</form>

<style>
  form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  label {
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }

  p.error {
    margin-top: 5px;
    color: #d32f2f;
    font-size: 14px;
  }

  button {
    margin-top: 15px;
    padding: 10px;
    width: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>
