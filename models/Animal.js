class Animal {
  name = null;
  color = "black";

constructor(name) {
  try {
    if(!name || name === null) throw new Error("Invalid name");
    this.name = name;
  } catch (error) {
    console.log(error.message);
  }
}
setColor = (color) =>{
  this.color = color;
}
}
module.exports =Animal;

