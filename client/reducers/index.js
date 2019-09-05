import { combineReducers } from "redux";
import currentUser from "./currentUser";
import twiterReducer from "./twitterReducer";


const rootReducer = combineReducers({
  currentUser,
  twitter: twiterReducer
});

export default rootReducer;