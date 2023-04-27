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
import { useState, useEffect } from "react";
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
import { windowHeight, windowWidth } from "../../config/dimensions";
import { Avatar } from "react-native-paper";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import PlayerCustomButtom from "../../components/formComponents/PlayerCustomButtom";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { http } from "../../components/http/http";

const LOGO_SIZE = windowHeight * 0.1;
const CARD_WIDTH = windowWidth * 0.95;
const CARD_HEIGHT = windowHeight * 0.12;
const curve_height = windowHeight * 0.2;
const INPUT_HEIGHT = windowHeight * 0.07;
const INPUT_WIDTH = windowWidth - 40;
const cross_icon = windowHeight * 0.01;
const Search_Bar = windowHeight * 0.06;
const INPUT_HEIGHT1 = windowHeight * 0.07;

const UmpireScreen = (navigation) => {
 
  const data = [
    { 
      id: 1,
      name: "Muhammad hashirhashirhashirhashirhashirhashirhashir",
      charges: 100,
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
      name: "Shan",
      // notification: "accept it"
    },

    {
      id: 5,
      name: "Uzair",
      // notification: "accept it"
    },]
  //   // { id: 3, name: "abd24", notification: "reject invitation" },
  //   // { id: 4, name: "humayun", notification: "accept tournament invitation" },
  //   // { id: 5, name: "hassan", notification: "Hi" },
  //   // { id: 6, name: "abd24", notification: "reject invitation" },
  //   // { id: 7, name: "humayun", notification: "accept tournament invitation" },
  //   // { id: 8, name: "abd24", notification: "reject invitation" },
  //   // { id: 9, name: "humayun", notification: "accept tournament invitation" },
  //   // { id: 10, name: "abd24", notification: "reject invitation" },
  //   // { id: 11, name: "humayun", notification: "accept tournament invitation" },
  // ];

  const renderList = (item , index) => {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.card} key={index}>
            <View style={styles.cardView}>
              <View style={styles.logo}>
                <Avatar.Image size={LOGO_SIZE} source={images.logo} />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                padding: sizes.m7,
              }}
            >
              <View
                style={{
                  // alignItems: "center",
                  // margin: sizes.m8,
                  marginLeft: sizes.m3,
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                  {(item.name)}
                </Text>

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                Fees:
                  {(item.charges)}
                </Text>
                {/* <Text style={styles.text}>{item.notification}</Text> */}
              </View>
              <View
                style={{
                  marginRight: sizes.m5,
                  marginBottom: sizes.m5,
                  justifyContent: "flex-end",
                }}
              >
                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="Send Request"
                  myStyle={{
                    alignSelf: "flex-end",
                  }}
                />
              </View>
            </View>
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
      <View style={styles.root}>
        <View>
          <StatusBar barStyle="dark-content" />
          <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
            <View style={{ height: curve_height }}>
              <View style={[styles.text_input]}>
                <Ionicons
                  name="search-outline"
                  size={INPUT_HEIGHT * 0.5}
                  color="#2BB789"
                  style={{
                    alignSelf: "center",
                  }}
                />

                <TextInput
                  placeholder="Search"
                  placeholderTextColor="#2BB789"
                  style={{
                    paddingLeft: sizes.m8,
                    fontWeight: "bold",
                    fontSize: sizes.m16,
                    width: INPUT_WIDTH * 0.75,
                  }}
                />

                <Entypo
                  name="cross"
                  size={INPUT_HEIGHT * 0.5}
                  color="#2BB789"
                  style={{
                    alignSelf: "center",
                    marginLeft: cross_icon,
                  }}
                />
              </View>
            </View>
          </LinearGradient>
          <View
            style={{
              marginTop: -35,
              backgroundColor: "white",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            <FlatList
              data={data}
              renderItem={({ item }) => {
                return renderList(item);
              }}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UmpireScreen;

const styles = StyleSheet.create({
  root: {
    // flex: 1,
  },

  logo: {
    alignItems: "center",
  },

  cardView: {
    flexDirection: "row",
    padding: 6,
    // justifyContent: "space-between"
  },

  text: {
    fontSize: 16,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginTop: sizes.m15,
    borderRadius: sizes.m15,
    borderColor: "#2bb789",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text_input: {
    marginTop: Search_Bar,
    flexDirection: "row",
    borderRadius: sizes.m8,
    padding: sizes.m10,
    borderColor: "#fff",
    backgroundColor: "#fff",
    width: INPUT_WIDTH,
    height: INPUT_HEIGHT1,
    alignSelf: "center",
  },
});
