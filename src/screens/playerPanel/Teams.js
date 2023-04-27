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

import { useState, useRef } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import PlayerCustomButtom from "../../components/formComponents/PlayerCustomButtom";
import colors from "../../config/colors";
import SearchBar from "../../components/formComponents/SearchBar";

const curve_height = windowHeight * 0.2;
const CARD_WIDTH = windowWidth * 0.93;
const CARD_HEIGHT = windowHeight * 0.12;
const INPUT_WIDTH = windowWidth - 40;
const INPUT_HEIGHT = windowHeight * 0.07;
const INPUT_HEIGHT1 = windowHeight * 0.07;
const Search_Bar = windowHeight * 0.06;
const cross_icon = windowHeight * 0.01;

const TeamsScreen = ({ navigation }) => {
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  // const [filter, setFilter] = useState("");

  const [clicked, setClicked] = useState(false);

  const onSearch = (text) => {
    if (text == "") {
      setData(data);
    } else {
      let templist = data.filter((item) => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(templist);
    }
  };

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
      <View style={styles.root}>
        <View>
          <StatusBar barStyle="dark-content" />
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
                  Teams
                </Text>
              </View>

              
            </View> */}
              {/* <View>
              <SearchBar
                searchPhrase = {searchPhrase}
                setSearchPhrase = {setSearchPhrase}
                clicked = {clicked}
                setClicked = {setClicked}
              />
            </View> */}

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
                  style={styles.input}
                  ref={searchRef}
                  placeholder="Search"
                  placeholderTextColor="#2BB789"
                  value={search}
                  onChangeText={(txt) => {
                    onSearch(txt);
                    setSearch(txt);
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
              data={data1}
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

export default TeamsScreen;

const styles = StyleSheet.create({
  // root: {
  //   flex: 1,
  // },

  container: {
    flex: 1,
  },

  // header: {
  //   paddingVertical: 20,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   // marginHorizontal: 20,
  //   paddingHorizontal: 10,
  //   justifyContent: "space-between",
  // },

  logo: {
    marginLeft: sizes.m10,
    // marginTop: sizes.m35,
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

  input:{
    paddingLeft: sizes.m8,
    fontWeight: "bold",
    fontSize: sizes.m16,
    width: INPUT_WIDTH * 0.75,
  }
});
