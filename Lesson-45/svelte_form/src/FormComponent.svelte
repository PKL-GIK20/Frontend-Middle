<script>
    let nama = "";
    let jenisKelamin = "laki";
    let komentar = "";
    let isNameValid = true;
  
    function handleSubmit(event) {
        event.preventDefault();
        console.log("Data yang dikirim:");
        console.log("Nama:", nama);
        console.log("Jenis Kelamin:", jenisKelamin);
        console.log("Komentar:", komentar);

        // Mengosongkan field setelah mengirim
        nama = "";
        jenisKelamin = "laki";
        komentar = "";
        isNameValid = true;
    }

    function handleValidation() {
        isNameValid = nama.length >= 3;
    }

  </script>
  
  <style>
    form {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      padding: 20px;
      border-radius: 8px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
    }
    
    input, select, textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    input.invalid {
      border-color: #ff4c4c;
    }
    
    button {
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
  
  <form on:submit={handleSubmit}>
    <label>
      Nama:
      <input type="text" name="nama" bind:value={nama} class:invalid={isNameValid === false}>
      {#if isNameValid === false}<p class="invalid-feedback">Nama harus memiliki setidaknya 3 karakter.</p>{/if}
    </label>
    
    <label>
      Jenis Kelamin:
      <select name="jenisKelamin" bind:value={jenisKelamin}>
        <option value="laki">Laki-laki</option>
        <option value="perempuan">Perempuan</option>
      </select>
    </label>
    
    <label>
      Komentar:
      <textarea name="komentar" bind:value={komentar}></textarea>
    </label>
    
    <button type="submit">Kirim</button>
  </form>
  