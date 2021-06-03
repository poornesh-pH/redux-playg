console.log('-----Destructuring------');
const person = {
  name: 'Poornessh',
  age: 23,
  location: {
    city: 'Erode',
    temperature: 32
  }
};

const { name, age } = person; // Object Destructuring
const { city: town, temperature: temp, state = 'TN' } = person.location;
console.log(name + ' ' + age);
console.log(town + ' ' + temp);
console.log(state); //it will displays the default value declared while Destructuring

//Array Destructuring
const item = ['Coffee (hot)', '$2.00', '$3.00', '$3.75'];
const [coffee, , med] = item;
console.log(`A medium ${coffee} costs ${med}`);
