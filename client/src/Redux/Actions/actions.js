import axios from 'axios';
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
    
    // Orders
    GET_ORDERS,
    GET_ORDER_DETAILS,
    FILTER_ORDERS,
    CHANGE_ORDER_STATUS,
    
    // Misc
    ADD_OR_UPDATE,

} from './actionTypes';

const URL = "http://localhost:3001";

export const getProducts = () => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/admin/products`);
        dispatch({ type: GET_PRODUCTS, payload: response.data});
    }
}

export const getCategories = () => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/admin/categories`); // chequear con la ruta del server
        dispatch({ type: GET_CATEGORIES, payload: response.data});
    }
}
export const getProductsPublic = () => {
    return (dispatch) => {
        axios.get(`${URL}/product`)
        .then((res)=>{
            dispatch({ type:GET_PRODUCTS_PUBLIC, payload:res.data});
        },(err)=>{
            alert(err)
        })
}
}

export const searchProductId = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/product/productId/${id}`);
        dispatch({ type: SEARCH_PRODUCT_ID, payload: response.data});
    }
}

export const searchProductName = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/admin/productname?name=${name}`);
        dispatch({ type: SEARCH_PRODUCT_NAME, payload: response.data});
    }
}

export const searchProductNamePublic = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/product/name?name=${name}`);
        dispatch({ type: SEARCH_PRODUCT_NAME_PUBLIC, payload: response.data});
    }
}

export const searchCategoryName = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/admin/categoryname?name=${name}`);
        dispatch({ type: SEARCH_CATEGORY_NAME, payload: response.data});
    }
}
export const createProduct = (newProduct) => {
    return async (dispatch) => {
        const post = await axios.post(`${URL}/admin/createProducts`, newProduct); // chequear con la ruta del server
        dispatch({ type: CREATE_PRODUCT, payload: post.data});
    }
}

export const updateProduct = (editedProduct) => {
    return async (dispatch) => {
        const post = await axios.post(`${URL}/admin/editProducts`, editedProduct); // chequear con la ruta del server
        dispatch({ type: UPDATE_PRODUCT, payload: post.data});
    }
}

export const createCategory = (newCategory) => {
    return async (dispatch) => {
        const post = await axios.post(`${URL}/admin/createCategory`, newCategory); // chequear con la ruta del server
        dispatch({ type: CREATE_CATEGORY, payload: post.data});
    }
}

export const deleteProduct = function() {
    return { type: DELETE_PRODUCT }
}

export const filterProducts = function(categories) {
    return async (dispatch) => {
        const response = await axios.post(`${URL}/product/filtercategory`, categories); // chequear con la ruta del server
        dispatch({ type: FILTER_PRODUCTS, payload: response.data});
    }}

export const orderProducts = function() {
    return { type: ORDER_PRODCTS }
}

export const setAddOrUpdate = (addOrUpdate) => { 
    return { type: ADD_OR_UPDATE, payload: addOrUpdate}
}

export const getUsers = () => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/user/getUsers`);
        dispatch({ type: GET_USERS, payload: response.data});
    }
}

export const promoteUser = (userId) => {
    return async (dispatch) => {
        const post = await axios.get(`${URL}/admin/createAdmin/${userId}`); // chequear con la ruta del server
        dispatch({ type: PROMOTE_USER, payload: post.data});
    }
}

export const deleteUser = (userId) => {
    return async (dispatch) => {
        const post = await axios.get(`${URL}/admin/deleteUser/${userId}`); 
        dispatch({ type: DELETE_USER, payload: post.data});
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        await axios.post(`${URL}/user/resetpassword`, { email: email}); 
    }
}

export const passwordResetToken = (token, newPassword) => {
    return async (dispatch) => {
        const post = await axios.post(`${URL}/user/${token}`, {newPassword,});
        dispatch({ type: RESET_PASSWORD, payload: post.data});
    }
}

export const getOrders = () => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/admin/orders`);
        dispatch({ type: GET_ORDERS, payload: response.data});
    }
}

export const filterOrderByStatus = (filter) => {
    return async (dispatch) => {
        const response = await axios.post(`${URL}/admin/filterOrderByStatus`, {status:filter});
        dispatch({ type: FILTER_ORDERS, payload: response.data});
    }
}

export const changeOrderStatus = (orderId, status) => {
    return async (dispatch) => {
        const response = await axios.post(`${URL}/admin/changeOrderStatus`, {orderId, status});
        dispatch({ type: CHANGE_ORDER_STATUS, payload: response.data});
    }
}

export const getOrderId = (orderId) => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/admin/orders/${orderId}`);
        dispatch({ type: CHANGE_ORDER_STATUS, payload: response.data});
    }
}