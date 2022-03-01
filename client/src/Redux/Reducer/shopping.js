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
  SAVE_LOCAL_STORAGE,
  GET_LOCAL_STORAGE,
  DELETE_ITEM_LOCAL_STORAGE,
  EDIT_LOCAL_STORAGE_QTY,
  UPDATE_SUBTOTAL,
} from "../Actions/actionTypes";

const initialState = {
  orders: [],
  orderDetails: {},
  cartItems: [],
  cartStorage: [],
  session: {},
  loadCart: false,
  loadOrders: true,
  subTotal: 0,
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
    case SAVE_LOCAL_STORAGE:
      let cartStorage = JSON.parse(localStorage.getItem("cartItems"));
      return {
        ...state,
        cartStorage: cartStorage,
        loadCart: true,
      };
    case GET_LOCAL_STORAGE: 
      return {
        ...state,
        cartStorage: payload,
        loadCart: false,
        subTotal: localStorage.getItem("subTotal"),
      };
    case DELETE_ITEM_LOCAL_STORAGE: 

      let newCart = JSON.parse(localStorage.getItem("cartItems"));
      newCart = newCart?.filter((item) => item.id !== payload) || [];
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return {
        ...state,
        cartStorage: newCart,
        loadCart: false,
      };
    case EDIT_LOCAL_STORAGE_QTY: 
      let newCartStrg = JSON.parse(localStorage.getItem("cartItems"));
      
      newCartStrg = newCartStrg?.map(item => {
        if (item.id === payload.id) {
          item.quantity = payload.qty;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(newCartStrg));
      return {
        ...state,
        cartStorage: newCartStrg,
        loadCart: false,
      };
    case UPDATE_SUBTOTAL:
      let lastCart = JSON.parse(localStorage.getItem("cartItems"));
      let subTotal = lastCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem("subTotal", JSON.stringify(subTotal));
      return {
        ...state,
        subTotal: subTotal,
      };
    default: 
      return state;
  }
};

export default reducer;
