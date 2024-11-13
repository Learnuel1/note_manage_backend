// Base class - Vehicle
class Vehicle {
  make = "";
  model = "";
  year = 0;

  // Method to get vehicle details
  getDetails() {
    return `${this.year} ${this.make} ${this.model}`;
  }

  // Method to set vehicle details
  setDetails(make, model, year) {
    if (!make || !model || !year) {
      throw new Error("All details (make, model, year) must be provided.");
    }
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

// Derived class - Car
class Car extends Vehicle {
  doors = 4;

  // Method specific to Car class
  getCarInfo() {
    return `This car is a ${this.getDetails()} with ${this.doors} doors.`;
  }

  // Method to set number of doors
  setDoors(doors) {
    if (doors < 2 || doors > 5) {
      throw new Error("Doors must be between 2 and 5.");
    }
    this.doors = doors;
  }
}

// Derived class - Motorcycle
class Motorcycle extends Vehicle {
  type = "Standard";

  // Method specific to Motorcycle class
  getMotorcycleInfo() {
    return `This motorcycle is a ${this.getDetails()}, type: ${this.type}.`;
  }

  // Method to set motorcycle type
  setType(type) {
    if (!type) {
      throw new Error("Motorcycle type must be provided.");
    }
    this.type = type;
  }
}

// Example usage
try {
  // Create an instance of Car
  const car1 = new Car();
  car1.setDetails("Tesla", "Model 3", 2021);
  car1.setDoors(4);
  console.log(car1.getCarInfo()); // Output: This car is a 2021 Tesla Model 3 with 4 doors.

  // Create an instance of Motorcycle
  const bike1 = new Motorcycle();
  bike1.setDetails("Harley-Davidson", "Sportster", 2022);
  bike1.setType("Cruiser");
  console.log(bike1.getMotorcycleInfo()); // Output: This motorcycle is a 2022 Harley-Davidson Sportster, type: Cruiser.

  // Example error handling
  car1.setDoors(6); // This will throw an error because doors must be between 2 and 5.
} catch (error) {
  console.error("Error:", error.message);
}
