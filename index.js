// Import stylesheets
import './style.css';
import { createStore } from 'redux';
// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const store = createStore((state = { count: 0 }, action) => {

switch(action.type){
  case 'INCREMENT':
  return{
    count: state.count + 1
  }
  case 'DECREMENT':
  return{
    count: state.count - 1
  }
  case 'RESET':
  return{
    count : 0
  }
  default: return state
}
});

store.dispatch({
  type: 'INCREMENT'
});
store.dispatch({
  type: 'INCREMENT'
});
store.dispatch({
  type: 'INCREMENT'
});

store.dispatch({
  type:"DECREMENT"
}
)

console.log(store.getState());
