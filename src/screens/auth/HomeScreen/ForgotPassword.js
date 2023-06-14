import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Logo from "./../../../../assets/Images/Logo_1.png";
import { useNavigation, useTheme } from "@react-navigation/native";

import CustomButton from "../../../components/formComponents/CustomButton";
import Field from "../../../components/formComponents/Field";
import withToast from "../../../components/Toast";
import images from "../../../config/images";
import { useState } from "react";
import { apiActiveURL, SCREEN_WIDTH } from "../../../ApiBaseURL";
import { showSnackBar } from "../../../store/actions";
import { useDispatch } from "react-redux";
import AuthCustomFormInput from "../../../components/formComponents/AuthCustomFormInput";
import { sizes } from "../../../config/sizes";
import { validateEmail } from "../../../util";
import axios from "axios";
const input_width = SCREEN_WIDTH * 0.48;
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [resetOption, setResetOption] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForget = () => {
    if (!email) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Please enter a email address",
          error: true,
        })
      );
      return;
    }
    if (!validateEmail(email)) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Invalid email address",
          error: true,
        })
      );
      return;
    }
    const FormData = require("form-data");
    let data = new FormData();
    data.append("email", email);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}send-otp`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          dispatch(
            showSnackBar({ visible: true, text: response.data.message })
          );
          setOtpSent(true);
        } else {
          dispatch(
            showSnackBar({
              visible: true,
              text: response.data.message,
              error: true,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showSnackBar({
            visible: true,
            text: response.data.message,
            error: true,
          })
        );
      });
  };
  const verifyOtp = () => {
    if (!otp) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Please enter OTP",
          error: true,
        })
      );
      return;
    }
    if (otp.length != 6) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Incorrect OTP. Please try again",
          error: true,
        })
      );
      return;
    }
    let data = new FormData();
    data.append("otp", otp);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}verify-otp`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          dispatch(
            showSnackBar({ visible: true, text: response.data.message })
          );
          setResetOption(true);
        } else {
          dispatch(
            showSnackBar({
              visible: true,
              text: response.data.message,
              error: true,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showSnackBar({
            visible: true,
            text: response.data.message,
            error: true,
          })
        );
      });
  };
  const changePassword = () => {
    if (!password.trim()) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Please enter a password",
          error: true,
        })
      );
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "password must be 8 character long, it must have at least 1 upper case and lower case character and a symbol",
          error: true,
        })
      );

      return;
    }
    if (password.trim() != confirmPassword.trim()) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Please enter a password",
          error: true,
        })
      );
      return;
    }
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("password_confirmation", confirmPassword);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}forgot-password`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          dispatch(
            showSnackBar({ visible: true, text: response.data.message })
          );
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setOtp("");
          setOtpSent(false);
          setResetOption(false);
          navigation.replace("LoginScreen");
        } else {
          dispatch(
            showSnackBar({
              visible: true,
              text: response.data.message,
              error: true,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showSnackBar({
            visible: true,
            text: response.data.message,
            error: true,
          })
        );
      });
  };
  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: -35,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            flex: 1,
          }}
        >
          <View style={styles.image}>
            <Image
              source={images.FypLogo}
              style={[styles.logo, { height: height * 0.2 }]}
            />
          </View>

          <View style={styles.pass}>
            <Text style={[styles.text2, { color: colors.heading }]}>
              Forget
            </Text>

            <Text style={[styles.text2, { color: colors.heading }]}>
              Password?
            </Text>

            <Text style={styles.text3}>
              Don't worry it happens! Please enter the
            </Text>
            <Text style={styles.text3}>
              address associated with your account.
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              marginTop: sizes.m16,
              paddingHorizontal: 20,
            }}
          >
            {resetOption ? (
              <>
                <AuthCustomFormInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Email-Address"
                  keyboardType={"email-address"}
                  editable={false}
                />
                <AuthCustomFormInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                <AuthCustomFormInput
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                />
              </>
            ) : otpSent ? (
              <AuthCustomFormInput
                value={otp}
                onChangeText={(text) => setOtp(text)}
                placeholder="OTP"
                keyboardType="numeric"
              />
            ) : (
              <AuthCustomFormInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email-Address"
                keyboardType={"email-address"}
              />
            )}
            <CustomButton
              textColor={colors.white}
              btnLabel="Submit"
              Press={() =>
                resetOption
                  ? changePassword()
                  : otpSent
                  ? verifyOtp()
                  : handleForget()
              }
            />
          </View>

          {/* </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  image: {
    alignItems: "center",
    paddingTop: 50,
  },

  logo: {
    width: "70%",
    maxWidth: 200,
    maxHeight: 200,
  },

  pass: {
    paddingTop: 30,
    paddingLeft: 20,
  },

  text2: {
    fontSize: 40,
    fontWeight: "bold",
  },

  text3: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    flexDirection: "row",
  },

  input: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
  },
});

export default withToast(ForgotPassword);

{
  /* <View flex={1} bg = {colors.black}>
    <Image
    flex = {1}
    alt = "Logo"
    resizeMode='cover'
    size = 'lg'
    w = 'full'
    source={require ("../../../assets/Images/Logo_1.png")}
    />
    </View> */
}
