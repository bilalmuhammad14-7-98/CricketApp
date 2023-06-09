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
} from "react-native";

//icons import
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
} from "react-native-vector-icons";
import { http } from "../../components/http/http";
import { useState, useEffect, useContext } from "react";
// imports
import { Avatar } from "react-native-paper";
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { profileContext } from "../../components/context/context";
import { colors } from "../../config/colors";
import { useSelector } from "react-redux";
import { apiActiveURL } from "../../ApiBaseURL";
import axios from "axios";
import withToast from "../../components/Toast";
// import { searchPlayer } from "../../services/playerService";

const CARD_WIDTH = windowWidth * 0.05;
const CARD_HEIGHT = windowHeight * 0.23;
const input_width = windowWidth * 0.35;
const input_width1 = windowWidth * 0.4;
const curve_height = windowHeight * 0.22;
const IMAGE_SIZE = windowHeight * 0.13;
const IMAGE_SIZE1 = windowHeight * 0.025;
const IMAGE_SIZE2 = windowHeight * 0.09;
const PADDING_IMAGE = windowWidth * 0.35;
const IMAGE_SIZE3 = windowHeight * 0.09;
const IMAGE_SIZE4 = windowHeight * 0.135;

const PROFILECARD_WIDTH = windowWidth * 0.9;
const PROFILECARD_HEIGHT = windowHeight * 0.6;

const Profile = (props) => {
  const navigation = useNavigation();
  const theme = useTheme();
  // const { profile } = useContext(profileContext);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();

  // console.log(profile.payLoad.name);

  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });

  const [model, setModel] = useState({
    Name: "",
    Gender: "",
    Age: "",
    Email: "",
    PlayingRole: "",
    BattingStyle: "",
    BowlingStyle: "",
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
    getUserData();
    // init();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: sizes.bottomTabHeight1,
        marginBottom: sizes.bottomTabHeight,
      }}
    >
      <View style={{ flex: 1 }}>
        {/* <StatusBar barStyle = "light-content" /> */}
        <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
          <View style={{ height: curve_height }}>
            {/* <View style={styles.header}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    backgroundColor: "rgba(255,255,255,0.6)",
                  }}
                >
                  <Ionicons
                    name="ios-chevron-back"
                    size={28}
                    color="#2BB789"
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 22,
                    marginLeft: sizes.m5,
                    color: "#2BB789",
                  }}
                >
                  Player Profile
                </Text>
              </View>

              
            </View> */}

            <View style={styles.profile}>
              <View style={styles.logo}>
                <Avatar.Image
                  size={IMAGE_SIZE}
                  onPress={() => navigation.navigate("Profile")}
                  source={{ uri: userData ? userData?.profileImg : null }}
                />
              </View>

              <View style={styles.profile_user}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.profile_text1}
                >
                  {/* {profile.payLoad.name} */}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 5,
                    paddingLeft: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (userLoginSuccess?.data?.roleId == "umpire") {
                        return navigation.navigate("umpireprofile", {
                          profile: userData,
                        });
                      }
                      if (userLoginSuccess?.data?.roleId == "recruiter") {
                        return navigation.navigate("recruiterprofile", {
                          profile: userData,
                        });
                      }
                      var updatedProfile = {
                        ...userData,
                        ...userData?.player[0],
                      };
                      navigation.navigate("CricketProfile", {
                        profile: {
                          ...updatedProfile,
                          batting_style: updatedProfile?.bowling_style_id,
                          bowling_style: updatedProfile?.bowling_style_id,
                        },
                        other: false,
                      });
                    }}
                    style={{
                      width: IMAGE_SIZE1,
                      height: IMAGE_SIZE1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 20,
                      backgroundColor: "rgba(255,255,255,0.6)",
                    }}
                  >
                    <Ionicons
                      name="ios-chevron-forward"
                      size={IMAGE_SIZE1}
                      color="#2BB789"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 13 }}>
                    {userLoginSuccess?.data?.roleId == "umpire" ||
                    userLoginSuccess?.data?.roleId == "recruiter"
                      ? `My Profile`
                      : `My Cricket Profile`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View
          style={{
            marginTop: -25,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View style={styles.profile_heading}>
            <Text style={styles.profile_heading1}> My Profile</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditProfile", { item: userData })
                }
                style={{
                  marginRight: CARD_WIDTH,
                }}
              >
                <Feather
                  name="edit-3"
                  size={IMAGE_SIZE1}
                  color="#2BB789"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {!isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <View
              style={{
                width: PROFILECARD_WIDTH,
                height: PROFILECARD_HEIGHT,
                margin: sizes.m13,
                marginLeft: CARD_WIDTH,
                marginTop: 25,
                borderRadius: sizes.m15,
                borderColor: "#2bb789",
                backgroundColor: "#fff",
                borderWidth: 2,
              }}
            >
              <View>
                <View style={styles.profile_stats}>
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: colors.primary,
                      }}
                    >
                      Name
                    </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{ width: input_width, color: "#000" }}
                    >
                      {userData?.fullName}
                      {/* {model.Name}  */}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.profile_text3}>Gender</Text>
                    <Text> {userData?.gender}</Text>
                  </View>
                </View>
                {userLoginSuccess?.data?.roleId == "recruiter" ||
                userLoginSuccess?.data?.roleId == "umpire" ? null : (
                  <View style={styles.profile_stats1}>
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          color: colors.primary,
                        }}
                      >
                        Playing Role
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ width: input_width }}
                      >
                        {userData?.player[0]?.playing_role_id}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.profile_text2}
                      >
                        Batting Style
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ width: input_width }}
                      >
                        {userData?.player[0]?.batting_style_id}
                      </Text>
                    </View>
                  </View>
                )}

                {userLoginSuccess?.data?.roleId == "umpire" && (
                  <View style={styles.profile_stats1}>
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          color: colors.primary,
                        }}
                      >
                        Fees
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ width: input_width }}
                      >
                        {userData?.fees}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          paddingRight: PADDING_IMAGE,
                          fontSize: 15,
                          fontWeight: "bold",
                          color: colors.primary,
                        }}
                      >
                        Age
                      </Text>
                      <Text> {userData?.dob}</Text>
                    </View>
                  </View>
                )}

                <View style={styles.profile_stats1}>
                  {userLoginSuccess?.data?.roleId == "recruiter" ||
                  userLoginSuccess?.data?.roleId == "umpire" ? null : (
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          color: colors.primary,
                        }}
                      >
                        Bowling Style
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ width: input_width }}
                      >
                        {userData?.player[0]?.bowling_style_id}
                      </Text>
                    </View>
                  )}

                  {userLoginSuccess?.data?.roleId == "umpire" ? (
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          paddingRight: PADDING_IMAGE,
                          fontSize: 15,
                          fontWeight: "bold",
                          color: colors.primary,
                        }}
                      >
                        Availible Days
                      </Text>
                      <Text> {userData?.available_days}</Text>
                    </View>
                  ) : (
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          paddingRight: PADDING_IMAGE,
                          fontSize: 15,
                          fontWeight: "bold",
                          color: colors.primary,
                        }}
                      >
                        Age
                      </Text>
                      <Text> {userData?.dob}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.profile_stats1}>
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: colors.primary,
                      }}
                    >
                      Email
                    </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{ width: input_width }}
                    >
                      {userData?.email}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(Profile);

const styles = StyleSheet.create({
  logo: {
    marginLeft: CARD_WIDTH,
    // marginTop: sizes.m35,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // position: 'absolute',
  },

  text: {
    flex: 1,
    marginTop: 20,
  },
  profile: {
    paddingTop: sizes.m15,
    flexDirection: "row",
    // backgroundColor: "yellow",
  },

  profile_user: {
    paddingTop: 15,
  },

  profile_text: {
    fontSize: 15,
    fontWeight: "bold",
  },

  profile_heading: {
    paddingLeft: CARD_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  profile_text1: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: sizes.m5,
    width: input_width1,
  },

  profile_heading1: {
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft: sizes.m5,
  },

  edit_text: {
    paddingRight: CARD_WIDTH,
  },

  profile_stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: IMAGE_SIZE1,
    paddingTop: IMAGE_SIZE1,
  },

  profile_stats1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: IMAGE_SIZE1,
    paddingTop: IMAGE_SIZE3,
  },

  profile_text2: {
    paddingRight: IMAGE_SIZE2,
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },

  profile_text3: {
    paddingRight: IMAGE_SIZE4,
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },

  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});
