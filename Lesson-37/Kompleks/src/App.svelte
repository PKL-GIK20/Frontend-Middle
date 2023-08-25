<script>
  import Header from './components/Header.svelte';
  import About from './components/About.svelte';
  import Profile from './components/profile.svelte';
  import Services from './components/Services.svelte';
  import Portfolio from './components/Portfolio.svelte';
  import Contact from './components/Contact.svelte';
  import Footer from './components/Footer.svelte';
</script>

<main>
  <Header />
  <About />
  <Profile />
  <Services />
  <Portfolio />
  <Contact />
  <Footer />
</main>

<style>
  /* Gaya tambahan untuk tampilan */
  main {
    font-family: Arial, sans-serif;
  }
</style>
