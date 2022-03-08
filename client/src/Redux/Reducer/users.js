import {
  CREATE_USER,
  GET_USERS,
  DELETE_USER,
  PROMOTE_USER,
  USER_REVIEWS,
  USER_ORDERS
} from "../Actions/actionTypes";

const initialState = {
  users: [],
  response: null,
  loadUsers: true,
  orders: [],
  reviews: [],
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case GET_USERS:
      return {
        ...state,
        users: payload,
        loadUsers: false,
      };
    
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

    default:
      return state;
  }
};

export default reducer;
