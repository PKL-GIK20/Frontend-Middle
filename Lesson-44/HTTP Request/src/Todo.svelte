<script>
  let todos = [];
  let newTodo = '';

  function addTodo() {
    if (newTodo.trim() === '') return;
    todos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
    newTodo = '';
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
  }

  function toggleComplete(id) {
    todos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
  }
</script>

<div>
  <h2>To-Do List</h2>
  <input bind:value={newTodo} placeholder="Add a new task" />
  <button on:click={addTodo}>Add</button>

  <ul>
    {#each todos as todo (todo.id)}
      <li>
        <input type="checkbox" bind:checked={todo.completed} />
        <span style="flex-grow: 1; margin-right: 10px; text-decoration: {todo.completed ? 'line-through' : 'none'}">
          {todo.text}
        </span>
        <button on:click={() => toggleComplete(todo.id)}>Toggle Complete</button>
        <button on:click={() => removeTodo(todo.id)}>Remove</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  /* Gaya tambahan untuk tampilan */
  div {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  button {
    padding: 4px 8px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
