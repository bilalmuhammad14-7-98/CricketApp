import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../config/dimensions";
import { useTheme } from "@react-navigation/native";




const button_width = windowWidth * 0.82;

export default function LoginCredentialsButton({ bgColor, btnLabel, textColor, Press }) {
//   const a = useTheme();
//   const colors = a.colors;
const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={Press}
      style={[
        styles.button,
        { backgroundColor: bgColor !== undefined ? bgColor : colors.primary },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
          },
        ]}
      >
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: "center",
    alignSelf: "center",
    width: button_width,
    paddingVertical: 5,
    margin: 5,
  },

  text: {
    fontSize: 23,
    fontWeight: "bold",
  },
});
