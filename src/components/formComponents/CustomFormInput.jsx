import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, I18nManager } from "react-native";
import { useTheme } from "@react-navigation/native";
import { sizes } from "../../config/sizes";
import { windowHeight } from "../../config/dimensions";
import { colors } from "../../config/colors";

//icons import
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons
} from "react-native-vector-icons";



export default function FormInput({ placeholderText, mystyle, ...rest }) {
  const { colors } = useTheme();
  // const theme = useTheme();

  const [isFocus, setIsFocus] = useState(false);
  
  
  return (
    <View>
    <View
      style={[
        styles.formWarapper,
        { borderColor: isFocus ? '#2BB789' : '#B2BEB5' },
      ]}
    >
      <TextInput
        style={[
          styles.textBox,
          { color: isFocus ? '#000' : '#B2BEB5', ...mystyle },
        ]}
        placeholder={placeholderText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholderTextColor= '#2BB789'
        {...rest}
      />
    </View>

   
      </View>
  );
}

const styles = StyleSheet.create({
  formWarapper: {
    minHeight: windowHeight / 18,
    borderBottomWidth: 1.5,
    // borderRadius: 15,
    // justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: sizes.m25,
    flexDirection: "row",
    // alignItems: "center",
  },


  textBox: {
    // fontFamily: "PoppinsMedium",
    fontSize: sizes.h3,
    // flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
});
