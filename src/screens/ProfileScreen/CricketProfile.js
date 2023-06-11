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
import withToast from "../../components/Toast";

const CARD_WIDTH = windowWidth * 0.05;
const DATA_WIDTH = windowWidth * 0.87;
const CARD_HEIGHT = windowHeight * 0.23;
const curve_height = windowHeight * 0.24;
const IMAGE_SIZE = windowHeight * 0.13;

const CricketProfile = (props) => {
  const [gamesTab, setGamesTab] = useState(1);

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

  // const init = async () => {
  //   // await fetchPlayerProfile();
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   init();
  // }, []);

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
                <Avatar.Image size={IMAGE_SIZE} source={images.logo} />
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
                option2="My Teams"
                option3="Gallery"
                onSelectSwitch={onSelectSwitch}
              />
            </View>

            {gamesTab == 1 && <PlayerStatsCard />}
            {gamesTab == 2 && <PlayerTeam />}
            {gamesTab == 3 && <PlayerGallery />}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(CricketProfile);

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
});
