import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';
const demoState = {
  id: 1,
  name: 'The Power of HABIT',
  description:
    'The Power of HABIT: Why We Do What We Do in Life and Business. A young woman walks into a laboratory. Over the past two years, she has transformed almost every aspect of her life. She has quit smoking, run a marathon, and been promoted at work. The patterns inside her brain, neurologists discover, have fundamentally changed.',
  price: 16.33,
  author: 'Charles Duhigg',
  type: 'hardcover',
  img:
    'https://images-na.ssl-images-amazon.com/images/I/51ejXdSceNL._AA300_.jpg',
  inCart: false,
  category: 'business',
  stocked: true
};
// ----------PRODUCTS-----------
//ADD_PRODUCT
const addProduct = ({
  id,
  name = '',
  description = '',
  price = '',
  author = '',
  type = '',
  img = ''
} = {}) => {
  return {
    type: 'ADD_PRODUCT',
    product: {
      id: uuidv4(),
      name,
      description,
      price,
      author,
      type,
      img
    }
  };
};
//REMOVE_PRODUCT
const removeProduct = (id = '') => {
  return {
    type: 'REMOVE_PRODUCT',
    id
  };
};
//EDIT_PRODUCT

const editProduct = ({ id, name, description, price, author, type, img }) => {
  return {
    type: 'EDIT_PRODUCT',
    product: { id, author, description, name, price, type, img }
  };
};

const productsDefaultvalue = [];

const productsReducer = (state = productsDefaultvalue, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.product];
    case 'REMOVE_PRODUCT':
      return state.filter(product => product.id !== action.id);
    case 'EDIT_PRODUCT':
      return state.map(product => {
        if (product.id === action.product.id) {
          return {
            ...action.product
          };
        }
      });
    default:
      return state;
  }
};

//-----------FILTERS & SORTING-----------
//SORT_BY_PRICE
//SORT_BY_AVAILABLITY
//FILTER_BY_TEXT
const filterBytext = (text = '', products = {}) => {
  return {
    type: 'FILTER_BY_TEXT',
    products,
    text
  };
};

const filterDefaultValue = {
  text: '',
  price: null,
  stocked: null
};
const filterReducer = (state = filterDefaultValue, action) => {
  switch (action.type) {
    case 'SORT_BY_PRICE':
      return state;
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    products: productsReducer,
    filters: filterReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});
const product1 = store.dispatch(
  addProduct({
    name: 'The Power of HABIT',
    description:
      'The Power of HABIT: Why We Do What We Do in Life and Business. A young woman walks into a laboratory. Over the past two years, she has transformed almost every aspect of her life. She has quit smoking, run a marathon, and been promoted at work. The patterns inside her brain, neurologists discover, have fundamentally changed.',
    price: 16.33,
    author: 'Charles Duhigg',
    type: 'hardcover',
    img:
      'https://images-na.ssl-images-amazon.com/images/I/51ejXdSceNL._AA300_.jpg',
    inCart: false,
    category: 'business',
    stocked: 15
  })
);
const removeProduct1 = store.dispatch(removeProduct(product1.product.id));

const product2 = store.dispatch(
  addProduct({
    name: 'True Fiction (Ian Ludlow Thrillers)',
    description:
      'A breakneck thriller where truth and fiction collide for the unluckiest writer alive.',
    price: 4.99,
    author: 'Lee Goldberg',
    type: 'kindle',
    img:
      'https://images-na.ssl-images-amazon.com/images/I/51UbplnqSgL._SX331_BO1,204,203,200_.jpg',
    inCart: false,
    category: 'mystery',
    stocked: 13
  })
);

const editProduct2 = store.dispatch(
  editProduct({
    id: product2.product.id,
    author: 'Poornesh',
    type: 'paperback'
  })
);

const filterByAuthor = store.dispatch(filterBytext('abc', store.products));
