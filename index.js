import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';

const demoState = {
  expenses: [
    {
      id: 'asdasdasd',
      amount: 1000,
      note: 'This is a note',
      description: 'This is the description',
      createdAt: 0
    }
  ],
  filters: {
    sortBy: 'amount', // date or amount
    text: 'rent',
    startDate: undefined,
    endDate: undefined
  }
};

//ADD_EXPENSE
const addExpense = ({
  amount = 0,
  note = '',
  description = '',
  createdAt = 0
} = {}) => {
  return {
    type: 'ADDEXPENSE',
    id: uuidv4(),
    amount,
    note,
    description,
    createdAt
  };
};
//EDIT_EXPENSE
//REMOVE_EXPENSE
//SET_START_DATE
//SET_END_DATE
//SORT_BY_DATE
//SORT_BY_AMOUNT

const expenseReducerStateDefault = [];
const expenseReducer = (state = expenseReducerStateDefault, action) => {
  console.log(action);
  switch (action.type) {
    case 'ADDEXPENSE':
      return [...state, action];
    default:
      return state;
  }
};
const filterReducerStateDefault = {
  sortBy: 'amount',
  text: 'rent',
  startDate: undefined,
  endDate: undefined
};
const filterReducer = (state = filterReducerStateDefault, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);

store.dispatch(
  addExpense({
    amount: 1000,
    note: 'this is room rent',
    description: 'Rent',
    createdAt: 0
  })
);

console.log(store.getState());
