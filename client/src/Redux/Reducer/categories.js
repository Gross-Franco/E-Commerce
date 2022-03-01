import {
  GET_CATEGORIES,
  SEARCH_CATEGORY_NAME,
  CREATE_CATEGORY,
  GET_CATEGORIES_PUBLIC,
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

    case GET_CATEGORIES_PUBLIC:
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