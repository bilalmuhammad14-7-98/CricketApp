import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "../../config/dimensions";
import { sizes } from "../../config/sizes";

const button_height = windowWidth * 0.3;

export default function CustomButton1({
  bgColor,
  btnLabel,
  textColor,
  Press,
  myStyle,
}) {
  const a = useTheme();
  const colors = a.colors;
  return (
    <TouchableOpacity
      onPress={Press}
      style={[
        styles.button,
        {
          backgroundColor: "#2BB789",
          ...myStyle,
          // bgColor !== undefined ? bgColor : colors.primary
        },
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
    borderRadius: 10,
    alignItems: "center",
    width: button_height,
    paddingVertical: 5,
  },

  text: {
    fontSize: sizes.h5,
    fontWeight: "bold",
  },
});
