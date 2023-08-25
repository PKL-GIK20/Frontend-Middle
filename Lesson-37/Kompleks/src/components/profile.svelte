<script>
  let companyInfo = {
    name: 'Nanang Logistik Bandung',
    address: 'Jl. Gedebage Selatan No.22, RT.01/RW.02, Rancabolang, Kec. Gedebage, Kota Bandung, Jawa Barat 40292',
    phoneNumber: '0812-5641-3800',
    province: 'Jawa Barat',
    description: 'Nanang Logistik Bandung adalah mitra terpercaya Anda dalam menghadapi tantangan logistik modern. Dengan komitmen untuk memberikan layanan berkualitas tinggi, kami menjadi penghubung utama antara keberhasilan bisnis Anda dan efisiensi pergerakan barang. Melalui pendekatan yang terintegrasi dan solusi yang inovatif, kami mengantarkan solusi logistik yang dapat diandalkan untuk memastikan kelancaran rantai pasok Anda. Dengan fokus pada kecepatan, ketepatan, dan kepuasan pelanggan, kami memastikan setiap langkah perjalanan barang berjalan dengan mulus. Dukungan teknologi canggih kami meningkatkan visibilitas dan kendali atas pengiriman, memungkinkan Anda untuk mengarahkan bisnis menuju pertumbuhan yang berkelanjutan. Nanang Logistik Bandung siap menjadi bagian dari kesuksesan Anda, memberikan pelayanan terbaik untuk memenuhi kebutuhan logistik Anda dengan profesionalisme dan dedikasi.'
  };
</script>
<section class="separator-section"></section>
<section class="profile-section">
  <div class="company-info">
    <h2>{companyInfo.name}</h2>
    <p>{companyInfo.description}</p>
    <p><strong>Alamat:</strong> {companyInfo.address}</p>
    <p><strong>Telepon:</strong> {companyInfo.phoneNumber}</p>
    <p><strong>Provinsi:</strong> {companyInfo.province}</p>
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

  h2 {
    font-size: 36px;
    margin-bottom: 20px;
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
