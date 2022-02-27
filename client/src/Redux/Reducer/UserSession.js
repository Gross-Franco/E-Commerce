import { SET_AUTH_LEVEL } from "../Actions/actionTypes";

const initialState = {
  authLevel: 1
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_AUTH_LEVEL:
      return {
        ...state,
        authLevel: payload,
      }

    default:
      return state;
  }
};

export default reducer;
