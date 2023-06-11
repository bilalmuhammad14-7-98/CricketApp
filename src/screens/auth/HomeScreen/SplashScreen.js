import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import images from "../../../config/images";

//
import { colors } from "../../../config/colors";
import { windowWidth, windowHeight } from "../../../config/dimensions";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    // setInterval(() => {
    //     navigation.navigate('SignIn')
    // }, 2000)
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={images.splashBg} style={styles.bgImage}>
        <View style={styles.logoWrappper}>
          <Animatable.Image
            animation="bounceIn"
            duration={3000}
            source={images.FinalLogoOnLight}
            style={styles.logo}
          />
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color={colors.primary}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrappper: {
    width: 250,
    height: 250,
    backgroundColor: colors.white,
    borderRadius: 300,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  logoText: {
    color: colors.primary,
    // fontFamily: 'SFUIText-Semibold',
    fontSize: 11,
  },
  logo: {
    width: windowWidth / 2.5,
    height: windowWidth / 2.5,
    resizeMode: "cover",
  },
  activityIndicator: {
    paddingTop: 20,
  },
});
