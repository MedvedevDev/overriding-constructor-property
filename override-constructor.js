// OVERRIDING THE CONSTRUCTOR PROPERTY
function Person() {}
Person.prototype.dance = function(){return 'dancing'};

function Warrior() {}

// Achieve a prototype chain so that a Warrior can be a Person.
// We’ve achieved inheritance by setting the prototype of the Warrior constructor to a new instance of a Person object.
// And when we set a new Person object as a prototype to the Warrior constructor, we lose the original Warrior prototype that keeps our constructor property.
Warrior.prototype = new Person();

const warrior = new Warrior();
console.log(warrior instanceof Warrior); //true
console.log(warrior instanceof Person); //true
console.log(warrior instanceof Object); //true
console.log(warrior.dance()); //dancing
console.log(warrior.constructor === Warrior); //false

//We define a new non-enumerable constructor property pointing back to Warrior.
Object.defineProperty(Warrior.prototype, 'constructor', {
  configurable: true, //If set to true, the property’s descriptor can be changed and the property can be deleted. If set to false, we can do neither of these things
  enumerable: false, //If set to true, the property shows up during a for-in loop over the object’s properties.
  value: Warrior, //Specifies the value of the property. Defaults to undefined.
  writable: true //If set to true, the property value can be changed by using an assignment.
});

console.log(warrior.constructor === Warrior); //true. We’ve reestablished the connection.

for (let prop in Warrior.prototype) {
  // We haven’t added any enumerablev properties to the Warrior.prototype.
  console.log(prop === 'dance', 'The only enumerable property is dance!');
}