import { combineReducers } from "redux";
import userReducer from "./UserReduser";

// Combine all reducers using combineReducers from Redux
const combineReducer = combineReducers({
  userReducer: userReducer
});

export default combineReducer;
