import axios from 'axios';
import { 
    GET_PRODUCTS,
    GET_ALL_PRODUCTS, 
    GET_BACKUP, 
    GET_CATEGORIES, 
    SEARCH_PRODUCT_ID, 
    SEARCH_PRODUCT_NAME, 
    DELETE_PRODUCT, 
    CREATE_PRODUCT, 
    FILTER_PRODUCTS, 
    ORDER_PRODCTS,
    GET_USER,
    CREATE_CATEGORY,
    SEARCH_CATEGORY_NAME,
    GET_PRODUCTS_PUBLIC,
    ADD_OR_UPDATE,
    UPDATE_PRODUCT
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
    return async (dispatch) => {
        const response = await axios.get(`${URL}/product`);
        dispatch({ type: GET_ALL_PRODUCTS, payload: response.data});
    }
}

export const searchProductId = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/products/${id}`); // chequear con la ruta del server
        dispatch({ type: SEARCH_PRODUCT_ID, payload: response.data});
    }
}

export const searchProductName = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/admin/productname?name=${name}`);
        dispatch({ type: SEARCH_PRODUCT_NAME, payload: response.data});
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

export const getBackup = function() {
    return { type: GET_BACKUP }
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

export const addOrUpdate = (addOrUpdate) => { 
    return { type: ADD_OR_UPDATE, payload: addOrUpdate}
}