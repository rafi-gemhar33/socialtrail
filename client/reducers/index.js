import { combineReducers } from "redux";
import currentUser from "./currentUser";
// import updateUser from "./updateUser";


const rootReducer = combineReducers({
  currentUser
});

export default rootReducer;