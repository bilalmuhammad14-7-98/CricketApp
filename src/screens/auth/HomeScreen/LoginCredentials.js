import { StatusBar } from "expo-status-bar";
import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  SafeAreaView,
} from "react-native";

// imports
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

//import
import { windowHeight, windowWidth } from "../../../config/dimensions";
import { sizes } from "../../../config/sizes";
import LoginCredentialsButton from "../../../components/formComponents/LoginCredentialsButton";
import { colors } from "../../../config/colors";
import images from "../../../config/images";
import withToast from "../../../components/Toast";
import { useNavigation } from "@react-navigation/native";

const PROFILECARD_WIDTH = windowWidth * 0.9;
const PROFILECARD_HEIGHT = windowHeight * 0.6;
const CARD_WIDTH1 = windowWidth * 0.85;
const CARD_HEIGHT = windowHeight * 0.1;
const HEIGHT = windowHeight * 0.05;
const CARD_WIDTH = windowWidth * 0.05;
const curve_height = windowHeight * 0.3;

const LoginCredentials = (props) => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
          <View style={{ height: curve_height }}>
            {/* <View style={styles.image}>
              <Image source={images.LoginCredentials} style={[styles.logo]} />
            </View> */}
          </View>
        </LinearGradient>

        <View
          style={{
            marginTop: sizes.m35 * -1,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            flex: 1,
          }}
        >
          <View
            style={{
              width: PROFILECARD_WIDTH,
              height: PROFILECARD_HEIGHT,
              margin: sizes.m13,
              marginTop: HEIGHT,
              marginLeft: CARD_WIDTH,
              borderRadius: sizes.m15,
              borderColor: colors.primary,
              backgroundColor: colors.white,
              borderWidth: 2,
            }}
          >
            <View style={styles.card}>
              <LoginCredentialsButton
                textColor="white"
                btnLabel="Login As Player"
                Press={() => navigation.navigate("LoginScreen")}
                //   Press={() => handleSubmit()}
              />
            </View>

            <View style={styles.card}>
              <LoginCredentialsButton
                textColor="white"
                btnLabel="Login As Recruiter"
                Press={() => navigation.navigate("RecruiterLogin")}
                //   Press={() => handleSubmit()}
              />
            </View>

            <View style={styles.card}>
              <LoginCredentialsButton
                textColor="white"
                btnLabel="Login As Umpire"
                Press={() => navigation.navigate("UmpireLogin")}
                //   Press={() => handleSubmit()}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(LoginCredentials);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH1,
    height: CARD_HEIGHT,
    marginTop: HEIGHT,
    borderRadius: sizes.m15,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },

  image: {
    alignItems: "center",
    paddingTop: 50,
  },
  logo: {},
});
