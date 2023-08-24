<script>
import Modal from './information.svelte';
import CustomButton from './CustomButton.svelte';
import Outer from './Outer.svelte';
export let name;

	
	let showModal = false;

	function changeName(newName) {
    	name = newName
  	}
	function getInput(event) {
    // get the value of the input on the
    // event object and assign it to 'name'
    name = event.target.value
  }

  let counter = 0
  let m = { x: 0, y: 0 };
  function increment() { counter++ }
  function decrement() { counter-- }

  function handleClick() {
		alert('clicked');
	}
	
	function handleMessage(event) {
		alert(event.detail.text);
	}

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Contoh Event Handling menggunakan Svelte</p>
	<button on:click={ () => changeName('Zahwa') }>
		Change name
	</button>
	<p>Request Your name: { name }</p>
	<input type="text" on:input={getInput}>

	<p>Count: { counter }</p>
	<button on:click={ increment }>Increment</button>
	<button on:click={ decrement }>Decrement</button>

	<form>
	<p>
		<button>Submit Form</button>
	</p>
	</form>
	<h2>Contoh lain</h2>
	<button on:click={() => (showModal = true)}> show more information </button>
	<h2>DOM Events</h2>
	<CustomButton on:click={handleClick}></CustomButton>
	<h2>Inline Handlers</h2>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:mousemove={(e) => (m = { x: e.clientX, y: e.clientY })}>
		The mouse position is {m.x} x {m.y}
	</div>
	<h2>Event Forwarding</h2>
	<Outer on:message={handleMessage} />
		
</main>
<Modal bind:showModal>
	<h2 slot="header">
		Information
		<small><em>adjective</em> mod·al \ˈmō-dəl\</small>
	</h2>

	<ol class="definition-list">
		<li>of or relating to modality in logic</li>
		<li>
			containing provisions as to the mode of procedure or the manner of taking effect —used of a
			contract or legacy
		</li>
		<li>of or relating to a musical mode</li>
		<li>of or relating to structure as opposed to substance</li>
		<li>
			of, relating to, or constituting a grammatical form or category characteristically indicating
			predication
		</li>
		<li>of or relating to a statistical mode</li>
	</ol>
</Modal>



<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	div {
		width: 100%;
		height: 100%;
	}
</style>