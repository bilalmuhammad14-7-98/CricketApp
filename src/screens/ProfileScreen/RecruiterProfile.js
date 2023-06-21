import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
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
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

//import
import CustomSwitch from "../../components/formComponents/CustomSwitch";
import PlayerTeam from "../../components/PlayerProfile/PlayerTeam";
import PlayerStatsCard from "../../components/PlayerProfile/PlayerStatsCard";
import PlayerGallery from "../../components/PlayerProfile/PlayerGallery";
import { profileContext } from "../../components/context/context";
import { searchPlayer } from "../../services/playerService";
import withToast from "../../components/Toast";
import UmpireStateCard from "../../components/PlayerProfile/UmpireStats";
import UmpireGallery from "../../components/PlayerProfile/UmpireGallery";
import PlayerCustomButtom from "../../components/formComponents/PlayerCustomButtom";

const CARD_WIDTH = windowWidth * 0.05;
const DATA_WIDTH = windowWidth * 0.87;
const CARD_HEIGHT = windowHeight * 0.23;
const curve_height = windowHeight * 0.24;
const IMAGE_SIZE = windowHeight * 0.13;

const RecruiterProfile = (props) => {
  const navigation = useNavigation();
  const [gamesTab, setGamesTab] = useState(1);
  const { params } = useRoute();

  const onSelectSwitch = (value) => {
    setGamesTab(value);
  };

  const renderList = () => {
    return (
      <View style={styles.cardsWrapper}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{
                uri: params?.profile ? params?.profile?.team[0]?.team_logo : "",
              }}
              resizeMode="contain"
              style={styles.cardImg}
            />
          </View>

          <View style={styles.cardInfo}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {params?.profile?.team[0].team_name}
            </Text>
            <PlayerCustomButtom
              textColor="white"
              btnLabel="View Players"
              onPress={() => {
                navigation.navigate("TeamList", {
                  data: params?.profile?.team[0].player_id,
                });
              }}
              myStyle={{
                alignSelf: "flex-end",

                // marginRight: 20,
                // paddingVertical: 10,
              }}
            />
          </View>
        </View>
      </View>
    );
  };
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
              <View
                style={[
                  styles.logo,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <Avatar.Image
                  size={IMAGE_SIZE}
                  source={{ uri: params?.profile?.profileImg }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.profile_text1}>
                    {params?.profile?.fullName}
                  </Text>
                  <Text style={styles.profile_text1}>
                    {params?.profile?.email}
                  </Text>
                </View>
              </View>

              <View style={styles.profile_user}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.profile_text1}
                >
                  {/* {model.Name} */}
                </Text>
              </View>
            </View>
            <View style={{ marginLeft: sizes.m16 }}>
              <Text style={styles.profile_text}>
                {/* {model.PlayingRole}, {model.BattingStyle}, {model.BowlingStyle} */}
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
            <View>
              <CustomSwitch
                selectionMode={1}
                option1="My Stats"
                option2="Gallery"
                option3="My Team"
                onSelectSwitch={onSelectSwitch}
              />
            </View>
            {gamesTab == 1 && <UmpireStateCard profile={params?.profile} />}
            {gamesTab == 2 && <UmpireGallery />}
            {gamesTab == 3 ? (
              params?.profile?.team?.length != 0 ? (
                renderList()
              ) : (
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: 20,
                  }}
                >
                  No Team Found
                </Text>
              )
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(RecruiterProfile);

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

  cardsWrapper: {
    // marginTop: 10,
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
  },

  card: {
    height: 100,
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
    // backgroundColor: "red",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "green",
  },

  cardImg: {
    height: "50%",
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
