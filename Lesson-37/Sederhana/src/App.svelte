<script>
  import Greeting from "./Greeting.svelte";
  import { count } from './store';

  let name = "";
  let showMessage = false;

  function uppercase() {
    name = name.toUpperCase();
    showMessage = true;
    count.update(n => n + 1);
  }
</script>

<main class="container">
  {#if showMessage}
    <Greeting name={name} />
    <p class="count">Count: {$count}</p>
  {:else}
    <p>Please enter your name.</p>
  {/if}

  <div class="input-container">
    <input type="text" class="input" bind:value={name} />
    <button class="uppercase-button" on:click={uppercase}>Uppercase</button>
  </div>
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
  }

  .count {
    font-size: 18px;
    margin-top: 10px;
    color: #666;
  }

  .input-container {
    display: flex;
    align-items: center;
  }

  .input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  }

  .uppercase-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .uppercase-button:hover {
    background-color: #0056b3;
  }
</style>

<svelte:component this={Greeting} />
