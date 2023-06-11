import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import { snackReducer } from "./reducers/snackbarReducer";
import UserLogin from "./reducers/UserLogin";

const appReducer = combineReducers({
  auth: authReducer,
  loginData: UserLogin,
  snackbar: snackReducer,
});
const rootReducer = (state, action) => {
  if (action.type == "LOGOUT_USER") {
    AsyncStorage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;
