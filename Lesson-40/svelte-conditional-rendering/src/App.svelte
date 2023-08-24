<script>
	import Task from "./routes/Task.svelte";
  
	let tasks = [
	  { id: 1, title: 'Belajar Svelte', completed: false },
	  { id: 2, title: 'Buat proyek Conditional Rendering', completed: true },
	  { id: 3, title: 'Selesaikan proyek', completed: false }
	];
  
	let value = "";
  
	function addTask() {
	  if (value) {
		const newTask = {
		  id: tasks.length + 1,
		  title: value,
		  completed: false
		};
  
		tasks = [...tasks, newTask];
		value = "";
	  }
	}
  </script>
  
  <main>
	<h1>Daftar Tugas</h1>
  
	<div class="tasks">
	  {#each tasks as task (task.id)}
		<Task {task} />
	  {/each}
	</div>
  
	<div class="add-task">
	  <input type="text" placeholder="Tambahkan tugas baru" bind:value={value} />
	  <button on:click={addTask}>Tambahkan</button>
	</div>
  </main>
  
  <style>
	main {
	  max-width: 600px;
	  margin: 2rem auto;
	  padding: 1rem;
	  border: 1px solid #e1e1e1;
	  border-radius: 5px;
	  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
	  background-color: #ffffff;
	}
  
	h1 {
	  text-align: center;
	  font-size: 1.5rem;
	  margin-bottom: 1rem;
	}
  
	.tasks {
	  display: grid;
	  gap: 0.5rem;
	}
  
	.add-task {
	  display: flex;
	  gap: 0.5rem;
	  margin-top: 1rem;
	}
  
	input[type="text"] {
	  flex-grow: 1;
	  padding: 0.5rem;
	  border: 1px solid #e1e1e1;
	  border-radius: 5px;
	}
  
	button {
	  padding: 0.5rem 1rem;
	  background-color: #007bff;
	  color: #fff;
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;
	}
  
	button:hover {
	  background-color: #0056b3;
	}
  </style>
  