// Import stylesheets
import './style.css';
import { createStore } from 'redux';
// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy =
        typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
});

store.dispatch({
  type: 'INCREMENT',
  incrementBy: 10
});
store.dispatch({
  type: 'INCREMENT'
});
store.dispatch({
  type: 'INCREMENT'
});

store.dispatch({
  type: 'DECREMENT'
});
store.dispatch({
  type: 'INCREMENT',
  incrementBy: 10
});

store.dispatch({
  type: 'SET',
  count: 100
});

console.log(store.getState());

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


const item = ['Coffee (hot)', '$2.00','$3.00','$3.75'];
const [coffee,,med] = item;
console.log(`A medium ${coffee} costs ${med}`);