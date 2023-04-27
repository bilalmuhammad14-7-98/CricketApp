import { DefaultTheme } from "@react-navigation/native";
import { MD3LightTheme } from "react-native-paper";

const colors = {
  primary: "#2BB789",
  heading: "#006A42",
  text: "#eee",
  black: "#000",
  white: "#fff",
  white1: "#F9EBEB",
  gray: "#ccc",
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  //   ...MD3LightTheme,
  colors: {
    ...DefaultTheme.colors,
    // ...MD3LightTheme.colors,
    primary: "#2BB789",
    heading: "#006A42",
    text: "#eee",
    black: "#000",
    white: "#fff",
    white1: "#F9EBEB",
  },
};

export {
  CustomDefaultTheme,
  colors,
};
