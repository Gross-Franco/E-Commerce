import { GET_PRODUCTS, GET_ALL_PRODUCTS, GET_BACKUP, GET_CATEGORIES, SEARCH_PRODUCT_ID, SEARCH_PRODUCT_NAME, DELETE_PRODUCT, CREATE_PRODUCT, FILTER_PRODUCTS, ORDER_PRODCTS} from './Actions/actionTypes'

const initialState = {
    products: [],
    productDetail: {},
    UserTest:[]
};



const rootReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        
        case SEARCH_PRODUCT_NAME:
            return {
                ...state,
                products: action.payload
            }
        
        default: 
            return {...state}
    };
}

export default rootReducer;