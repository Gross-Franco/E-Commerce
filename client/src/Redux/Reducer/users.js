import {
  CREATE_USER,
  GET_USERS,
  DELETE_USER,
  PROMOTE_USER,
  USER_REVIEWS,
  USER_ORDERS,
  GET_WISHLIST,
  ADD_WISHLIST,
  REMOVE_WISHLIST,
  USER_ADDRESS,
  USER_DETAILS,
  USER_PAYMENTS
} from "../Actions/actionTypes";

const initialState = {
  users: [],
  loadUsers: true,
  details: {},
  address: [],
  payments: [],
  response: null,
  orders: [],
  reviews: [],
  wishlist: [],
  loadWishlist: true
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case GET_USERS:
      return {
        ...state,
        users: payload,
        loadUsers: false,
      };
    
    case USER_DETAILS:
      return {
        ...state,
        details: payload
      } 
    
    case USER_ADDRESS:
      return {
        ...state,
        address: payload
      } 
    
      case USER_PAYMENTS:
      return {
        ...state,
        payments: payload
      } 
      
    case CREATE_USER:
      return {
        ...state,
        response: {
          success: payload.success,
          message: payload.message,
        },
        loadUsers: true
      }

    case PROMOTE_USER: 
      return {
        ...state,
        loadUsers: true
      }

    case DELETE_USER: 
      return {
        ...state,
        loadUsers: true
      }

    case USER_ORDERS:
      return {
        ...state,
        orders: payload
      }

    case USER_REVIEWS:
      return {
        ...state,
        reviews: payload
      }
    
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: payload,
        loadWishlist: false
      }
     
    case ADD_WISHLIST:
      return {
        ...state,
        loadWishlist: true
      }  

    case REMOVE_WISHLIST:
      return {
        ...state,
        loadWishlist: true
      }  
      
    default:
      return state;
  }
};

export default reducer;
