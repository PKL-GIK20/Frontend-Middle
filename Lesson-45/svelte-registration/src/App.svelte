<script>
  import RegisterForm from "./RegisterForm.svelte";
</script>

<main>
  <h1>Registration Page</h1>
  <RegisterForm />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  h1 {
    margin-bottom: 20px;
  }
</style>
