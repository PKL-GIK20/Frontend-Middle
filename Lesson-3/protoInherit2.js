// Parent class - Animal
class Animal {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    // Method to get the sound of the animal
    makeSound() {
      return "Some generic animal sound!";
    }
  
    // Method to display animal info
    displayInfo() {
      return `Name: ${this.name}, Age: ${this.age}`;
    }
  }
  
  // Child class - Dog (inherits from Animal)
  class Dog extends Animal {
    constructor(name, age, breed) {
      super(name, age);
      this.breed = breed;
    }
  
    // Override the makeSound method for Dog
    makeSound() {
      return "Woof! Woof!";
    }
  
    // Method to display dog info (overrides displayInfo from the parent class)
    displayInfo() {
      return `Name: ${this.name}, Age: ${this.age}, Breed: ${this.breed}`;
    }
  }
  
  // Creating instances of the classes
  const animal = new Animal("Generic Animal", 3);
  const dog = new Dog("Buddy", 2, "Golden Retriever");
  
  
  // Outputting the results
  console.log(animal.makeSound()); 
  console.log(animal.displayInfo()); 
  
  console.log(dog.makeSound()); 
  console.log(dog.displayInfo()); 
  