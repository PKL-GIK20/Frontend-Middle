<section id="services">
  <h2>Our Services</h2>
  <div class="services-grid">
    <div class="service">
      <img src="/images/service1.png" alt="Service 1" />
      <h3>Service 1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="service">
      <img src="/images/service2.png" alt="Service 2" />
      <h3>Service 2</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>
</section>

<style>
  /* Gaya tambahan untuk tampilan */
  section {
    padding: 50px 0;
    text-align: center;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-top: 30px;
  }

  .service {
    text-align: center;
    padding: 20px;
    background-color: #f8f8f8;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .service img {
    width: 500px;
    height: 700px;
    margin-bottom: 10px;
  }

  .service h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .service p {
    font-size: 16px;
    color: #666666;
  }
</style>
