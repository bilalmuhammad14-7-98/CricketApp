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

//import
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import { useRoute, useTheme } from "@react-navigation/native";

const CARD_WIDTH1 = windowWidth * 0.03;
const CARD_HEIGHT1 = windowWidth * 0.1;
const CARD_WIDTH = windowWidth * 0.3;
const CARD_HEIGHT = windowHeight * 0.12;

const Card = ({ item }) => {
  const { colors } = useTheme();

  return (
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
            color: item.code,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          {item.name1}
        </Text>

        <Text
          style={{
            fontSize: sizes.h4,
            color: item.code,
            fontWeight: "bold",
            alignSelf: "center",
            paddingTop: sizes.m8,
          }}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const PlayerStatsCard = ({ profile, other }) => {
  const { colors } = useTheme();
  const cardItems = [
    {
      name1: profile?.total_matches ? profile?.total_matches : "N/A",
      name: "Matches",
      code: colors.black,
      //   image: images.cricketerAndfootballer,
    },
    {
      name1: profile?.bowling_style ? profile?.bowling_style : "N/A",
      name: "Bowling Style",
      code: colors.black,

      //   image: images.UmpireAndReferee,
    },
    {
      name1: profile?.total_runs ? profile?.total_runs : "N/A",
      name: "Runs",
      code: colors.black,
      //   image: images.UmpireAndReferee,
    },

    {
      name1: profile?.batting_style ? profile?.batting_style : "N/A",
      name: "Batting Style",
      code: colors.black,
      //   image: images.UmpireAndReferee,
    },

    {
      name1: profile?.total_runs ? profile?.total_runs : "N/A",
      name: "Runs",
      code: colors.black,
      //   image: images.UmpireAndReferee,
    },

    {
      name1: profile?.total_wickets ? profile?.total_wickets : "N/A",
      name: "Wickets",
      code: colors.black,
      //   image: images.UmpireAndReferee,
    },
  ];

  return (
    <View style={{}}>
      <View>
        <Text
          style={{
            marginLeft: CARD_WIDTH1,
            fontSize: sizes.h3,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          MY STATS
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {cardItems.map((item) => {
            return <Card item={item} />;
          })}
        </View>
      </View>
    </View>
  );
};

export default PlayerStatsCard;

const styles = StyleSheet.create({
  //card
  gridView: {
    marginTop: 300,
    flex: 1,
  },

  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 20,
    padding: 10,
    height: 170,
  },

  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },

  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },

  //curve
  curve: {
    backgroundColor: "lightyellow",
    flex: 1,
    borderTopLeftRadius: sizes.m50,
    borderTopRightRadius: sizes.m50,
    marginTop: 80,
    // justifyContent: "space-between",
    alignItems: "center",
  },
});
