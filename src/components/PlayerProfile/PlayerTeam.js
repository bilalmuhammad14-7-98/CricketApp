import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList
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
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";



import colors from "../../config/colors";
import PlayerCustomButtom from "../formComponents/PlayerCustomButtom";

const CARD_WIDTH = windowWidth * 0.93;
const CARD_HEIGHT = windowHeight * 0.11;
const INPUT_WIDTH = windowWidth - 25;

const PlayerTeam = () => {
  const theme = useTheme();


  const data1 = [
    {
      id: 1,
      name: "Falcon FC1",
      // notification: "accept it"
    },

    {
      id: 2,
      name: "User564",
      // notification: "follow you"
    },

    {
      id: 3,
      name: "Shaheer",
      // notification: "accept it"
    },

    {
      id: 4,
      name: "Ali",
      // notification: "accept it"
    },

    {
      id: 5,
      name: "Shan",
      // notification: "accept it"
    },
  ];

  const renderList = (item) => {
    return (
      <View style={styles.cardsWrapper} key={item.id}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={images.logo}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>

          <View style={styles.cardInfo}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <PlayerCustomButtom
              textColor="white"
              btnLabel="Request to Join"
              myStyle={{
                alignSelf: "flex-end",
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
      <View>
        <StatusBar barStyle = "light-content" />
        <View>
            <FlatList
              data={data1}
              renderItem={({ item }) => {
                return renderList(item);
              }}
              keyExtractor={(item) => `${item.id}`}
            />
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
