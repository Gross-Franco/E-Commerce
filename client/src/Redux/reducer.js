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
  SEARCH_CATEGORY_NAME,
  CREATE_CATEGORY,
  ADD_OR_UPDATE
} from "./Actions/actionTypes";

const initialState = {
  products: [],
  productsPublic:[],
  productDetail: {},
  UserTest: [],
  categories: [],
  loadProducts: true,
  loadCategories: true,
  addOrUpdate: 'add'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loadProducts: false,
      };
      
      case GET_PRODUCTS_PUBLIC:
      return {
        ...state,
        productsPublic: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        loadProducts: true
      };

    case CREATE_CATEGORY: 
      return {
        ...state,
        loadCategories: true
      };

    case FILTER_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }

    case SEARCH_PRODUCT_NAME:
      return {
        ...state,
        products: action.payload,
      }
    case  SEARCH_PRODUCT_ID:{
      return{
        ...state,
        productDetail:action.payload
      }
    }
    case GET_USER:
      return {
        ...state,
        isAdmin: action.payload,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loadCategories: false
      };

    case SEARCH_CATEGORY_NAME:
      return {
        ...state,
        categories: action.payload
      }

    case ADD_OR_UPDATE:
      return {
        ...state,
        addOrUpdate: action.payload
      }
      
    default:
      return { ...state };
  }
};

export default rootReducer;
