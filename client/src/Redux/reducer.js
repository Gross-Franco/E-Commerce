import { GET_ALL_PRODUCTS, GET_BACKUP, GET_CATEGORIES, SEARCH_PRODUCT_ID, SEARCH_PRODUCT_NAME, DELETE_PRODUCT, CREATE_PRODUCT, FILTER_PRODUCTS, ORDER_PRODCTS} from './Actions/actionTypes'

const initialState = {
    products: [],
    productDetail: {}
};



const rootReducer = (state = initialState, action) => {
    switch(action.type) {
            
        default: 
            return {...state}
    };
}

export default rootReducer;