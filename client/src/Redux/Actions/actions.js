import axios from 'axios';
import { 
    GET_ALL_PRODUCTS, 
    GET_BACKUP, 
    GET_CATEGORIES, 
    SEARCH_PRODUCT_ID, 
    SEARCH_PRODUCT_NAME, 
    DELETE_PRODUCT, 
    CREATE_PRODUCT, 
    FILTER_PRODUCTS, 
    ORDER_PRODCTS,
    AGREGAR_USUARIO
} from './actionTypes'

const URL = "http://localhost:3001";

export const getAllProducts = () => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/products`);
        dispatch({ type: GET_ALL_PRODUCTS, payload: response.data});
    }
}

export const getCategories = () => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/categories??`); // chequear con la ruta del server
        dispatch({ type: GET_CATEGORIES, payload: response.data});
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
        const response = await axios.get(`${URL}/products?name=${name}`); // chequear con la ruta del server
        dispatch({ type: SEARCH_PRODUCT_NAME, payload: response.data});
    }
}

export const createProduct = (newProduct) => {
    return async (dispatch) => {
        const post = await axios.post(`${URL}/createProduct`, newProduct); // chequear con la ruta del server
        dispatch({ type: CREATE_PRODUCT, payload: post.data});
    }
}

export const getBackup = function() {
    return { type: GET_BACKUP }
}

export const deleteProduct = function() {
    return { type: DELETE_PRODUCT }
}

export const filterProducts = function() {
    return { type: FILTER_PRODUCTS }
}

export const orderProducts = function() {
    return { type: ORDER_PRODCTS }
}
export const postUsuario = function(usuario) {
    return { 
        type: 'AGREGAR_USUARIO',
        payload:usuario 
    }
}
export const cerrarSesion = function() {
    return { 
        type: 'CERRAR_SESION',
        payload:{
            login:false,
            usuario:null
        } 
    }
}
export const iniciarSesion = function(usuario) {

    return { 
        type: 'INICIAR_SESION',
        payload:{
            usuario,
            login:true
        } 
    }
}