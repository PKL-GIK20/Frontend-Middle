<script>
  export let task;
</script>

<div class="task">
  <input type="checkbox" bind:checked={task.completed} />
  <span class:completed={task.completed}>{task.title}</span>
</div>

<style>
  .completed {
    text-decoration: line-through;
  }

  .task {
    margin: 0.5rem 0;
  }
</style>
