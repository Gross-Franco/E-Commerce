import { axiosWithCredentials as axios } from "../../utilities/axios";
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
  PRODUCT_REVIEWS,

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
  SIGN_IN,
  USER_ORDERS,
  USER_REVIEWS,
  GET_WISHLIST,
  ADD_WISHLIST,
  REMOVE_WISHLIST,

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
  SAVE_LOCAL_STORAGE,
  GET_LOCAL_STORAGE,
  DELETE_ITEM_LOCAL_STORAGE,
  EDIT_LOCAL_STORAGE_QTY,
  UPDATE_SUBTOTAL
} from "./actionTypes";

export const getProducts = () => {
  return async (dispatch) => {
    const response = await axios.get(`/admin/products`);
    dispatch({ type: GET_PRODUCTS, payload: response.data });
  }
}

export const getCategories = () => {
  return async (dispatch) => {
    const response = await axios.get(`/admin/categories`); // chequear con la ruta del server
    dispatch({ type: GET_CATEGORIES, payload: response.data });
  }
}
export const getProductsPublic = () => {
  return (dispatch) => {
    axios.get(`/product`)
      .then((res) => {
        dispatch({ type: GET_PRODUCTS_PUBLIC, payload: res.data });
      }, (err) => {
        alert(err)
      })
  }
}

export const searchProductId = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/product/productId/${id}`);
    dispatch({ type: SEARCH_PRODUCT_ID, payload: response.data });
  }
}

export const searchProductName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`/admin/productname?name=${name}`);
    dispatch({ type: SEARCH_PRODUCT_NAME, payload: response.data });
  }
}

export const searchProductNamePublic = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`/product/name?name=${name}`);
    dispatch({ type: SEARCH_PRODUCT_NAME_PUBLIC, payload: response.data });
  }
}

export const searchCategoryName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`/admin/categoryname?name=${name}`);
    dispatch({ type: SEARCH_CATEGORY_NAME, payload: response.data });
  }
}
export const createProduct = (newProduct) => {
  return async (dispatch) => {
    const post = await axios.post(`/admin/createProducts`, newProduct); // chequear con la ruta del server
    dispatch({ type: CREATE_PRODUCT, payload: post.data });
  }
}

export const updateProduct = (editedProduct) => {
  return async (dispatch) => {
    const post = await axios.post(`/admin/editProducts`, editedProduct); // chequear con la ruta del server
    dispatch({ type: UPDATE_PRODUCT, payload: post.data });
  }
}

export const createCategory = (newCategory) => {
  return async (dispatch) => {
    const post = await axios.post(`/admin/createCategory`, newCategory); // chequear con la ruta del server
    dispatch({ type: CREATE_CATEGORY, payload: post.data });
  }
}
export const deleteProduct = function () {
  return { type: DELETE_PRODUCT };
};

export const filterProducts = function (categories) {
  return async (dispatch) => {
    const response = await axios.post(`/product/filtercategory`, categories); // chequear con la ruta del server
    dispatch({ type: FILTER_PRODUCTS, payload: response.data });
  }
}

export const orderProducts = function () {
  return { type: ORDER_PRODCTS };
};

export const setAddOrUpdate = (addOrUpdate) => {
  return { type: ADD_OR_UPDATE, payload: addOrUpdate };
};

export const getUsers = () => {
  return async (dispatch) => {
    const response = await axios.get(`/user/getUsers`);
    dispatch({ type: GET_USERS, payload: response.data });
  }
}

export const promoteUser = (userId) => {
  return async (dispatch) => {
    const post = await axios.get(`/admin/createAdmin/${userId}`); // chequear con la ruta del server
    dispatch({ type: PROMOTE_USER, payload: post.data });
  }
}

export const deleteUser = (userId) => {
  return async (dispatch) => {
    const post = await axios.get(`/admin/deleteUser/${userId}`);
    dispatch({ type: DELETE_USER, payload: post.data });
  }
}
export const resetPassword = (email) => {
  return async (dispatch) => {
    await axios.post(`/user/resetpassword`, { email: email });
  };
};

export const passwordResetToken = (token, newPassword) => {
  return async (dispatch) => {
    const post = await axios.post(`/user/${token}`, { newPassword, });
    dispatch({ type: RESET_PASSWORD, payload: post.data });
  }
}

export const getOrders = () => {
  return async (dispatch) => {
    const response = await axios.get(`/admin/orders`);
    dispatch({ type: GET_ORDERS, payload: response.data });
  }
}

export const filterOrderByStatus = (filter) => {
  return async (dispatch) => {
    const response = await axios.post(`/admin/filterOrderByStatus`, { status: filter });
    dispatch({ type: FILTER_ORDERS, payload: response.data });
  }
}

export const changeOrderStatus = (orderId, status) => {
  return async (dispatch) => {
    const response = await axios.post(`/admin/changeOrderStatus`, { orderId, status });
    dispatch({ type: CHANGE_ORDER_STATUS, payload: response.data });
  }
}

export const getOrderId = (orderId) => {
  return async (dispatch) => {
    const response = await axios.get(`/admin/orders/${orderId}`);
    dispatch({ type: CHANGE_ORDER_STATUS, payload: response.data });
  }
}


export const createUser = ({
  first_name,
  last_name,
  email,
  password,
  // verificatePassword,
  paymentMethod, 
  username,
  address,
  phoneNumber,
  postalNumber
}) => {
  return async (dispatch) => {
    const response = await axios.post(`/user/createUser`, {
      first_name,
      last_name,
      email,
      password,
      // verificatePassword,
      paymentMethod, 
      username,
      address,
      phoneNumber,
      postalNumber
    });

    
    if (response?.data?.success) {
      console.log(response);
      dispatch({ type: CREATE_USER, payload: response.data });
    } else {
      dispatch({ type: CREATE_USER, payload: response.response.data });
    }
  };
};

export const createShoppingSession = (userId = 1) => {
  //userId = 1 mientras no hay logueo
  return async (dispatch) => {
    const response = await axios.post(
      `/shopping/session?user_id=${userId}`
    );
    dispatch({ type: CREATE_SHOPPING_SESSION, payload: response.data });
  };
};
export const deleteShoppingSession = (sessionId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/shopping/session?session_id=${sessionId}`
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
        `/shopping/cart?session_id=${sessionId}`
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
      const { data } = await axios.post(`/shopping/cart`, {
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
      const { data } = await axios.put(`/shopping/cart`, {
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

export const deleteCartItem = (sessionId, productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/shopping/cart?product_id=${productId}&session_id=${sessionId}`
      );
      if (data) {
        dispatch({ type: DELETE_CART_ITEM, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//     export const RegisterUserPublic = (UserData) => {
//         return (dispatch) => {

//             axios.post(`/user/register`, UserData)
//             .then((res)=>{

//                 //correo de verificacion
//                 //redirect
//                 window.location.href = `/`;
//                 alert("Registro exitoso, Se le ha enviado un mensaje de verificación al correo.")          
//             },(err)=>{ 
//                 //alert(err)
//                   alert("EL usuario ya existe en el sistema")

//             })
//             }
//   };


export const deleteCart = (sessionId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/shopping/cart?session_id=${sessionId}`
      );
      if (data) {
        dispatch({ type: DELETE_CART, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const signIn = (data) => {
  return async (dispatch) => {
    const response = await axios.post(`/user/login`, data);
    if (response?.data?.success) {
      dispatch({ type: SIGN_IN, payload: response.data });
    } else {
      dispatch({ type: SIGN_IN, payload: response.response.data });
    }
   
  };
};
export const checkSession = (token) => {
  return (dispatch) => {
    axios
      .post(`/user/login`, null, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(
        (resp) => {
          let { user } = resp.data.data;
          dispatch({ type: SIGN_IN, payload: user });
        },
        (err) => {
          console.log(err);
        }
      );
  };
};
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("eCUs");
    dispatch({ type: LOGOUT });
  };
};

export const saveLocal = () => {
  return (dispatch) => {
    dispatch({ type: SAVE_LOCAL_STORAGE });
  };
};

export const getLocalStorage = () => {
  return (dispatch) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    dispatch({ type: GET_LOCAL_STORAGE, payload: cartItems });
  };
}

export const deleteItemLocalStorage = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM_LOCAL_STORAGE, payload: id });
  };
}

export const editLocalQty = (id, qty) => {
  return (dispatch) => {
    console.log(id, qty);
    dispatch({ type: EDIT_LOCAL_STORAGE_QTY, payload: { id, qty } });
  };
}
export const updateSubtotal = () => {
  return (dispatch) => {
    dispatch({ type: UPDATE_SUBTOTAL });
  };
}

export const userOrders = (userid) => {
  return async (dispatch) => {
    const response = await axios.get(`/user/history/${userid}`); 
    dispatch({ type: USER_ORDERS, payload: response.data });
  }
}

export const userReviews = (userid) => {
  return async (dispatch) => {
    const response = await axios.get(`/user/reviews/${userid}`); 
    dispatch({ type: USER_REVIEWS, payload: response.data });
  }
}

export const getWishlist = (userid) => {
  return async (dispatch) => {
    const response = await axios.get(`/user/wishlist/${userid}`); 
    dispatch({ type: GET_WISHLIST, payload: response.data });
  }
}

export const addToWishlist = (userId, productId) => {
  return async (dispatch) => {
    const post = await axios.post(`/user/addToWishlist`, {userId, productId});
    dispatch({ type: ADD_WISHLIST, payload: post.data })
  }
}

export const removeFromWishlist = (userId, productId) => {
  return async (dispatch) => {
    const post = await axios.post(`/user/removeFromWishlist`, {userId, productId});
    dispatch({ type: REMOVE_WISHLIST, payload: post.data })
  }
}