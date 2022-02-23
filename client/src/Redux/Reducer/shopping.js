//IN PROGRES
import {
    GET_ORDERS,
    FILTER_ORDERS,
    CHANGE_ORDER_STATUS,
    GET_ORDER_DETAILS
  } from "../Actions/actionTypes";

const initialState = {
    orders: [],
    orderDetails: {},
    loadOrders: true,
  };

const reducer = (state = initialState, {type, payload}) =>{
    
    switch(type){
      case GET_ORDERS:
        return {
            ...state,
            orders: payload,
            loadOrders: false,
        }
        
      case FILTER_ORDERS:
        return {
            ...state,
            orders: payload,
            loadOrders: false
        }

      case CHANGE_ORDER_STATUS: 
        return {
            ...state,
            loadOrders: true
        }

      case GET_ORDER_DETAILS: 
        return {
            ...state,
            orderDetails: payload
        }

      default:
        return state;
  }
}

export default reducer;