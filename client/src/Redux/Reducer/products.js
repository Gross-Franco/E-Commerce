import {
  GET_PRODUCTS,
  GET_PRODUCTS_PUBLIC,
  GET_BACKUP,
  SEARCH_PRODUCT_ID,
  SEARCH_PRODUCT_NAME,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  FILTER_PRODUCTS,
  ORDER_PRODCTS,
  ADD_OR_UPDATE,
  SEARCH_PRODUCT_NAME_PUBLIC,
  UPDATE_PRODUCT,
  POST_REVIEW,
  LOAD_DETAILS,
} from "../Actions/actionTypes";

const initialState = {
  products: [],
  productDetail: {},
  loadProducts: true,
  loadReviews: true
};

const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loadProducts: false,
      };
      
      case GET_PRODUCTS_PUBLIC:
      return {
        ...state,
        products: payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        loadProducts: true
      };

    case SEARCH_PRODUCT_ID:
      return {
        ...state,
        productDetail: payload,
        loadReviews: false
      }

    case FILTER_PRODUCTS:
      return {
        ...state,
        products: payload
      }

    case SEARCH_PRODUCT_NAME:
      return {
        ...state,
        products: payload,
      }

    case SEARCH_PRODUCT_NAME_PUBLIC:
      return {
        ...state,
        products: payload,
      }

    
    case UPDATE_PRODUCT:
      return {
        ...state,
        loadProducts: true
      }
    
    case LOAD_DETAILS:
      return {
        ...state,
        loadReviews: true
      } 
      
    case POST_REVIEW:
      return {
        ...state,
        loadReviews: true
      }

    default:
      return state;
  }
};

export default rootReducer;