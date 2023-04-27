import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../config/dimensions";


const button_width = windowWidth * 0.96;

export default function CustomButton({ bgColor, btnLabel, textColor, Press }) {
  const a = useTheme();
  const colors = a.colors;
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
    marginVertical: 10,
  },

  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
