<script>
    let students = [
      {name: "Budi", age: 16, gender: "male", score: 90},
      {name: "Dedi", age: 17, gender: "male", score: 75},
      {name: "Cici", age: 15, gender: "female", score: 85},
      {name: "Ali", age: 15, gender: "male", score: 80}
    ];
  
    let tableElement; // variabel untuk mengikat elemen tabel
    function sortBy(key) {
      students.sort((a, b) => a[key] > b[key] ? 1 : -1);
    }
  </script>
  
  <table bind:this={tableElement}>
    <tr>
      <th>Name <button on:click={() => sortBy('name')}>Sortir</button></th>
      <th>Age <button on:click={() => sortBy('age')}>Sortir</button></th>
      <th>Gender <button on:click={() => sortBy('gender')}>Sortir</button></th>
      <th>Score <button on:click={() => sortBy('score')}>Sortir</button></th>
    </tr>
    {#each students as student (student.name)}
      <tr>
        <td>{student.name}</td>
        <td>{student.age}</td>
        <td>{student.gender}</td>
        <td>{student.score}</td>
      </tr>
    {/each}
  </table>
  