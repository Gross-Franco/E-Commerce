import { GET_ALL_PRODUCTS, GET_BACKUP, GET_CATEGORIES, SEARCH_PRODUCT_ID, SEARCH_PRODUCT_NAME, DELETE_PRODUCT, CREATE_PRODUCT, FILTER_PRODUCTS, ORDER_PRODCTS} from './Actions/actionTypes'

const initialState = {
    products: [],
    productDetail: {},
    UserTest:[],

    login:true,
    usuarios:[{email:'pedro@h.com',password:'1234'}],
    usuario:null

};



const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INICIAR_SESION':
            return {
                ...state,
                usuario:action.payload.usuario,
                login:action.payload.login
            }
        case 'AGREGAR_USUARIO':
            return {
                ...state,
                usuarios:[...state.usuarios, action.payload],
            }
        case 'CERRAR_SESION':
            return {
                ...state,
                login:action.payload.login,
                usuario:action.payload.usuario,
            }
            
        default: 
            return {...state}
    };
}

export default rootReducer;