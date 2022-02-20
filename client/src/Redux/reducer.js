import {
  GET_PRODUCTS,
  GET_PRODUCTS_PUBLIC,
  GET_BACKUP,
  GET_CATEGORIES,
  SEARCH_PRODUCT_ID,
  SEARCH_PRODUCT_NAME,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  FILTER_PRODUCTS,
  ORDER_PRODCTS,
  GET_USER,
} from "./Actions/actionTypes";

const initialState = {
  products: [],
  productDetail: {},
  UserTest: [],
  categories: []

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
      case GET_PRODUCTS_PUBLIC:
       const ProductsRandoms =  action.payload; 
      
      

      return {
        ...state,
        products: ProductsRandoms,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case GET_USER:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
