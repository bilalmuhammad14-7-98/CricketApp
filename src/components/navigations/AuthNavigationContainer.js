import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/auth/HomeScreen/Home";
import Login from "../../screens/auth/HomeScreen/Login";
import Signup from "../../screens/auth/HomeScreen/Signup";
import ForgotPassword from "../../screens/auth/HomeScreen/ForgotPassword";
import CustomBottomTabNavigator from "./CustomBottomTabNavigator";
import LoginCredentials from "../../screens/auth/HomeScreen/LoginCredentials";
import UmpireLogin from "../../screens/auth/HomeScreen/UmpireLogin";
import RecruiterLogin from "../../screens/auth/HomeScreen/RecruiterLogin";
import SplashScreen from "../../screens/auth/HomeScreen/SplashScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function AuthNavigationContainer() {
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  console.log(
    userLoginSuccess,
    "userLoginSuccessuserLoginSuccessuserLoginSuccess"
  );
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={userLoginSuccess ? "PlayerHome" : "HomeScreen"}
    >
      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginCredentials" component={LoginCredentials} />
      <Stack.Screen name="UmpireLogin" component={UmpireLogin} />
      <Stack.Screen name="RecruiterLogin" component={RecruiterLogin} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PlayerHome" component={CustomBottomTabNavigator} />
    </Stack.Navigator>
  );
}
