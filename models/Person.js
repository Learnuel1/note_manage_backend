// Define a class named 'Person'
class Person {
  // Constructor to initialize properties
  constructor(name, age, occupation) {
    this.name = name;       // Public property
    this.age = age;         // Public property
    this.occupation = occupation; // Public property
  }

  // Method to introduce the person
  introduce() {
    console.log(`Hi, my name is ${this.name}, I am ${this.age} years old and I work as a ${this.occupation}.`);
  }

  // Method to celebrate the person's birthday
  celebrateBirthday() {
    this.age += 1; // Increment the age
    console.log(`Happy birthday! ${this.name} is now ${this.age} years old.`);
  }

  // Getter method for name
  getName() {
    return this.name;
  }

  // Setter method for name
  setName(newName) {
    this.name = newName;
  }
}

// Create an instance of the Person class
const person1 = new Person('Alice', 30, 'Software Engineer');

// Access properties and call methods
person1.introduce(); // Output: Hi, my name is Alice, I am 30 years old and I work as a Software Engineer.
person1.celebrateBirthday(); // Output: Happy birthday! Alice is now 31 years old.

// Using the setter to change the name
person1.setName('Alicia');
person1.introduce(); // Output: Hi, my name is Alicia, I am 31 years old and I work as a Software Engineer.
