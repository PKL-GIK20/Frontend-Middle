<section id="portfolio" class="portfolio-section">
  <h2>Portfolio</h2>
  <div class="portfolio-grid">
    <div class="portfolio-item">
      <img src="/images/portofolio1.jpg" alt="Portfolio 1" />
      <div class="overlay"></div>
    </div>
    <div class="portfolio-item">
      <img src="/images/portofolio2.jpg" alt="Portfolio 2" />
      <div class="overlay"></div>
    </div>
    <div class="portfolio-item">
      <img src="/images/portofolio3.jpg" alt="Portfolio 3" />
      <div class="overlay"></div>
    </div>
    <div class="portfolio-item">
      <img src="/images/portofolio4.jpg" alt="Portfolio 2" />
      <div class="overlay"></div>
    </div>
    <div class="portfolio-item">
      <img src="/images/portofolio5.jpg" alt="Portfolio 2" />
      <div class="overlay"></div>
    </div>
    <div class="portfolio-item">
      <img src="/images/portofolio6.jpg" alt="Portfolio 2" />
      <div class="overlay"></div>
    </div>
    <div class="portfolio-item">
      <img src="/images/portofolio7.jpg" alt="Portfolio 2" />
      <div class="overlay"></div>
    </div>
    <div class="portfolio-item">
      <img src="/images/portofolio8.jpg" alt="Portfolio 2" />
      <div class="overlay"></div>
    </div>
  </div>
</section>

<style>
  .portfolio-section {
    padding: 80px 0;
    text-align: center;
  }

  h2 {
    font-size: 32px;
    margin-bottom: 20px;
    color: #333;
  }

  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 30px;
  }

  .portfolio-item {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
  }

  .portfolio-item img {
    width: 100%;
    height: 100%; /* Menjaga rasio aspek gambar */
    object-fit: cover; /* Agar gambar memenuhi kotak tanpa mengubah rasio aspek */
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .portfolio-item:hover {
    transform: scale(1.05);
  }

  .portfolio-item:hover .overlay {
    opacity: 1;
  }
</style>