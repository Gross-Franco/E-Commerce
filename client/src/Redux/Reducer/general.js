import { ADD_OR_UPDATE, RESET_PASSWORD } from "../Actions/actionTypes";

const initialState = {
    addOrUpdate: 'add',
    reset: ""
}
const reducer = (state = initialState, {type, payload}) => {
    switch(type){

        case ADD_OR_UPDATE:
        return {
            ...state,
            addOrUpdate: payload
        }
        case RESET_PASSWORD:
        return {
            ...state,
            reset: payload
        }

        default: return state;
    }
}

export default reducer;