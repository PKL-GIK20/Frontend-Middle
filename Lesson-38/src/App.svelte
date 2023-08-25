<script>
	let tasks = [];
	let newTask = '';
  
	function addTask() {
	  if (newTask !== '') {
		tasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
		newTask = '';
	  }
	}
  
	function removeTask(id) {
	  tasks = tasks.filter(task => task.id !== id);
	}
  
	function toggleTaskCompletion(id) {
	  tasks = tasks.map(task => {
		if (task.id === id) {
		  return { ...task, completed: !task.completed };
		}
		return task;
	  });
	}
  </script>
  
  <main>
	<h1>Daftar Tugas</h1>
	<div class="task-input">
	  <input type="text" bind:value={newTask} placeholder="Tambahkan tugas baru" />
	  <button on:click={addTask}>Tambah</button>
	</div>
	<ul class="task-list">
	  {#each tasks as task (task.id)}
		<li class:completed={task.completed}>
		  <input type="checkbox" bind:checked={task.completed} on:change={() => toggleTaskCompletion(task.id)} />
		  <span>{task.text}</span>
		  <button on:click={() => removeTask(task.id)}>Hapus</button>
		</li>
	  {/each}
	</ul>
  </main>
  
  <style>
	main {
	  max-width: 400px;
	  margin: 0 auto;
	  padding: 2em;
	  border: 1px solid #ccc;
	  border-radius: 8px;
	}
  
	h1 {
	  font-size: 1.5em;
	  margin-bottom: 1em;
	}
  
	.task-input {
	  display: flex;
	  gap: 1em;
	  margin-bottom: 1em;
	}
  
	input[type="text"] {
	  flex: 1;
	  padding: 0.5em;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	}
  
	button {
	  padding: 0.5em 1em;
	  font-size: 1em;
	  background-color: #007bff;
	  color: white;
	  border: none;
	  cursor: pointer;
	  border-radius: 4px;
	}
  
	button:hover {
	  background-color: #0056b3;
	}
  
	ul {
	  list-style: none;
	  padding: 0;
	}
  
	li {
	  display: flex;
	  align-items: center;
	  gap: 1em;
	  margin-bottom: 0.5em;
	  padding: 0.5em;
	  background-color: #f5f5f5;
	  border-radius: 4px;
	}
  
	li.completed {
	  background-color: #e0ffe0;
	  text-decoration: line-through;
	}
  
	input[type="checkbox"] {
	  margin-right: 0.5em;
	}
  </style>