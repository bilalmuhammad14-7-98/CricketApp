import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { windowHeight, windowWidth } from "../../../config/dimensions";
import CustomButton from "../../../components/formComponents/CustomButton";
import { profileContext } from "../../../components/context/context";
import { useState, useEffect, useContext } from "react";
import images from "../../../config/images";
import { sizes } from "../../../config/sizes";

const button_width = windowWidth * 0.96;
const ImageWidth = windowWidth * 0.99;
const ImageHeight = windowHeight * 0.4;

const HomeScreen = (props) => {
  const { colors } = useTheme();
  const { profile } = useContext(profileContext);

  useEffect(() => {
    if (profile) {
      props.navigation.navigate("PlayerHome");
    }
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.image}>
        <Image source={images.FypLogo} style={[styles.logo]} />
      </View>
      <Text style={[styles.text1, { color: colors.heading }]}>Let's Get</Text>
      <Text style={[styles.text1, { color: colors.heading }]}>Started</Text>

      <CustomButton
        style={styles.button}
        textColor={colors.white}
        btnLabel="Login"
        bgColor={colors.primary}
        // Press={() => props.navigation.navigate("LoginCredentials")}
        Press={() => props.navigation.navigate("LoginScreen")}
      />
      <CustomButton
        style={styles.button}
        bgColor={colors.white}
        textColor={colors.primary}
        btnLabel="Signup"
        Press={() => props.navigation.navigate("SignupScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: sizes.m16,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    alignItems: "center",
  },

  logo: {
    width: ImageWidth,
    height: ImageHeight,
  },

  text1: {
    color: "black",
    fontSize: 50,
  },
  button: {
    borderRadius: 100,
    alignItems: "center",
    alignSelf: "center",
    width: button_width,
    paddingVertical: 5,
    marginVertical: 10,
  },
});
export default HomeScreen;
