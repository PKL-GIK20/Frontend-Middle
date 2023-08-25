<!-- src/components/PortfolioItem.svelte -->
<script>
    export let project;
  </script>
  
  <div class="portfolio-item">
    <h2>{project.title}</h2>
    <p>{project.description}</p>
    <a href={project.url} target="_blank" rel="noopener noreferrer" class="btn">Lihat Proyek</a>
  </div>
  
  <style>
    .portfolio-item {
      border: 1px solid #ddd;
      padding: 16px;
      margin: 16px;
    }
  
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #ff5722;
      color: white;
      border-radius: 5px;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
  
    .btn:hover {
      background-color: #ff7f27;
    }
  </style>
  