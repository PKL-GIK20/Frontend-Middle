<script>
    import { onMount } from 'svelte';
    import { tasks, addTask, removeTask } from './store';
  
    let newTask = '';
  
    let taskList = [];
    tasks.subscribe(value => {
      taskList = value;
    });
  
    function handleSubmit() {
      if (newTask.trim() !== '') {
        addTask({ id: Date.now(), text: newTask });
        newTask = '';
      }
    }
  
    function handleRemove(id) {
      removeTask(id);
    }

  </script>
  
  <style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    width: 100%; 
    max-width: 400px; 
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 5px 0;
    width: 100%;
  }

  button {
    background-color: #ff6347;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #d43f08;
  }

  .container {
    display: flex;
    flex-direction: row;
    align-items: center; 
    gap: 10px;
    height: 20px;
    margin: 0;
  }
</style>
  
  <div>
    <h1>Task List</h1>
    <div class="container">
        <input type="text" bind:value="{newTask}" placeholder="Enter a new task" />
        <button on:click="{handleSubmit}">Add Task</button>
    </div>
  
    <ul>
      {#each taskList as task (task.id)}
        <li>
          {task.text}
          <button on:click="{() => handleRemove(task.id)}">Remove</button>
        </li>
      {/each}
    </ul>
  </div>
  