<script>
	let products = [
	  { id: 1, name: "Apple", price: 1 },
	  { id: 2, name: "Banana", price: 0.5 },
	  { id: 3, name: "Orange", price: 0.75 }
	];
  
	let cart = [];
  
	// Menambah produk ke shopping cart
	const addToCart = (product) => {
	  const existingItem = cart.find(item => item.id === product.id);
	  if (existingItem) {
		existingItem.quantity += 1;
	  } else {
		cart = [...cart, { ...product, quantity: 1 }];
	  }
	};
  
	// Menghapus produk dari shopping cart
	const removeFromCart = (product) => {
	  cart = cart.filter(item => item.id !== product.id);
	};
  
	let subtotal = 0;
  
	// Menghitung subtotal berdasarkan produk di dalam shopping cart
	$: {
	  subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
	}
  
	// Membuat item quantity menjadi responsif
	const updateQuantity = (item, newQuantity) => {
	  const cartItem = cart.find(cartItem => cartItem.id === item.id);
	  if (cartItem) {
		cartItem.quantity = newQuantity;
	  }
	}
  </script>
  
  <h1>Product List</h1>
  <ul>
	{#each products as product (product.id)}
	  <li>
		{product.name}: ${product.price}
		<button on:click={() => addToCart(product)}>Add to Cart</button>
	  </li>
	{/each}
  </ul>
  
  <h1>Shopping Cart</h1>
  <ul>
	{#each cart as item (item.id)}
	  <li>
		{item.name} - ${item.price} x
		<input type="number" bind:value={item.quantity} min="1" on:change={() => updateQuantity(item, event.target.value)} />
		<button on:click={() => removeFromCart(item)}>Remove</button>
	  </li>
	{/each}
  </ul>
  
  <p>Subtotal: ${subtotal}</p>

  <style>
	input {
	  padding: 5px;
	  width: 50px;
	}
	h1 {
		margin-bottom: 10px;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		align-items: center;
		margin-bottom: 10px;
	}
	p {
		margin-top: 20px;
		font-weight: bold;
	}
  </style>
  