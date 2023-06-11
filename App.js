import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider } from "react-redux";

// imports
import MyNavigationContainer from "./src/components/navigations";
import { store, persistor } from "./src/store";
import ProfileContextProvider from "./src/components/context/context";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2BB789",
    heading: "#006A42",
    text: "#eee",
    black: "#000",
    white: "#fff",
    white1: "#F9EBEB",
    gray: "#ccc",
  },
};

const BottomTab = () => {};

function App() {
  return (
    <ProfileContextProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <MyNavigationContainer />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </ProfileContextProvider>
  );
}

export default App;
