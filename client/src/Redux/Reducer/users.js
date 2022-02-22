import {
  GET_USER,
} from "../Actions/actionTypes";

const initialState = {
  UserTest: [],
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case GET_USER:
      return {
        ...state,
        isAdmin: payload,
      };

    default:
      return state;
  }
};

export default reducer;
