import { SIGN_IN, LOGOUT, SUCCESS_SESSION, FAIL_SESSION } from "../Actions/actionTypes";

const initialState = {
  user: null,
  login: false,
  loading: true,
  response: null,
  isAdmin: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        user: payload.user,
        response: {
          success: payload.success,
          message: payload.message,
        },
        isAdmin: payload.user.isAdmin,
        login: payload.success ? true : false,
        loading: true,
      };
    case LOGOUT:
      return {
        ...state,

        user: null,
        login: false,
        isAdmin: false, 
        loading: true,
      };
    case SUCCESS_SESSION:
      console.log(payload)
      return {
        ...state,
        user: payload.user,
        response: null,
        isAdmin: payload.isAdmin,
        login: payload.success ? true : false,
        loading: false,
      }
    case FAIL_SESSION:
      return {
        ...state,
        response: {
          message: payload.message,
          success: payload.success
        },
        isAdmin: false,
        loading: false,
      }

    default:
      return state;
  }
};

export default reducer;
