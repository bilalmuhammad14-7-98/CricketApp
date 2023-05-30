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
