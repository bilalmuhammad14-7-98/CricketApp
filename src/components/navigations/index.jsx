import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import CustomBottomTabNavigator from "./CustomBottomTabNavigator";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigationContainer from "./AuthNavigationContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetUser } from "../../store/actions/authAction";

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
  },
};

export default function MyNavigationContainer() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const userState = state.auth.user;

  const init = async () => {
    try {
      var user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);
      if (user != null) {
        dispatch(SetUser(user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, [])

  return (
    <NavigationContainer theme={MyTheme} screenOptions={{ headerShown: false }}>

      {userState.token != null ? <CustomBottomTabNavigator /> : <AuthNavigationContainer />}

    </NavigationContainer>
  );
}
