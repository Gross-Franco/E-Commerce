//IN PROGRES
import {
  GET_ORDERS,
  FILTER_ORDERS,
  CHANGE_ORDER_STATUS,
  GET_ORDER_DETAILS,
  CREATE_SHOPPING_SESSION,
  DELETE_SHOPPING_SESSION,
  GET_CART_ITEMS,
  ADD_CART_ITEM,
  EDIT_CART_ITEM_QTY,
  DELETE_CART_ITEM,
  DELETE_CART,
} from "../Actions/actionTypes";

const initialState = {
  orders: [],
  orderDetails: {},
  cartItems: [],
  session: {},
  loadCart: false,
  loadOrders: true,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
        loadOrders: false,
      };

    case FILTER_ORDERS:
      return {
        ...state,
        orders: payload,
        loadOrders: false,
      };

    case CHANGE_ORDER_STATUS:
      return {
        ...state,
        loadOrders: true,
      };

    case GET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: payload,
      };

    case CREATE_SHOPPING_SESSION:
      return {
        ...state,
        session: payload,
      };
    case DELETE_SHOPPING_SESSION:
      return {
        ...state,
        session: {},
        loadCart: true,
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
        loadCart: false,
      };
    case ADD_CART_ITEM:
      return {
        ...state,
        loadCart: true,
      };
    case EDIT_CART_ITEM_QTY:
      return {
        ...state,
        loadCart: true
      };
    case DELETE_CART_ITEM:
      return {
        ...state,
        loadCart: true
      };
    case DELETE_CART:
      return {
        ...state,
        loadCart: true
      };
    default:
      return state;
  }
};

export default reducer;
