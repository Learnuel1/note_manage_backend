const Animal = require("./Animal");

class Dog extends Animal{
  constructor(name) {
    super(name)
  }
  bark = () =>{
    return `${this.name} woof`;
  }
}

const dog1 = new Dog("Kakinde");
const animal = new Animal("Bat");
dog1.name = "german shepherd"

console.log(dog1);
console.log(animal);