<script>
  let currentBackgroundIndex = 0;
  const backgrounds = [
    '/images/about-us.jpg',
    '/images/about-us2.jpg',
    '/images/about-us3.jpg'
  ];

  function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  }

  setInterval(changeBackground, 3000);
</script>

<section id="about" class="about-section">
  <div class="background-image" style="background-image: url({backgrounds[currentBackgroundIndex]})"></div>
  <div class="about-content">
    <div class="about-text">
      <h2>Tentang Kami</h2>
      <p class="contact-info">
        <strong>Alamat:</strong> Jl. Gedebage Selatan No.22, RT.01/RW.02, Rancabolang, Kec. Gedebage, Kota Bandung, Jawa Barat 40292<br>
        <strong>Jam:</strong> Buka ⋅ Tutup pukul 17.30<br>
        <strong>Telepon:</strong> 0812-5641-3800<br>
        <strong>Provinsi:</strong> Jawa Barat
      </p>
      <button class="info-button">Info Selengkapnya</button>
    </div>
  </div>
</section>

<style>
  .about-section {
    position: relative;
    padding: 80px 0;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    z-index: -1;
    transition: opacity 0.5s ease-in-out;
  }

  .about-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    font-size: 36px;
    margin-bottom: 20px;
    color: #333;
  }

  .about-text {
    text-align: center;
    max-width: 800px;
    font-size: 18px;
    line-height: 1.8;
    color: #666;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .info-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .info-button:hover {
    background-color: #555;
  }

  .contact-info {
    margin-top: 20px;
  }
</style>
