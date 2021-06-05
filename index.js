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
    type: 'ADD_EXPENSE',
    expense: {
      id: uuidv4(),
      amount,
      note,
      description,
      createdAt
    }
  };
};
//EDIT_EXPENSE
const editExpense = (id, updates) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updates
  };
};

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  };
};

const setTextField = ({ text = '' } = {}) => {
  return {
    type: 'FILTER_BY_TEXT',
    text
  };
};

//SET_START_DATE
//SET_END_DATE
//SORT_BY_DATE
//SORT_BY_AMOUNT

const expenseReducerStateDefault = [];
const expenseReducer = (state = expenseReducerStateDefault, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};
const filterReducerStateDefault = {
  sortBy: '',
  text: '',
  startDate: undefined,
  endDate: undefined
};
const filterReducer = (state = filterReducerStateDefault, action) => {
  switch (action.type) {
    case 'FILTER_BY_TEXT':
      return { ...store, text: action.text };
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
store.subscribe(() => console.log(store.getState()));

const expenseOne = store.dispatch(
  addExpense({
    amount: 1000,
    note: 'this is room rent',
    description: 'Rent',
    createdAt: 0
  })
);
const expenseTwo = store.dispatch(
  addExpense({
    amount: 1000,
    note: 'this is coffee expense',
    description: 'Coffee',
    createdAt: 0
  })
);

const expenseThree = store.dispatch(
  removeExpense({ id: expenseOne.expense.id })
);

const expenseFour = store.dispatch(
  editExpense(expenseTwo.expense.id, {
    note: 'edited',
    description: 'edited',
    amount: 12
  })
);
const expenseFive = store.dispatch(
  addExpense({
    amount: 5000,
    note: 'this is grocery expense',
    description: 'Grocery',
    createdAt: 0
  })
);
const searchByText = store.dispatch(setTextField());
// console.log(expenseOne,"expense1");
// console.log(expenseTwo,"expense2");
// console.log(expenseThree,"expense3");
// console.log(expenseFour,"expense4");
// console.log(expenseFive,"expense5");

//state
// Action Generators
// Reducers
//store

//dispatch
