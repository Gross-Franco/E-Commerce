import { SET_AUTH_LEVEL,
        ADD_USER_PUBLIC,
        LOGOUT
  } from "../Actions/actionTypes";

const initialState = {
  authLevel: 1,
  user:'',
  register:false,
  login:false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_AUTH_LEVEL:
      return {
        ...state,
        authLevel: payload,
      }
//       case ADD_USER_PUBLIC:
//         return {
//           ...state,
//           user:payload,
//           register:true,login:true
//         }
//       case LOGOUT:
//         return {...state,user:'',login:false}
//       default:
//         return state;
//     }

    default:
      return state;
  }
};

export default reducer;  