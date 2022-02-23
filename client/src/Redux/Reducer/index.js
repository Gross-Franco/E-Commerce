import products from "./products";
import categories from "./categories";
import general from "./general";
import users from "./users"
// import shopping from "./shopping"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  products,
  categories,
  general,
  shopping,
  users
})

export default rootReducer;
