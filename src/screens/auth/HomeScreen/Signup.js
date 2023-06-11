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
import { useNavigation, useTheme } from "@react-navigation/native";
// import { signUpRequest } from "../../services/authService";
import Toast from "react-native-root-toast";
import { set } from "react-native-reanimated";
import axios from "axios";
import { http } from "../../../components/http/http.js";
import { colors } from "../../../config/colors";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
// import { apiActiveURL } from "../../ApiBaseURL";
import { apiActiveURL } from "../../../ApiBaseURL";
import { showToast, validateEmail } from "../../../util";
import withToast from "../../../components/Toast";
import { showSnackBar } from "../../../store/actions";
import { useDispatch } from "react-redux";

const curve_height = windowHeight * 0.25;
const input_width = windowHeight * 0.48;
const button_height = windowHeight * 0.1;

const Signup = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedRole, setSelectedRole] = useState("");
  const [role, setrole] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState();
  const [country, setCountry] = useState([]);

  const [selectedCity, setSelectedCity] = useState();
  const [cities, setCities] = useState([]);
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

  useEffect(() => {
    listCountries();
    listRoles();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      listCities(selectedCountry);
    } else return;
  }, [selectedCountry]);

  const listCountries = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}get-country`,
    };

    await axios(config)
      .then(function (response) {
        setCountry(response.data.countries);
      })
      .catch(function (error) {});
  };

  const listCities = async (value) => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}get-city?countryId=${value.value}`,
    };

    axios(config)
      .then(function (response) {
        setCities(response.data.cities);
      })
      .catch(function (error) {});
  };

  const listRoles = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}get-role`,
    };

    await axios(config)
      .then(function (response) {
        setrole(response.data.roles);
      })
      .catch(function (error) {});
  };

  const onClick = async (event) => {
    if (!name.trim()) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Please enter your name",
          error: true,
        })
      );
      return;
    }
    if (name.trim() <= 3) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "name must be greater than 3 characters",
          error: true,
        })
      );
      return;
    }
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
    if (!phone) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Please enter a phone number",
          error: true,
        })
      );
      return;
    }

    if (phone.length != 11) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Invalid phone number",
          error: true,
        })
      );
      return;
    }

    if (phone.length != 11) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Invalid phone number",
          error: true,
        })
      );
      return;
    }

    if (phone.length != 11) {
      dispatch(
        showSnackBar({
          visible: true,
          text: "Invalid phone number",
          error: true,
        })
      );
      return;
    }

    if (!selectedCountry) {
      dispatch(
        showSnackBar({ visible: true, text: "select a country", error: true })
      );
      return;
    }

    if (!selectedCity) {
      dispatch(
        showSnackBar({ visible: true, text: "select a city", error: true })
      );
      return;
    }

    if (!selectedRole) {
      dispatch(
        showSnackBar({ visible: true, text: "select a role", error: true })
      );
      return;
    }

    const Signupdata = {
      name: name,
      password: password,
      email: email,
      phone: phone,
      country: selectedCountry,
      city: selectedCity,
      role: selectedRole,
    };

    var data = new FormData();
    data.append("countryId", selectedCountry.value);
    data.append("cityId", selectedCity.value);
    data.append("roleId", selectedRole.value);
    data.append("firstName", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("password", password);

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}user/signUp`,

      data: data,
    };

    await axios(config)
      .then(function (response) {
        if (response.data.success == false)
          return showToast(response.data.message, "error");
        showToast("sign up successfully", "success");
        navigation.navigate("LoginScreen");
      })
      .catch(function (error) {
        showToast("Something went wrong", "error");
      });
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
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Phone"
              keyboardType="numeric"
              // keyboardType={"email-address"}
            />
            {/* <AuthCustomFormInput
              value={role}
              onChangeText={(text) => setrole(text)}
              placeholder="Role"
              keyboardType={""}
              // keyboardType={"email-address"}
            /> */}
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
                Country
              </Text>
              <CustomDropDown
                value={selectedCountry}
                onChange={(text) => setSelectedCountry(text)}
                data={country}
              />
            </View>

            <View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: "#2BB789",
                  fontSize: sizes.h3,
                }}
              >
                City
              </Text>
              <CustomDropDown
                disable={selectedCountry ? false : true}
                value={selectedCity}
                onChange={(text) => setSelectedCity(text)}
                data={cities}
              />
            </View>

            <View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: "#2BB789",
                  fontSize: sizes.h3,
                }}
              >
                Role
              </Text>
              <CustomDropDown
                value={selectedRole}
                onChange={(text) => setSelectedRole(text)}
                data={role}
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

export default withToast(Signup);
