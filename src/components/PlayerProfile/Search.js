import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "react-native-vector-icons";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../ApiBaseURL";
import { sizes } from "../../config/sizes";
const LOGO_SIZE = SCREEN_HEIGHT * 0.1;
const CARD_WIDTH = SCREEN_WIDTH * 0.95;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.12;
const curve_height = SCREEN_HEIGHT * 0.2;
const INPUT_HEIGHT = SCREEN_HEIGHT * 0.07;
const INPUT_WIDTH = SCREEN_WIDTH - 40;
const cross_icon = SCREEN_HEIGHT * 0.01;
const Search_Bar = SCREEN_HEIGHT * 0.06;
const INPUT_HEIGHT1 = SCREEN_HEIGHT * 0.07;

const Search = ({ searchArray, searchField, results }) => {
  const [search, setSearch] = useState("");

  const searchFilterFunction = (text) => {
    if (text) {
      var newData = "";
      newData = getSearchResult({ searchArray, searchField, text });
      results(newData);
      setSearch(text);
    } else {
      results(searchArray);
      setSearch(text);
    }
  };
  const getSearchResult = ({ searchArray, searchField, text }) => {
    return searchArray.filter(function (item) {
      const itemData = item[searchField]
        ? item[searchField].toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
  };
  return (
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
            onChangeText={(txt) => searchFilterFunction(txt)}
            value={search}
          />

          <Entypo
            name="cross"
            size={INPUT_HEIGHT * 0.5}
            color="#2BB789"
            style={{
              alignSelf: "center",
              marginLeft: cross_icon,
            }}
            onPress={() => {
              setSearch("");
              results(searchArray);
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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

export default Search;
