import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import CustomButton from "../../../components/formComponents/CustomButton";
import AuthCustomFormInput from "../../../components/formComponents/AuthCustomFormInput";

import { windowHeight, windowWidth } from "../../../config/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { sizes } from "../../../config/sizes";
import CustomDropDown from "../../../components/formComponents/CustomDropDown";
// import Field from "../../components/formComponents/Field";
import { useTheme } from "@react-navigation/native";
// import { signUpRequest } from "../../services/authService";
import Toast from "react-native-root-toast";
import { set } from "react-native-reanimated";
import axios from "axios";
import { http } from "../../../components/http/http.js";
import { colors } from "../../../config/colors";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";

const curve_height = windowHeight * 0.25;
const input_width = windowHeight * 0.48;
const button_height = windowHeight * 0.1;

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [role, setrole] = useState("");
  const inputRef = useRef(null);

  const data_gender = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
  ];

  // const [role, setRole] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  const { colors } = useTheme();

  const onClick = async (event) => {
    const data = {
      name: name,
      password: password,
      email: email,
      age: age,
      gender: gender,
      role: role,
    };

    console.log(data, "signup Data");

    // try {
    //   const response = await axios.post(`${http}/api/signup`, {
    //     name: name,
    //     password: password,
    //     email: email,
    //     age: age,
    //     gender: gender,
    //     role:role,
    //   })
    //   if (response.data.isOk == false) {

    //     alert(response.data.message)
    //   }
    //   else if (response.data.isOk == true) {
    //     alert(response.data.message)
    //     props.navigation.navigate("LoginScreen")
    //   }

    // } catch (error) {
    //   console.log(error.message)
    // }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
          <View style={{ height: curve_height }}>
            <Text style={[styles.text1, { color: colors.heading }]}>
              Register
            </Text>
            <Text style={styles.text2}>Create a new account</Text>
          </View>
        </LinearGradient>

        <View
          style={{
            marginTop: -35,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            flex: 1,
          }}
        >
          <View
            style={{
              width: input_width,
              padding: sizes.m15,
              marginTop: sizes.m5,
            }}
          >
            <AuthCustomFormInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder=" Name"
            />

            <AuthCustomFormInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email-Address"
              keyboardType={"email-address"}
            />

            <AuthCustomFormInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              secureTextEntry={true}
            />

            <AuthCustomFormInput
              value={age}
              onChangeText={(text) => setAge(text)}
              placeholder="Age"
              keyboardType={""}
              // keyboardType={"email-address"}
            />
            <AuthCustomFormInput
              value={role}
              onChangeText={(text) => setrole(text)}
              placeholder="Role"
              keyboardType={""}
              // keyboardType={"email-address"}
            />
            {/* <AuthCustomFormInput
              value={gender}
              onChangeText={(text) => setGender(text)}
              placeholder="Gender"
              keyboardType={""}
              // keyboardType={"email-address"}
            /> */}

            <View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: "#2BB789",
                  fontSize: sizes.h3,
                }}
              >
                Gender
              </Text>
              <CustomDropDown
                value={gender}
                onChange={(text) => setGender(text)}
                data={data_gender}
              />
            </View>

            {/* <View style={styles.a1}>
            <Text style={styles.text3}>By signing in, you agree to our </Text>
            <Text style={[styles.text4, { color: colors.heading }]}>Terms & Conditions</Text>
            <Text style={styles.text3}>and </Text>
            <Text style={[styles.text4, { color: colors.heading }]}>Privacy Policy</Text>
          </View>
          <View style={styles.a2}>
          </View> */}
          </View>

          <View style={{ marginTop: button_height }}>
            <CustomButton
              textColor={colors.white}
              bgColor={colors.primary}
              btnLabel="Signup"
              Press={() => onClick()}
            />

            <View style={styles.a3}>
              <Text style={styles.text5}>Already have an account ? </Text>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("HomeScreen")}
              >
                <Text style={[styles.text6, { color: colors.heading }]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  text1: {
    fontSize: 64,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },

  text2: {
    color: colors.heading,
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  text3: {
    color: "grey",
    fontSize: 16,
    // alignItems: "center",
  },

  text4: {
    fontWeight: "bold",
    fontSize: 16,
  },

  a2: {
    display: "flex",
    flexDirection: "row",
    width: "78%",
    paddingRight: 16,
    marginBottom: 10,
  },

  a3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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

export default Signup;
