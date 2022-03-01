import axios from "axios";
import {
  // Products
  GET_PRODUCTS,
  SEARCH_PRODUCT_ID,
  SEARCH_PRODUCT_NAME,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  FILTER_PRODUCTS,
  ORDER_PRODCTS,
  GET_PRODUCTS_PUBLIC,
  UPDATE_PRODUCT,
  SEARCH_PRODUCT_NAME_PUBLIC,

  // Categories
  GET_CATEGORIES,
  CREATE_CATEGORY,
  SEARCH_CATEGORY_NAME,

  // Users
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  PROMOTE_USER,
  RESET_PASSWORD,
  ADD_USER_PUBLIC,

  // Orders
  GET_ORDERS,
  GET_ORDER_DETAILS,
  FILTER_ORDERS,
  CHANGE_ORDER_STATUS,

  // Misc
  ADD_OR_UPDATE,

  // Shopping
  CREATE_SHOPPING_SESSION,
  DELETE_SHOPPING_SESSION,
  GET_CART_ITEMS,
  ADD_CART_ITEM,
  EDIT_CART_ITEM_QTY,
  DELETE_CART_ITEM,
  DELETE_CART,
  LOGOUT,
} from "./actionTypes";

const URL = "http://localhost:3001";

export const getProducts = () => {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/admin/products`);
    dispatch({ type: GET_PRODUCTS, payload: response.data });
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/admin/categories`); // chequear con la ruta del server
    dispatch({ type: GET_CATEGORIES, payload: response.data });
  };
};
export const getProductsPublic = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/product/`);
      if (data) dispatch({ type: GET_PRODUCTS_PUBLIC, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchProductId = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/product/productId/${id}`);
    dispatch({ type: SEARCH_PRODUCT_ID, payload: response.data });
  };
};

export const searchProductName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/admin/productname?name=${name}`);
    dispatch({ type: SEARCH_PRODUCT_NAME, payload: response.data });
  };
};

export const searchProductNamePublic = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/product/name?name=${name}`);
    dispatch({ type: SEARCH_PRODUCT_NAME_PUBLIC, payload: response.data });
  };
};

export const searchCategoryName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/admin/categoryname?name=${name}`);
    dispatch({ type: SEARCH_CATEGORY_NAME, payload: response.data });
  };
};
export const createProduct = (newProduct) => {
  return async (dispatch) => {
    const post = await axios.post(`${URL}/admin/createProducts`, newProduct); // chequear con la ruta del server
    dispatch({ type: CREATE_PRODUCT, payload: post.data });
  };
};

export const updateProduct = (editedProduct) => {
  return async (dispatch) => {
    const post = await axios.post(`${URL}/admin/editProducts`, editedProduct); // chequear con la ruta del server
    dispatch({ type: UPDATE_PRODUCT, payload: post.data });
  };
};

export const createCategory = (newCategory) => {
  return async (dispatch) => {
    const post = await axios.post(`${URL}/admin/createCategory`, newCategory); // chequear con la ruta del server
    dispatch({ type: CREATE_CATEGORY, payload: post.data });
  };
};

export const deleteProduct = function () {
  return { type: DELETE_PRODUCT };
};

export const filterProducts = function (categories) {
  return async (dispatch) => {
    const response = await axios.post(`${URL}/product/filtercategory`, categories); // chequear con la ruta del server
    dispatch({ type: FILTER_PRODUCTS, payload: response.data });
  };
};

export const orderProducts = function () {
  return { type: ORDER_PRODCTS };
};

export const setAddOrUpdate = (addOrUpdate) => {
  return { type: ADD_OR_UPDATE, payload: addOrUpdate };
};

export const getUsers = () => {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/user/getUsers`);
    dispatch({ type: GET_USERS, payload: response.data });
  };
};

export const promoteUser = (userId) => {
  return async (dispatch) => {
    const post = await axios.get(`${URL}/admin/createAdmin/${userId}`); // chequear con la ruta del server
    dispatch({ type: PROMOTE_USER, payload: post.data });
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    const post = await axios.get(`${URL}/admin/deleteUser/${userId}`);
    dispatch({ type: DELETE_USER, payload: post.data });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    await axios.post(`${URL}/user/resetpassword`, { email: email });
  };
};

export const passwordResetToken = (token, newPassword) => {
  return async (dispatch) => {
    const post = await axios.post(`${URL}/user/${token}`, { newPassword });
    dispatch({ type: RESET_PASSWORD, payload: post.data });
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/admin/orders`);
    dispatch({ type: GET_ORDERS, payload: response.data });
  };
};

export const filterOrderByStatus = (filter) => {
  return async (dispatch) => {
    const response = await axios.post(`${URL}/admin/filterOrderByStatus`, {
      status: filter,
    });
    dispatch({ type: FILTER_ORDERS, payload: response.data });
  };
};

export const changeOrderStatus = (orderId, status) => {
  return async (dispatch) => {
    const response = await axios.post(`${URL}/admin/changeOrderStatus`, {
      orderId,
      status,
    });
    dispatch({ type: CHANGE_ORDER_STATUS, payload: response.data });
  };
};

export const getOrderId = (orderId) => {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/admin/orders/${orderId}`);
    dispatch({ type: GET_ORDER_DETAILS, payload: response.data });
  };
};

export const RegisterUserPublic = (UserData) => {
  return (dispatch) => {
    axios.post(`${URL}/user/createUser`, UserData).then(
      (res) => {
        //correo de verificacion

        // redirect
        window.location.href = `/`;
        alert(
          "Registro exitoso, Se le ha enviado un mensaje de verificación al correo."
        );
      },
      (err) => {
        // alert(err)
        alert("EL usuario ya existe en el sistema");
      }
    );
  };
};

export const createShoppingSession = (userId = 1) => { //userId = 1 mientras no hay logueo
  return async (dispatch) => {
    const response = await axios.post(
      `${URL}/shopping/session?user_id=${userId}`
    );
    dispatch({ type: CREATE_SHOPPING_SESSION, payload: response.data });
  };
};
export const deleteShoppingSession = (sessionId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${URL}/shopping/session?session_id=${sessionId}`
      );
      if (data) {
        dispatch({ type: DELETE_SHOPPING_SESSION, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getCartItems = (sessionId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL}/shopping/cart?session_id=${sessionId}`
      );
      if (data) {
        dispatch({ type: GET_CART_ITEMS, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const addCartItem = (sessionId, productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/shopping/cart`, {
        session_id: sessionId,
        product_id: productId,
      });
      if (data) {
        dispatch({ type: ADD_CART_ITEM, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const editCartItemQty = ({ sessionId, productId, quantity }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL}/shopping/cart`, {
        session_id: sessionId,
        product_id: productId,
        quantity: quantity,
      });
      if (data) {
        dispatch({ type: EDIT_CART_ITEM_QTY, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCartItem = ( sessionId, productId ) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${URL}/shopping/cart?product_id=${productId}&session_id=${sessionId}`);
      if (data) {
        dispatch({ type: DELETE_CART_ITEM, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCart = (sessionId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${URL}/shopping/cart?session_id=${sessionId}`);
      if (data) {
        dispatch({ type: DELETE_CART, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const login=(data)=>{
  return (dispatch)=>{
    axios.post(`${URL}/user/login`,data)
    .then(resp=>{
      let {user,Token}= resp.data.data
      //porque la session es null
      localStorage.setItem('eCUs',JSON.stringify({Token,session:''}))
      console.log(user)
       dispatch({type:ADD_USER_PUBLIC,payload:user})
    },(err)=>{
      alert("Error: "+err)
    })
  }
}
export const checkSession=(token)=>{
  console.log("Hola mundo test")
  return (dispatch)=>{
    axios.post(`${URL}/user/login`,null,{headers:{Authorization:'Bearer '+token}})
    .then(resp=>{
      let {user}= resp.data.data
      dispatch({type:ADD_USER_PUBLIC,payload:user})
    },(err)=>{
      alert("Error: "+err)
    })
  } 
}
export const logout=()=>{
  return (dispatch)=>{
    localStorage.removeItem('eCUs');
    dispatch({type:LOGOUT})
  }
}