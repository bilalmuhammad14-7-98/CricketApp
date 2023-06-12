import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
import { useRoute, useTheme } from "@react-navigation/native";
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
import { apiActiveURL } from "../../ApiBaseURL";
import axios from "axios";
import { useSelector } from "react-redux";
import withToast from "../../components/Toast";

const CARD_WIDTH = windowWidth * 0.27;
const DATA_WIDTH = windowWidth * 0.87;
const CARD_HEIGHT = windowHeight * 0.1;
const curve_height = windowHeight * 0.24;
const IMAGE_SIZE = windowHeight * 0.13;
const CARD_WIDTH1 = windowWidth * 0.03;
const CARD_HEIGHT1 = windowWidth * 0.05;

const MyPlayerDetail = (props) => {
  const [gamesTab, setGamesTab] = useState(1);
  const { params } = useRoute();
  const [playerDetail, setPlayerDetail] = useState({});
  const [loader, setLoader] = useState(true);

  const onSelectSwitch = (value) => {
    setGamesTab(value);
  };
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  const { profile } = useContext(profileContext);
  console.log(params.playerId, "params.playerId");

  const [model, setModel] = useState({
    Name: "",
    PlayingRole: "",
    BattingStyle: "",
    BowlingStyle: "",
  });
  useEffect(() => {
    getPlayerProfile();
  }, [params.playerId]);

  const getPlayerProfile = () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}get-player-detail?id=${params.playerId}`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "response response");
        setPlayerDetail(response.data);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error, "errorerror");
        setLoader(false);
      });
  };

  //   const init = async () => {
  //     // await fetchPlayerProfile();
  //     setIsLoading(false);
  //   };

  //   useEffect(() => {
  //     init();
  //   }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: sizes.bottomTabHeight1,
        marginBottom: sizes.bottomTabHeight,
      }}
    >
      {!loader ? (
        <View style={{ flex: 1 }}>
          <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
            <View style={{ height: curve_height }}>
              <View style={styles.profile}>
                <View style={styles.logo}>
                  <Avatar.Image
                    size={IMAGE_SIZE}
                    source={{ uri: playerDetail.player_profile_img }}
                  />
                </View>

                <View style={styles.profile_user}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.profile_text1}
                  >
                    {playerDetail.player_name
                      ? playerDetail.player_name
                      : "N/A"}
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
                      {playerDetail.total_matches
                        ? playerDetail.total_matches
                        : "N/A"}
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
                      {playerDetail.playing_role
                        ? playerDetail.playing_role
                        : "N/A"}
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
                      {playerDetail.player_ratings
                        ? playerDetail.player_ratings
                        : "N/A"}
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
                      {playerDetail.batting_style
                        ? playerDetail.batting_style
                        : "N/A"}
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
                      {playerDetail.bowling_style
                        ? playerDetail.bowling_style
                        : "N/A"}
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
                      {playerDetail.total_overs
                        ? playerDetail.total_overs
                        : "N/A"}
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
                      {playerDetail.total_wickets
                        ? playerDetail.total_wickets
                        : "N/A"}
                      {/* {name} */}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* {gamesTab == 1 && <PlayerStatsCard />} */}
            </View>
          </View>
        </View>
      ) : (
        <ActivityIndicator animating size={20} />
      )}
    </ScrollView>
  );
};

export default withToast(MyPlayerDetail);

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
