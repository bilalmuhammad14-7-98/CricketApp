import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import UserLogin from "./reducers/UserLogin";

const rootReducer = combineReducers({
  auth: authReducer,
  loginData: UserLogin,
});

export default rootReducer;
