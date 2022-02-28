import products from "./products";
import categories from "./categories";
import general from "./general";
import users from "./users"
import session from "./UserSession"
// import shopping from "./shopping"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  products,
  categories,
  general,
  // shopping,
  users,
  session,
})

export default rootReducer;
