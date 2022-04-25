import { combineReducers } from "redux";
import loginReducer from "./login";
import homeReducer from "./home";
const rootReducer = combineReducers({
  loginReducer,
  homeReducer,
});
export default rootReducer;
