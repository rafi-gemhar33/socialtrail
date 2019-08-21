import { combineReducers } from "redux";
import currentUser from "./currentUser";
import updateUser from "./updateUser";


const rootReducer = combineReducers({
  currentUser, updateUser
});

export default rootReducer;