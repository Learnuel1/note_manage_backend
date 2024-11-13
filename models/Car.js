// Define a class named 'Car'
class Car {
  // Properties are defined outside the constructor
  make = "Toyota";
  model = "Corolla";
  year = 2020;

  // Method to describe the car
  getDetails() {
    return `This car is a ${this.year} ${this.make} ${this.model}.`;
  }

  // Method to set new car details
  setDetails(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

// Create an instance of the Car class
const car1 = new Car();
car1.make = "keke";
car1.year = 2025;
// Access the default properties and call methods
console.log(car1.getDetails()); // Output: This car is a 2020 Toyota Corolla.
const car2 = new Car(); 
car2.make = "camry";
console.log(car2.getDetails());
// // Update the car's details
// car1.setDetails("Honda", "Civic", 2021);

// // Access the updated properties
// console.log(car1.getDetails()); // Output: This car is a 2021 Honda Civic.