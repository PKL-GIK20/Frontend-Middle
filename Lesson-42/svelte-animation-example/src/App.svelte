<script>
	let isVisible = false;
	let isExpanded = false;
  
	function toggleVisibility() {
	  isVisible = !isVisible;
	}
  
	function toggleExpansion() {
	  isExpanded = !isExpanded;
	}
  </script>
  
  <style>
	.container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  margin-top: 50px;
	}
  
	.box {
	  width: 200px;
	  height: 200px;
	  background-color: #3498db;
	  color: white;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  font-size: 18px;
	  margin-bottom: 20px;
	  transition: transform 0.5s ease, opacity 0.5s ease;
	}
  
	.box.visible {
	  opacity: 1;
	  transform: translateX(0);
	}
  
	.box.hidden {
	  opacity: 0;
	  transform: translateX(-100%);
	}
  
	.box.expanded {
	  background-color: #e74c3c;
	  transform: scale(1.2);
	}
  
	.button {
	  padding: 10px 20px;
	  background-color: #2ecc71;
	  color: white;
	  border: none;
	  cursor: pointer;
	  border-radius: 4px;
	  transition: background-color 0.3s ease;
	}
  
	.button:hover {
	  background-color: #27ae60;
	}
  </style>
  
  <div class="container">
	<div
	  class="box {isVisible ? 'visible' : 'hidden'} {isExpanded ? 'expanded' : ''}"
	>
	  {isVisible ? 'Visible' : 'Hidden'}
	</div>
	<button class="button" on:click={toggleVisibility}>
	  Toggle Visibility
	</button>
	<button class="button" on:click={toggleExpansion}>
	  Toggle Expansion
	</button>
  </div>  