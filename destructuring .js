
const appDiv = document.getElementById('destructuring');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
console.log('------Destructuring---------');

const person = {
  name: 'Poornessh',
  age: 23,
  location: {
    city: 'Erode',
    temperature: 32
  }
};

const { name, age } = person; // Destructuring
console.log(name + age);
