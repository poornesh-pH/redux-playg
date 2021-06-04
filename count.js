//Action Generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});
const set = ({ set = 1 } = {}) => ({
  type: 'SET',
  set
});
const reset = () => ({
  type: 'RESET'
});

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.set
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
};
const store = createStore(countReducer);

store.dispatch(incrementCount({ incrementBy: 10 }));

store.dispatch(decrementCount({ decrementBy: 5 }));

store.dispatch(reset());

store.dispatch(set({ set: 100 }));

console.log(store.getState());
