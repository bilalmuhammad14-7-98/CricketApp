import { createStore, combineReducers, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunkMiddleware from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
const persistor = persistStore(store, {}, () => {});

const setConfig = () => {
  var data = store.getState();
};
export { store, persistor, setConfig };
