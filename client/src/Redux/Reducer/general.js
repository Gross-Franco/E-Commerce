import { ADD_OR_UPDATE } from "../Actions/actionTypes";

const initialState = {
    addOrUpdate: 'add'
}
const reducer = (state = initialState, {type, payload}) => {
    switch(type){

        case ADD_OR_UPDATE:
        return {
            ...state,
            addOrUpdate: payload
        }

        default: return state;
    }
}

export default reducer;