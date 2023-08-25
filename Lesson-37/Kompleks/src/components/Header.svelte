<script>
  let navigationLinks = [
    { label: 'Home', url: '#' },
    { label: 'About', url: '#about' },
    { label: 'Services', url: '#services' },
    { label: 'Portfolio', url: '#portfolio' },
    { label: 'Contact', url: '#contact' }
  ];
</script>

<header class="main-header">
  <div class="logo">
    <img src="/images/logo.jpg" alt="Company Logo" />
    <h1>Nanang Logistik Bandung</h1>
  </div>
  <nav class="main-nav">
    <ul>
      {#each navigationLinks as link}
        <li><a href={link.url}>{link.label}</a></li>
      {/each}
    </ul>
  </nav>
</header>

<style>
  /* Gaya tambahan untuk tampilan */
  .main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .logo img {
    max-width: 100px;
    height: auto;
    border-radius: 50%;
  }

  .logo h1 {
    font-size: 24px;
    margin-left: 10px;
    color: #333;
  }

  .main-nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
  }

  .main-nav a {
    text-decoration: none;
    color: #333333;
    font-weight: bold;
    transition: color 0.3s ease-in-out;
  }

  .main-nav a:hover {
    color: #3498db;
  }
</style>
