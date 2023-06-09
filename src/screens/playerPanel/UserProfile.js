import { StatusBar } from "expo-status-bar";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
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

//icons import
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
} from "react-native-vector-icons";

// imports
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton1 from "../../components/formComponents/CustomButton1";
import { profileContext } from "../../components/context/context";
import Toast from "react-native-root-toast";
import { apiActiveURL } from "../../ApiBaseURL";
import axios from "axios";

//import
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/UserLogin";
import { UnSetUser } from "../../store/actions/authAction";
import { useIsFocused } from "@react-navigation/native";
import withToast from "../../components/Toast";
import { showSnackBar } from "../../store/actions";

const curve_height = windowHeight * 0.15;
const LOGO_SIZE = windowHeight * 0.15;
const IMAGE_SIZE1 = windowHeight * 0.04;
const CARD_WIDTH = windowWidth * 0.95;
const CARD_HEIGHT = windowHeight * 0.07;
const button_margin = windowWidth * 0.26;
const input_width1 = windowWidth * 0.33;

const UserProfile = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [userData, setUserData] = useState();

  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });

  const getUserData = async () => {
    // console.log(userLoginSuccess.token, "teams");
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}user/profile`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.data, "get user data response");
        setUserData(response.data.data);
      })
      .catch(function (error) {
        // console.log(error, "error");
      });
  };

  useEffect(() => {
    if (isFocused) {
      getUserData();
      // This code will run when the screen gains focus
      // alert("screen gained focus");
      // listTeams();
    } else {
      // This code will run when the screen loses focus
      // alert("screen lost focus");
    }
  }, [isFocused]);

  useEffect(() => {
    getUserData();
    // init();
  }, []);
  // const { profile } = useContext(profileContext);
  // console.log(profile.payLoad.email);

  //   const [text, onChangeText] = React.useState("Useless Text");
  //   const [number, onChangeNumber] = React.useState(null);
  const handleLogout = async () => {
    // await AsyncStorage.removeItem("Profile");
    dispatch(logoutUser());
    dispatch(
      showSnackBar({
        visible: true,
        text: "user logout successfully",
        error: false,
      })
    );
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
        <View style={{ height: curve_height }}></View>
      </LinearGradient>

      <View
        style={{
          marginTop: sizes.m35 * -1,
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: 1,
        }}
      >
        <View style={styles.profile}>
          <Avatar.Image
            size={LOGO_SIZE}
            source={userData?.profileImg ? { uri: userData?.profileImg } : null}
            style={{
              marginTop: LOGO_SIZE * 0.5 * -1,
              // borderColor: colors.primary,
              // borderWidth: 5
            }}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              alignSelf: "center",
              fontSize: sizes.h4,
              fontWeight: "bold",
              margin: sizes.m8,
              color: "#2BB789",
              width: input_width1,
            }}
          >
            {/* {profile.payLoad.email} */}
            {/* abc@gmail.com */}
          </Text>
          <View style={{ marginTop: sizes.m3 }}>
            <CustomButton1
              textColor="white"
              btnLabel="View Profile"
              Press={() => navigation.navigate("Profile")}
              myStyle={{
                alignSelf: "flex-end",
              }}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => handleLogout()}>
          <View style={styles.card}>
            <View style={{ flexDirection: "row", margin: sizes.m10 }}>
              <View>
                <AntDesign
                  name="logout"
                  size={IMAGE_SIZE1}
                  color="#2BB789"
                  resizeMode="contain"
                />
              </View>
              <View style={{ alignSelf: "center", marginLeft: button_margin }}>
                <Text
                  style={{
                    fontSize: sizes.h1,
                    fontWeight: "bold",
                    color: "#2BB789",
                  }}
                >
                  {" "}
                  Logout
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withToast(UserProfile);

const styles = StyleSheet.create({
  logo: {
    // marginLeft: CARD_WIDTH,
    // marginTop: sizes.m5,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // paddingRight: sizes.m10,
    // position: 'absolute',
  },

  profile: {
    // flexDirection: "row",
    // backgroundColor: "yellow",
    // alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 3,
    // flex: 1,
  },

  image_text: {
    alignSelf: "center",
    paddingTop: sizes.m8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#2BB789",
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginTop: sizes.m35,
    borderRadius: sizes.m15,
    borderColor: "#2bb789",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    alignSelf: "center",
  },
});
