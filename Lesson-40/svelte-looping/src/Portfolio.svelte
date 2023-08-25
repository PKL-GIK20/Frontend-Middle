<!-- src/Portfolio.svelte -->
<script>
    import PortfolioItem from './components/PortfolioItem.svelte';
  
    // Daftar proyek portofolio
    let projects = [
      {
        title: 'Penerapan Looping Menggunakan Svelte dalam Menampilkan Data Siswa dengan Warna Berbeda Berdasarkan Nilai',
        description: 'Proyek ini merupakan sebuah aplikasi web yang memanfaatkan fitur looping dari framework Svelte. Tujuannya adalah untuk menampilkan informasi tentang siswa dalam format yang dinamis dan menarik. Setiap siswa memiliki data yang meliputi nama, usia, jenis kelamin, dan nilai. Nilai siswa menjadi faktor penting dalam menentukan latar belakang yang berbeda pada tampilan. Aplikasi ini memanfaatkan komponen-komponen dalam Svelte untuk merepresentasikan masing-masing siswa. Setiap komponen menerima data sebagai properti, termasuk nama siswa, nilai yang diperoleh, dan informasi lainnya.',
        url: 'https://svelte.dev/repl/755e0d544fd6498dade5745e5e6bb585?version=4.2.0'
      },
      {
        title: 'Penggunaan Svelte dalam Mengatur Gaya Item Berdasarkan Indeks',
        description: 'Proyek ini memperlihatkan kemampuan Svelte dalam mengelola tampilan berdasarkan indeks data. Dengan memanfaatkan kode yang diberikan, proyek ini menyusun daftar siswa dengan informasi masing-masing, termasuk nama, usia, jenis kelamin, dan nilai. Melalui fitur looping, tampilan data ini diatur dengan dinamis dan menarik. Namun, yang lebih menarik adalah penerapan gaya berbeda untuk setiap baris data berdasarkan indeks. Baris dengan indeks genap memiliki latar belakang putih, sedangkan baris dengan indeks ganjil diberikan latar belakang abu-abu muda. Proyek ini mengilustrasikan kekuatan Svelte dalam mengorganisir dan memodifikasi tampilan secara efisien dengan mempertimbangkan indeks data.',
        url: 'https://svelte.dev/repl/4cda99ab15ad4df2a6c1664ea3b54efe?version=4.2.0'
      },
      // Tambahkan proyek lainnya
    ];
</script>

<style>
    :global(body) {
      font-family: 'Montserrat', sans-serif; /* Menggunakan font Montserrat */
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      color: #333;
    }

    .portfolio-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      .portfolio-container {
        flex-direction: column;
        align-items: center;
      }
    }
</style>

<div class="portfolio-container">
  {#each projects as project (project.title)}
    <PortfolioItem {project} />
  {/each}
</div>
