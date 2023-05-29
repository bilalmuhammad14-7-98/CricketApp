// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
//   TextInput,
// } from "react-native";

// //icons import
// import {
//   Ionicons,
//   AntDesign,
//   Feather,
//   FontAwesome,
//   Entypo,
// } from "react-native-vector-icons";
// import { http } from "../../components/http/http";
// import { useState, useEffect, useContext } from "react";
// // imports
// import { Avatar } from "react-native-paper";
// import { windowHeight, windowWidth } from "../../config/dimensions";
// import images from "../../config/images";
// import { sizes } from "../../config/sizes";
// import { useTheme } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { ScrollView } from "react-native-gesture-handler";
// import { profileContext } from "../../components/context/context";
// import { colors } from "../../config/colors";
// import { useSelector } from "react-redux";
// import { apiActiveURL } from "../../ApiBaseURL";
// import axios from "axios";
// // import { searchPlayer } from "../../services/playerService";

// const CARD_WIDTH = windowWidth * 0.05;
// const CARD_HEIGHT = windowHeight * 0.23;
// const input_width = windowWidth * 0.35;
// const input_width1 = windowWidth * 0.4;
// const curve_height = windowHeight * 0.22;
// const IMAGE_SIZE = windowHeight * 0.13;
// const IMAGE_SIZE1 = windowHeight * 0.025;
// const IMAGE_SIZE2 = windowHeight * 0.04;
// const PADDING_IMAGE = windowWidth * 0.35;
// const IMAGE_SIZE3 = windowHeight * 0.04;
// const IMAGE_SIZE4 = windowHeight * 0.135;

// const PROFILECARD_WIDTH = windowWidth * 0.9;
// const PROFILECARD_HEIGHT = windowHeight * 0.6;

// const PlayerDetail = (props) => {
//   const theme = useTheme();
//   console.log(props.route.params.data, "rops.route.params");
//   // const { profile } = useContext(profileContext);
//   const [modal, setModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [userData, setUserData] = useState();
//   const {
//     player_name,
//     batting_style,
//     bowling_style,
//     player_profile_img,
//     playing_role,
//     player_ratings,
//     total_matches,
//     total_overs,
//     total_wickets,
//   } = props.route.params.data;
//   // console.log(profile.payLoad.name);

//   const userLoginSuccess = useSelector((state) => {
//     // console.log(state, "state");
//     // console.log(state.loginData.data, "login data success");
//     return state.loginData.data;
//   });

//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       style={{
//         height: sizes.bottomTabHeight1,
//         marginBottom: sizes.bottomTabHeight,
//       }}
//     >
//       <View style={{ flex: 1 }}>
//         {/* <StatusBar barStyle = "light-content" /> */}
//         <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
//           <View style={{ height: curve_height }}>
//             {/* <View style={styles.header}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <TouchableOpacity
//                   style={{
//                     width: 30,
//                     height: 30,
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: 20,
//                     backgroundColor: "rgba(255,255,255,0.6)",
//                   }}
//                 >
//                   <Ionicons
//                     name="ios-chevron-back"
//                     size={28}
//                     color="#2BB789"
//                     resizeMode="contain"
//                   />
//                 </TouchableOpacity>

//                 <Text
//                   style={{
//                     fontSize: 22,
//                     marginLeft: sizes.m5,
//                     color: "#2BB789",
//                   }}
//                 >
//                   Player Profile
//                 </Text>
//               </View>

//             </View> */}

//             <View style={styles.profile}>
//               <View style={styles.logo}>
//                 <Avatar.Image
//                   size={IMAGE_SIZE}
//                   onPress={() => props.navigation.navigate("Profile")}
//                   source={{
//                     uri: player_profile_img ? player_profile_img : null,
//                   }}
//                 />
//               </View>

//               <View style={styles.profile_user}>
//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={styles.profile_text1}
//                 >
//                   {/* {profile.payLoad.name} */}
//                 </Text>

//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     padding: 5,
//                     paddingLeft: 8,
//                   }}
//                 >
//                   {/* <TouchableOpacity
//                     onPress={() => {
//                       props.navigation.navigate("CricketProfile");
//                     }}
//                     style={{
//                       width: IMAGE_SIZE1,
//                       height: IMAGE_SIZE1,
//                       alignItems: "center",
//                       justifyContent: "center",
//                       borderRadius: 20,
//                       backgroundColor: "rgba(255,255,255,0.6)",
//                     }}
//                   >
//                     <Ionicons
//                       name="ios-chevron-forward"
//                       size={IMAGE_SIZE1}
//                       color="#2BB789"
//                       resizeMode="contain"
//                     />
//                   </TouchableOpacity>
//                   <Text style={{ fontSize: 13 }}> Player Profile</Text> */}
//                 </View>
//               </View>
//             </View>
//           </View>
//         </LinearGradient>

//         <View
//           style={{
//             marginTop: -25,
//             backgroundColor: "white",
//             borderTopLeftRadius: 30,
//             borderTopRightRadius: 30,
//           }}
//         >
//           <View style={styles.profile_heading}>
//             <Text style={styles.profile_heading1}> {player_name} Profile</Text>
//           </View>

//           {!isLoading ? (
//             <Text>Loading...</Text>
//           ) : (
//             <View
//               style={{
//                 width: PROFILECARD_WIDTH,
//                 height: PROFILECARD_HEIGHT,
//                 margin: sizes.m13,
//                 marginLeft: CARD_WIDTH,
//                 marginTop: 25,
//                 borderRadius: sizes.m15,
//                 borderColor: "#2bb789",
//                 backgroundColor: "#fff",
//                 borderWidth: 2,
//               }}
//             >
//               <View>
//                 <View style={styles.profile_stats}>
//                   <View style={{ flexDirection: "column" }}>
//                     <Text
//                       style={{
//                         fontSize: 15,
//                         fontWeight: "bold",
//                         color: colors.primary,
//                       }}
//                     >
//                       Name
//                     </Text>
//                     <Text
//                       numberOfLines={2}
//                       ellipsizeMode="tail"
//                       style={{ width: input_width, color: "#000" }}
//                     >
//                       {player_name}
//                       {/* {model.Name}  */}
//                     </Text>
//                   </View>
//                   <View style={{ flexDirection: "column" }}>
//                     {/* <Text style={styles.profile_text3}>Gender</Text>
//                     <Text> {userData?.gender}</Text> */}
//                   </View>
//                 </View>
//                 <View style={styles.profile_stats1}>
//                   <View style={{ flexDirection: "column" }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         fontSize: 15,
//                         fontWeight: "bold",
//                         color: colors.primary,
//                       }}
//                     >
//                       Playing Role
//                     </Text>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{ width: input_width }}
//                     >
//                       {playing_role}
//                     </Text>
//                   </View>
//                   <View style={{ flexDirection: "column" }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={styles.profile_text2}
//                     >
//                       Batting Style
//                     </Text>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{ width: input_width }}
//                     >
//                       {batting_style ? batting_style : "N/A"}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.profile_stats1}>
//                   <View style={{ flexDirection: "column" }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         fontSize: 15,
//                         fontWeight: "bold",
//                         color: colors.primary,
//                       }}
//                     >
//                       Bowling Style
//                     </Text>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{ width: input_width }}
//                     >
//                       {bowling_style ? bowling_style : "N/A"}
//                     </Text>
//                   </View>

//                   <View style={{ flexDirection: "column" }}>
//                     <Text
//                       style={{
//                         paddingRight: 50,
//                         fontSize: 15,
//                         fontWeight: "bold",
//                         color: colors.primary,
//                       }}
//                     >
//                       Player Rating
//                     </Text>
//                     <Text> {player_ratings ? player_ratings : "N/A"}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.profile_stats1}>
//                   <View style={{ flexDirection: "column" }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         fontSize: 15,
//                         fontWeight: "bold",
//                         color: colors.primary,
//                       }}
//                     >
//                       Total Matches
//                     </Text>
//                     <Text
//                       numberOfLines={2}
//                       ellipsizeMode="tail"
//                       style={{ width: input_width }}
//                     >
//                       {total_matches ? total_matches : "N/A"}
//                     </Text>
//                   </View>

//                   <View style={{ flexDirection: "column" }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         fontSize: 15,
//                         fontWeight: "bold",
//                         color: colors.primary,
//                       }}
//                     >
//                       Total Overs{" "}
//                     </Text>
//                     <Text
//                       numberOfLines={2}
//                       ellipsizeMode="tail"
//                       style={{ width: input_width }}
//                     >
//                       {total_overs ? total_overs : "N/A"}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.profile_stats1}>
//                   <View style={{ flexDirection: "column" }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         fontSize: 15,
//                         fontWeight: "bold",
//                         color: colors.primary,
//                       }}
//                     >
//                       Total Overs
//                     </Text>
//                     <Text
//                       numberOfLines={2}
//                       ellipsizeMode="tail"
//                       style={{ width: input_width }}
//                     >
//                       {total_overs ? total_overs : "N/A"}
//                     </Text>
//                   </View>

//                   <View style={{ flexDirection: "column" }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         fontSize: 15,
//                         fontWeight: "bold",
//                         color: colors.primary,
//                       }}
//                     >
//                       Total Wickets{" "}
//                     </Text>
//                     <Text
//                       numberOfLines={2}
//                       ellipsizeMode="tail"
//                       style={{ width: input_width }}
//                     >
//                       {total_wickets ? total_wickets : "N/A"}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default PlayerDetail;

// const styles = StyleSheet.create({
//   logo: {
//     marginLeft: CARD_WIDTH,
//     // marginTop: sizes.m35,
//     // flexDirection: "row",
//     // justifyContent: "space-between",
//     // position: 'absolute',
//   },

//   text: {
//     flex: 1,
//     marginTop: 20,
//   },
//   profile: {
//     paddingTop: sizes.m15,
//     flexDirection: "row",
//     // backgroundColor: "yellow",
//   },

//   profile_user: {
//     paddingTop: 15,
//   },

//   profile_text: {
//     fontSize: 15,
//     fontWeight: "bold",
//   },

//   profile_heading: {
//     paddingLeft: CARD_WIDTH,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },

//   profile_text1: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginLeft: sizes.m5,
//     width: input_width1,
//   },

//   profile_heading1: {
//     fontSize: 20,
//     fontWeight: "bold",
//     // marginLeft: sizes.m5,
//   },

//   edit_text: {
//     paddingRight: CARD_WIDTH,
//   },

//   profile_stats: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingLeft: IMAGE_SIZE1,
//     paddingTop: IMAGE_SIZE1,
//   },

//   profile_stats1: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingLeft: IMAGE_SIZE1,
//     paddingTop: IMAGE_SIZE3,
//   },

//   profile_text2: {
//     paddingRight: IMAGE_SIZE2,
//     fontSize: 15,
//     fontWeight: "bold",
//     color: colors.primary,
//   },

//   profile_text3: {
//     paddingRight: IMAGE_SIZE4,
//     fontSize: 15,
//     fontWeight: "bold",
//     color: colors.primary,
//   },

//   header: {
//     paddingVertical: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     // marginHorizontal: 20,
//     paddingHorizontal: 10,
//     justifyContent: "space-between",
//   },
// });

import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import { Avatar } from "react-native-paper";
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

//import
import CustomSwitch from "../../components/formComponents/CustomSwitch";
import PlayerTeam from "../../components/PlayerProfile/PlayerTeam";
import PlayerStatsCard from "../../components/PlayerProfile/PlayerStatsCard";
import PlayerGallery from "../../components/PlayerProfile/PlayerGallery";
import { profileContext } from "../../components/context/context";
import { searchPlayer } from "../../services/playerService";
import { colors } from "../../config/colors";

const CARD_WIDTH = windowWidth * 0.27;
const DATA_WIDTH = windowWidth * 0.87;
const CARD_HEIGHT = windowHeight * 0.1;
const curve_height = windowHeight * 0.24;
const IMAGE_SIZE = windowHeight * 0.13;
const CARD_WIDTH1 = windowWidth * 0.03;
const CARD_HEIGHT1 = windowWidth * 0.05;

const PlayerDetail = (props) => {
  const [gamesTab, setGamesTab] = useState(1);
  const {
    player_name,
    batting_style,
    bowling_style,
    player_profile_img,
    playing_role,
    player_ratings,
    total_matches,
    total_overs,
    total_wickets,
  } = props.route.params.data;
  const onSelectSwitch = (value) => {
    setGamesTab(value);
  };
  const { profile } = useContext(profileContext);
  // console.log(profile.payLoad.name);

  const [model, setModel] = useState({
    Name: "",
    PlayingRole: "",
    BattingStyle: "",
    BowlingStyle: "",
  });

  const fetchPlayerProfile = async () => {
    try {
      var res = await searchPlayer();
      var payLoad = res.payLoad;
      console.log(res);
      if (!res.isOk) {
        alert(payLoad.message);
        return;
      }

      setModel({
        ...model,
        Name: payLoad.User.name,
        PlayingRole: payLoad.PlayingRole,
        BowlingStyle: payLoad.BowlingStyle,
        BattingStyle: payLoad.BattingStyle,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const init = async () => {
    // await fetchPlayerProfile();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
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
        <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
          <View style={{ height: curve_height }}>
            <View style={styles.profile}>
              <View style={styles.logo}>
                <Avatar.Image
                  size={IMAGE_SIZE}
                  source={{ uri: player_profile_img }}
                />
              </View>

              <View style={styles.profile_user}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.profile_text1}
                >
                  {player_name}
                </Text>
              </View>
            </View>
            <View style={{ marginLeft: sizes.m16 }}>
              <Text style={styles.profile_text}>
                {/* {playing_role}, {batting_style}, {bowling_style} */}
              </Text>
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
          <View style={{ marginTop: 20 }}>
            {/* <View>
              <CustomSwitch
                selectionMode={1}
                option1="My Stats"
                option2="My Teams"
                option3="Gallery"
                onSelectSwitch={onSelectSwitch}
              />
            </View> */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  marginLeft: 10,
                  marginTop: sizes.m15,
                  borderRadius: sizes.m7,
                  borderColor: "#C6C6C6",
                  borderRightWidth: 1,
                  borderBottomWidth: 2,
                  backgroundColor: "#ECECEC",
                  shadowOffset: {
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  },
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    paddingTop: CARD_HEIGHT1, // width: CARD_WIDTH, // height: CARD_HEIGHT * 0.20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Matches
                    {/* {name1} */}
                  </Text>

                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                      paddingTop: sizes.m8,
                    }}
                  >
                    {total_matches}
                    {/* {name} */}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  marginLeft: 10,
                  marginTop: sizes.m15,
                  borderRadius: sizes.m7,
                  borderColor: "#C6C6C6",
                  borderRightWidth: 1,
                  borderBottomWidth: 2,
                  backgroundColor: "#ECECEC",
                  shadowOffset: {
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  },
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    paddingTop: CARD_HEIGHT1, // width: CARD_WIDTH, // height: CARD_HEIGHT * 0.20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                      color: colors.black,
                    }}
                  >
                    Playing Role
                    {/* {name1} */}
                  </Text>

                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                      paddingTop: sizes.m8,
                      color: colors.black,
                    }}
                  >
                    {playing_role}
                    {/* {name} */}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  marginLeft: 10,
                  marginTop: sizes.m15,
                  borderRadius: sizes.m7,
                  borderColor: "#C6C6C6",
                  borderRightWidth: 1,
                  borderBottomWidth: 2,
                  backgroundColor: "#ECECEC",
                  shadowOffset: {
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  },
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    paddingTop: CARD_HEIGHT1, // width: CARD_WIDTH, // height: CARD_HEIGHT * 0.20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Player Ratings
                    {/* {name1} */}
                  </Text>

                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                      paddingTop: sizes.m8,
                    }}
                  >
                    {player_ratings}
                    {/* {name} */}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  marginLeft: 10,
                  marginTop: sizes.m15,
                  borderRadius: sizes.m7,
                  borderColor: "#C6C6C6",
                  borderRightWidth: 1,
                  borderBottomWidth: 2,
                  backgroundColor: "#ECECEC",
                  shadowOffset: {
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  },
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    paddingTop: CARD_HEIGHT1, // width: CARD_WIDTH, // height: CARD_HEIGHT * 0.20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Batting Style
                    {/* {name1} */}
                  </Text>

                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                      paddingTop: sizes.m8,
                    }}
                  >
                    {batting_style}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  marginLeft: 10,
                  marginTop: sizes.m15,
                  borderRadius: sizes.m7,
                  borderColor: "#C6C6C6",
                  borderRightWidth: 1,
                  borderBottomWidth: 2,
                  backgroundColor: "#ECECEC",
                  shadowOffset: {
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  },
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    paddingTop: CARD_HEIGHT1, // width: CARD_WIDTH, // height: CARD_HEIGHT * 0.20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Bowling Style
                    {/* {name1} */}
                  </Text>

                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                      paddingTop: sizes.m8,
                    }}
                  >
                    {bowling_style}
                    {/* {name} */}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  marginLeft: 10,
                  marginTop: sizes.m15,
                  borderRadius: sizes.m7,
                  borderColor: "#C6C6C6",
                  borderRightWidth: 1,
                  borderBottomWidth: 2,
                  backgroundColor: "#ECECEC",
                  shadowOffset: {
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  },
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    paddingTop: CARD_HEIGHT1, // width: CARD_WIDTH, // height: CARD_HEIGHT * 0.20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Total Overs {/* {name1} */}
                  </Text>

                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                      paddingTop: sizes.m8,
                    }}
                  >
                    {total_overs}
                    {/* {name} */}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  marginLeft: 10,
                  marginTop: sizes.m15,
                  borderRadius: sizes.m7,
                  borderColor: "#C6C6C6",
                  borderRightWidth: 1,
                  borderBottomWidth: 2,
                  backgroundColor: "#ECECEC",
                  shadowOffset: {
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  },
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    paddingTop: CARD_HEIGHT1, // width: CARD_WIDTH, // height: CARD_HEIGHT * 0.20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Total Wickets {/* {name1} */}
                  </Text>

                  <Text
                    style={{
                      fontSize: sizes.h4,
                      // color: item.code,
                      fontWeight: "bold",
                      alignSelf: "center",
                      paddingTop: sizes.m8,
                    }}
                  >
                    {total_wickets}
                    {/* {name} */}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* {gamesTab == 1 && <PlayerStatsCard />} */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlayerDetail;

const styles = StyleSheet.create({
  logo: {
    marginLeft: CARD_WIDTH,
    // marginTop: sizes.m35,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // paddingRight: sizes.m10,
    // position: 'absolute',
  },

  profile: {
    paddingTop: sizes.m15,
    flexDirection: "row",
    // backgroundColor: "yellow",
  },

  profile_user: {
    // paddingLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: sizes.m15,
  },

  profile_text: {
    fontSize: sizes.m12,
    width: DATA_WIDTH,
    // marginLeft: sizes.m8,
  },

  profile_text1: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: sizes.m8,
  },

  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 20,
    paddingHorizontal: sizes.m10,
    justifyContent: "space-between",
  },
});
