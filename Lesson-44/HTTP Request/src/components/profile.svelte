  <script>
    // Fungsi untuk membuat HTTP request
    function makeHttpRequest(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          callback(response);
        }
      };
      xhr.send();
    }

    // URL API palsu
    var apiUrl = "https://jsonplaceholder.typicode.com/users/1"; // Contoh API palsu

    // Fungsi untuk mengisi informasi perusahaan ke dalam elemen HTML
    function fillCompanyInfo(info) {
      var companyInfoElement = document.querySelector(".company-info");
      companyInfoElement.innerHTML = `
        <p><strong>Nama:</strong> ${info.name}</p>
        <p><strong>Email:</strong> ${info.email}</p>
        <p><strong>Alamat:</strong> ${info.address.city}</p>

      `;
    }

    // Pemanggilan HTTP request
    makeHttpRequest(apiUrl, fillCompanyInfo);
  </script>
<section class="separator-section"></section>
<section class="profile-section">
  <div class="company-info">
  </div>
  <div class="diagonal-image"></div>
</section>

<section class="separator-section"></section>

<style>
  .profile-section {
    display: flex;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }

  .company-info {
    flex: 1;
    padding: 40px;
    background-color: #f1f1f1;
    color: #333;
  }


  .diagonal-image {
    flex: 1;
    height: 100%;
    background-image: url('/images/diagonal-image.jpg');
    background-size: cover;
    background-position: center;
    transform: skewX(-15deg);
    z-index: -1;
  }

  .separator-section {
    height: 40px;
    background-color: #f1f1f1;
  }
</style>
