import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";
import { colors } from "../../config/colors";



const Field = (props) => {
  const { colors } = useTheme();

  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={colors.heading}
    >

    </TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 100,
    paddingHorizontal: 10,
    backgroundColor: "rgb(220,220, 220)",
    margin: 5,
    paddingTop: 5,
    paddingBottom: 5,

  },
});
export default Field;
