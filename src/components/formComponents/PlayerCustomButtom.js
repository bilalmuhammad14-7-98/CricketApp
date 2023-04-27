import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "../../config/dimensions";

//import icons
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "react-native-vector-icons";
import { sizes } from "../../config/sizes";

const button_width = windowWidth * 0.33;
const IMAGE_SIZE1 = windowHeight * 0.025;

export default function PlayerCustomButtom({
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
      <View style={{ flexDirection: "row"}}>
        <AntDesign
          name="adduser"
          size={IMAGE_SIZE1}
          color="#fff"
          resizeMode="contain"
        />
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
      </View>
    </TouchableOpacity>
   
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: "center",
    width: button_width,
    paddingVertical: 5,
  },

  text: {
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: sizes.m5
  },
});
