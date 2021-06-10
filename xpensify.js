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

//SORT_BY_DATE
const sortByDate = () => {
  return {
    type: 'SORT_BY_DATE'
  };
};
//SORT_BY_AMOUNT
const sortByAmount = () => {
  return {
    type: 'SORT_BY_AMOUNT'
  };
};
//SET_START_DATE
const setStartDate = startDate => {
  return {
    type: 'SET_START_DATE',
    startDate
  };
};
//SET_END_DATE
const setEndDate = endDate => {
  return {
    type: 'SET_END_DATE',
    endDate
  };
};

const getVisibleExpenses = (expenses, { sortBy, text, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return a.createdAt < b.createdAt ? 1 : -1;
      if (sortBy === 'amount') return a.amount < b.amount ? 1 : -1;
    });
};

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
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
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
store.subscribe(() => {
  const state = store.getState();
  const visibleExpeses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpeses);
});

const expenseOne = store.dispatch(
  addExpense({
    amount: 2000,
    note: 'this is room rent',
    description: 'Rent',
    createdAt: 10
  })
);
const expenseTwo = store.dispatch(
  addExpense({
    amount: 10000,
    note: 'this is coffee expense',
    description: 'Coffee',
    createdAt: 20
  })
);

// const expenseThree = store.dispatch(
//   removeExpense({ id: expenseOne.expense.id })
// );

// const expenseFour = store.dispatch(
//   editExpense(expenseTwo.expense.id, {
//     note: 'edited',
//     description: 'edited',
//     amount: 12
//   })
// );
// const expenseFive = store.dispatch(
//   addExpense({
//     amount: 5000,
//     note: 'this is grocery expense',
//     description: 'Grocery',
//     createdAt: 0
//   })
// );

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
store.dispatch(setStartDate(0));
store.dispatch(setEndDate(100));
// store.dispatch(setTextField({ text: 'e' }));
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
