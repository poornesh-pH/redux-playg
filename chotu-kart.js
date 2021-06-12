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
  img = '',
  stocked = null,
  category = ''
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
      img,
      stocked,
      category
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

const editProduct = ({
  id,
  name,
  description,
  price,
  author,
  type,
  img,
  stocked,
  category
}) => {
  return {
    type: 'EDIT_PRODUCT',
    product: {
      id,
      author,
      description,
      name,
      price,
      type,
      img,
      stocked,
      category
    }
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
        } else return product;
      });
    default:
      return state;
  }
};

//-----------FILTERS & SORTING-----------
//SORT_BY_PRICE
//SORT_BY_AVAILABLITY
//FILTER_BY_TEXT
const filterBytext = (sortByText = '') => {
  return {
    type: 'FILTER_BY_TEXT',
    sortByText
  };
};
const sortByPrice = sortByP => {
  return {
    type: 'SORT_BY_PRICE',
    sortByP
  };
};
const filterByAvailablity = sortByA => {
  return {
    type: 'FILTER_BY_AVAILABLITY',
    sortByA
  };
};
const filterDefaultValue = {
  sortByText: '',
  sortByP: 'low-high',
  sortByA: undefined
};
const filterReducer = (state = filterDefaultValue, action) => {
  switch (action.type) {
    case 'SORT_BY_PRICE':
      return { ...state, sortByP: action.sortByP };
    case 'FILTER_BY_TEXT':
      return { ...state, sortByText: action.sortByText };
    case 'FILTER_BY_AVAILABLITY':
      return { ...state, sortByA: action.sortByA };
    default:
      return state;
  }
};

const getVisibleProducts = (products, { sortByText, sortByA, sortByP }) => {
  const textFiltered = products.filter(
    product =>
      product.name.toLowerCase().includes(sortByText.toLowerCase()) ||
      product.author.toLowerCase().includes(sortByText.toLowerCase())
  );

  const availFiltered = () => {
    if (sortByA) return textFiltered.filter(product => product.stocked > 0);
    else return textFiltered;
  };
  const priceFiltered = availFiltered().sort((a, b) => {
    if (sortByP === 'low-high') return a.price < b.price ? -1 : 1;
    else if (sortByP === 'high-low') return a.price > b.price ? -1 : 1;
  });
  return priceFiltered;
};

const store = createStore(
  combineReducers({
    products: productsReducer,
    filters: filterReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleProducts = getVisibleProducts(state.products, state.filters);
  console.log(visibleProducts);
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
    stocked: 0
  })
);
// const removeProduct1 = store.dispatch(removeProduct(product1.product.id));

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
    category: product2.product.category,
    description: product2.product.description,
    img: product2.product.img,
    inCart: product2.product.inCart,
    name: product2.product.name,
    price: product2.product.price,
    type: 'paperback',
    stocked: 10
  })
);

const filterByAuthor = store.dispatch(filterBytext('poornesh'));
const sortByAvail = store.dispatch(filterByAvailablity(false));
const sortPhigh = store.dispatch(sortByPrice('high-low'));
