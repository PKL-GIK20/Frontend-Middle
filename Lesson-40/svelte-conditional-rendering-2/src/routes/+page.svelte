<script>
    let num1 = 0;
    let num2 = 0;
    let operation = '+';
    let result = 0;
  
    function calculate() {
      switch (operation) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num1 / num2;
          break;
        default:
          result = 0;
      }
    }
  </script>
  
  <main class="container">
    <h1>Kalkulator Sederhana</h1>
  
    <div class="input-group">
      <input type="number" class="input" bind:value={num1} />
      <select class="select" bind:value={operation}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" class="input" bind:value={num2} />
      <button class="button" on:click={calculate}>Hitung</button>
    </div>
  
    {#if result !== 0}
      <p class="result">Hasil: {result}</p>
    {/if}
  </main>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f4f4f4;
    }
  
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }
  
    .input-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  
    .input,
    .select,
    .button {
      padding: 10px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
    }
  
    .input {
      width: 100px;
    }
  
    .select {
      width: 60px;
      background-color: #f9f9f9;
    }
  
    .button {
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
  
    .button:hover {
      background-color: #0056b3;
    }
  
    .result {
      margin-top: 20px;
      font-size: 18px;
      color: #007bff;
    }
  </style>
  