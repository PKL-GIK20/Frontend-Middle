<!-- src/App.svelte -->
<script>
	import Portfolio from "./Portfolio.svelte";
  
	let name = "GIK x Padepokan 79"; 
  </script>
  
  <main>
	<h1>Hello {name}!</h1>
	<Portfolio />
  </main>
  
  <style>
	main {
	  text-align: center;
	  padding: 2em;
	  max-width: 1200px; /* Memperbesar lebar konten */
	  margin: 0 auto;
	  background-color: #ffffff;
	  border-radius: 8px;
	  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	}
  
	h1 {
	  color: #ff5722;
	  text-transform: uppercase;
	  font-size: 3em;
	  font-weight: 300;
	  margin-bottom: 20px;
	}
  
	@media (min-width: 640px) {
	  main {
		padding: 4em;
	  }
  
	  h1 {
		font-size: 4em;
	  }
	}
  </style>
  