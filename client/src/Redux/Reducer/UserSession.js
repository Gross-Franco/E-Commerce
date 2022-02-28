import { ADD_USER_PUBLIC, LOGOUT } from "../Actions/actionTypes";

const initialState = {
  user: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_PUBLIC:
      return { ...state, user: action.payload};
    case LOGOUT:
      return { ...state, user: ""};
    default:
      return state;
  }
};

export default reducer;
