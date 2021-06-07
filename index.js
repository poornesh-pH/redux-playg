import { createStore, combineReducers } from 'redux';

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
// PRODUCTS
//ADD_PRODUCT
//REMOVE_PRODUCT
//EDIT_PRODUCT
const productsDefaultvalue = []

const productsReducer = (state = productsDefaultvalue, action) => {

};

//FILTERS & SORTING
//SORT_BY_PRICE
//SORT_BY_AVAILABLITY
//FILTER_BY_TEXT
filterDefaultValue = {
  text: '',
  price: null,
  stocked: null
}
const filterReducer = (state = filterDefaultValue, action) => {};



const store = createStore(
  combineReducers(() => {
    products: productsReducer;
    filters: filterReducer;
  })
);
// console.log(store.getState());
