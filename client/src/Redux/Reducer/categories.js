import {
  GET_CATEGORIES,
  SEARCH_CATEGORY_NAME,
  CREATE_CATEGORY,
} from "../Actions/actionTypes";

const initialState = {
  categories: [],
  loadCategories: true,
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case CREATE_CATEGORY: 
      return {
        ...state,
        loadCategories: true
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loadCategories: false
      };

    case SEARCH_CATEGORY_NAME:
      return {
        ...state,
        categories: payload
      }

    default:
      return state;
  }
};

export default reducer;