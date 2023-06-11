import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Toast from "react-native-root-toast";
// import Logo from '../../../assets/Images/Fyp_Logo.jpg';

//imports
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../../components/http/http";

// imports
import AuthCustomFormInput from "../../../components/formComponents/AuthCustomFormInput";
import { sizes } from "../../../config/sizes";
import CustomButton from "../../../components/formComponents/CustomButton";
import ForgotPassword from "./ForgotPassword";
import { signInRequest } from "../../../services/authService";
import CustomToast from "../../../components/formComponents/CustomToast";
import { windowHeight, windowWidth } from "../../../config/dimensions";
import { colors } from "../../../config/colors";
import { SetUser } from "../../../store/actions/authAction";
import { profileContext } from "../../../components/context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import withToast from "../../../components/Toast";

const curve_height = windowHeight * 0.25;
const input_width = windowHeight * 0.48;
const button_height = windowHeight * 0.33;

const UmpireLogin = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState();
  const { profile } = useContext(profileContext);
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  const { colors } = useTheme();

  useEffect(() => {
    if (profile) {
      props.navigation.navigate("UmpireHome");
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${http}/api/signin`, {
        email: username,
        password: password,
      });

      if (response.data.isOk == false) {
        alert(response.data.message);
      } else if (response.data.isOk == true) {
        await AsyncStorage.setItem("Profile", JSON.stringify(response.data));
        alert("Login Successfully !!!");
        props.navigation.navigate("UmpireHome");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  useEffect(() => {
    setTimeout(function hideToast() {
      setToast({ ...toast, show: false, message: "" });
    }, 500);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CustomToast show={toast.show} message={toast.message} />
      <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
        <View style={{ height: curve_height }}>
          {/* <View style = {styles.image}>
          <Image source={Logo} style= {styles.logo} 
          />
        </View> */}
        </View>
        {/* <View style={{ height: curve_height }}>
          <Text style={styles.text1}>Login</Text>
        </View> */}
      </LinearGradient>

      {/* <View style={[styles.curve]}> */}
      <View
        style={{
          marginTop: sizes.m35 * -1,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: 1,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text3}>Login to your Account</Text>
        </View>

        <View style={{ width: input_width, padding: sizes.m10 }}>
          <AuthCustomFormInput
            autoComplete="name"
            placeholderText="Email-Address"
            value={username}
            onChangeText={handleUsernameChange}
          />

          {/* <Field
            value={password}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          /> */}

          <AuthCustomFormInput
            value={password}
            placeholderText="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />

          <TouchableOpacity
            onPress={() => props.navigation.navigate("ForgotPassword")}
          >
            <View style={styles.a1}>
              <Text style={[styles.text4, { color: colors.primary }]}>
                Forgot Password ?
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: button_height }}>
          <CustomButton
            textColor="white"
            btnLabel="Login"
            Press={() => handleSubmit()}
          />

          <View style={styles.a2}>
            <Text style={styles.text5}>Don't have an account ? </Text>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignupScreen")}
            >
              <Text style={[styles.text6, { color: colors.heading }]}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // root: {
  //   flex: 1,
  // },

  text1: {
    fontSize: sizes.h,
    fontWeight: "bold",
    // marginVertical: 50,
    textAlign: "center",
    marginTop: 85,
    color: colors.heading,
  },

  text2: {
    fontSize: 40,
    fontWeight: "bold",
  },

  curve: {
    backgroundColor: "lightyellow",
    flex: 1,
    borderTopLeftRadius: 130,
    paddingTop: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },

  text3: {
    color: colors.primary,
    fontSize: sizes.m30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  a1: {
    alignItems: "flex-end",
    // paddingLeft: 30,
  },

  text4: {
    fontWeight: "bold",
    fontSize: 16,
  },

  a2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  text5: {
    fontSize: 16,
    fontWeight: "bold",
  },

  text6: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default withToast(UmpireLogin);
