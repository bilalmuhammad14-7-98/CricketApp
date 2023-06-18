import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

//import icons
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "react-native-vector-icons";

//import
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import colors from "../../config/colors";
import PlayerCustomButtom from "../formComponents/PlayerCustomButtom";
import { useSelector } from "react-redux";

const CARD_WIDTH = windowWidth * 0.93;
const CARD_HEIGHT = windowHeight * 0.11;
const INPUT_WIDTH = windowWidth - 25;

const PlayerTeam = ({ profile, other }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  console.log(profile?.player_team == "", "profile TEST");
  console.log(other, "profile TEST");
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: sizes.bottomTabHeight1,
        marginBottom: sizes.bottomTabHeight,
      }}
    >
      <View>
        <StatusBar barStyle="light-content" />
        <View>
          {other ? (
            profile?.player_team == "" ? (
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 20,
                }}
              >
                Not Part Of Any Team
              </Text>
            ) : (
              <View style={styles.cardsWrapper}>
                <View style={styles.card}>
                  <View
                    style={[
                      styles.cardInfo,
                      {
                        justifyContent: "space-around",
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View
                      style={{
                        justifyContent: "space-around",
                        flex: 1,
                      }}
                    >
                      <Text
                        style={styles.cardTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        Team Name:
                      </Text>
                      <Text
                        style={styles.cardTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {other
                          ? profile?.player_team
                          : userLoginSuccess?.data?.player_team_name}
                      </Text>
                    </View>
                    <PlayerCustomButtom
                      textColor="white"
                      btnLabel="View Players"
                      onPress={() => {
                        navigation.navigate("TeamList", {
                          data: other
                            ? profile?.player_team_id
                            : userLoginSuccess?.data?.player_team_id,
                        });
                      }}
                      myStyle={{
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
              </View>
            )
          ) : (
            <>
              {userLoginSuccess?.data?.player_team_name == "" ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: 20,
                  }}
                >
                  Not Part Of Any Team
                </Text>
              ) : (
                <View style={styles.cardsWrapper}>
                  <View style={styles.card}>
                    <View
                      style={[
                        styles.cardInfo,
                        {
                          justifyContent: "space-around",
                          flexDirection: "row",
                        },
                      ]}
                    >
                      <View
                        style={{
                          justifyContent: "space-around",
                          flex: 1,
                        }}
                      >
                        <Text
                          style={styles.cardTitle}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Team Name:
                        </Text>
                        <Text
                          style={styles.cardTitle}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {other
                            ? profile?.player_team
                            : userLoginSuccess?.data?.player_team_name}
                        </Text>
                      </View>
                      <PlayerCustomButtom
                        textColor="white"
                        btnLabel="View Players"
                        onPress={() => {
                          navigation.navigate("TeamList", {
                            data: other
                              ? profile?.player_team_id
                              : userLoginSuccess?.data?.player_team_id,
                          });
                        }}
                        myStyle={{
                          alignSelf: "center",
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PlayerTeam;

const styles = StyleSheet.create({
  // root: {
  //   flex: 1,
  // },

  logo: {
    // marginLeft: sizes.m10,
    // marginTop: sizes.m35,
    flexDirection: "row",
    justifyContent: "flex-end",
    // paddingRight: sizes.m10,
    // position: 'absolute',
  },

  cardsWrapper: {
    // marginTop: 10,
    width: CARD_WIDTH,
    alignSelf: "center",
    marginTop: 5,
  },

  card: {
    height: CARD_HEIGHT,
    marginTop: 8,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: CARD_WIDTH, height: CARD_HEIGHT },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },

  cardImgWrapper: {
    flex: 1,
    flexDirection: "row",
  },

  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },

  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#2BB789",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    // flexDirection: "row",
  },

  cardTitle: {
    fontWeight: "bold",
  },

  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
