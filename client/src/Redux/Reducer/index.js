const initialState = {
    //aun no se sabe q nesecitamos
    lista:[],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case 'INITIAL':
            return {
                ...state,
                lista:action.payload,
            }
        default:
            return state;
    }
}

export default rootReducer;