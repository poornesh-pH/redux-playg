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

const editExpense = ({ id, note = '', description = '', amount = 0 } = {}) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    note,
    description,
    amount
  };
};

//REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
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
      return {
        ...state[action.id],
        id: action.id,
        note: action.note,
        description: action.description,
        amount: action.amount
      };
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

store.dispatch(removeExpense({ id: expenseOne.expense.id }));
store.dispatch(
  editExpense({
    id: expenseTwo.expense.id,
    note: 'edited',
    description: 'edited',
    amount: 12
  })
);
const expenseThree = store.dispatch(
  addExpense({
    amount: 5000,
    note: 'this is grocery expense',
    description: 'Grocery',
    createdAt: 0
  })
);

//state
// Action Generators
// Reducers
//store

//dispatch
