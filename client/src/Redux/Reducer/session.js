import { SIGN_IN, LOGOUT } from "../Actions/actionTypes";

const initialState = {
  user: "",
  login: false,
  response: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      console.log(payload)
      return {
        ...state,
        user: payload.data.user,
        response: {
          success: payload.success,
          message: payload.message,
        },
        login: payload.success ? true : false,
      };
    case LOGOUT:
      return {
        ...state,
        user: "",
      };
    default:
      return state;
  }
};

export default reducer;
