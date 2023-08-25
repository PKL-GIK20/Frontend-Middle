<section id="contact">
  <h2>Contact Us</h2>
  <p>Have a question or want to work together? Reach out to us!</p>
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" />
    <label for="message">Message:</label>
    <textarea id="message" name="message"></textarea>
    <button type="submit">Send</button>
  </form>
</section>

<style>
  /* Gaya tambahan untuk tampilan */
  section {
    padding: 50px 0;
    text-align: center;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    color: #666666;
    max-width: 600px;
    margin: 0 auto 30px;
  }

  form {
    max-width: 600px;
    margin: 0 auto;
    text-align: left;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
