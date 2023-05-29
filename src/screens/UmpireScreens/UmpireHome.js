import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

// imports
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import { Avatar } from "react-native-paper";
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import { useTheme } from "@react-navigation/native";

//navigation imports
import TeamsScreen from "./Teams";
import Marketplace from "./Marketplace";
import UserProfile from "./UserProfile";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "../../components/formComponents/SearchBar";

const CARD_WIDTH1 = windowWidth * 0.93;
const CARD_HEIGHT1 = windowWidth * 0.5;
const CARD_WIDTH = windowWidth * 0.44;
const CARD_HEIGHT = windowHeight * 0.23;
const INPUT_WIDTH = CARD_WIDTH1;
const INPUT_HEIGHT = windowHeight * 0.07;
const Search_Bar = windowHeight * 0.06;
const INPUT_HEIGHT1 = windowHeight * 0.07;
const input_width = windowWidth - 40;
const cross_icon = windowHeight * 0.01;
const curve_height = windowHeight * 0.2;
const swiper_height = windowHeight * 0.04;

const Card = ({ item, navigation }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={item.navigationScreen}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: sizes.m10,
        borderColor: "#C6C6C6",
        justifyContent: "flex-end",
        padding: sizes.m7,
        backgroundColor: colors.black,
        flexDirection: "column",
        margin: sizes.m10,
        marginBottom: sizes.m15,
      }}
    >
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          opacity: 0.7,
          position: "absolute",
        }}
        imageStyle={{ borderRadius: sizes.m10 }}
      ></ImageBackground>

      <View
        style={{
          // backgroundColor: colors.white,
          width: CARD_WIDTH,
          height: CARD_HEIGHT * 0.15,
          borderRadius: sizes.m15,

          //   justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: sizes.h3, color: item.code, fontWeight: "bold" }}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const UmpireHome = ({ navigation }) => {
  const [playinRole, setplayinRole] = useState("");
  const [battingStyle, setbattingStyle] = useState("");
  const [bowlingStyle, setbowlingStyle] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const { colors } = useTheme();

  const handleSubmit = async () => {
    try {
      var res = await signUpRequest(playinRole, battingStyle, bowlingStyle);
      if (!res.isOk) {
        setToast({ ...toast, show: true, message: res.message });
        return;
      }

      console.log(res);
      setToast({ ...toast, show: true, message: res.payLoad.token });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const cardItems = [
    {
      name: "Players",
      code: colors.white,
      image: images.cricketerAndfootballer,
      navigationScreen: () =>
        navigation.navigate("PlayerHomeRoot", { screen: "PlayersScreen" }),
    },
    {
      name: "Umpire/Referee",
      code: colors.white,
      image: images.UmpireAndReferee,
      navigationScreen: () =>
        navigation.navigate("PlayerHomeRoot", { screen: "Umpire" }),
    },
    {
      name: "Teams",
      code: colors.white,
      image: images.Teams,
      navigationScreen: () =>
        navigation.navigate("TeamsScreenRoot", { screen: "TeamsScreen" }),
    },
    {
      name: "Scorer",
      code: colors.white,
      image: images.Scorer,
      navigationScreen: () =>
        navigation.navigate("TeamsScreenRoot", { screen: "TeamsScreen" }),
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: sizes.bottomTabHeight1,
        marginBottom: sizes.bottomTabHeight,
      }}
    >
      {/* <View style={styles.logo}>
        <Avatar.Image size={80} source={images.logo} />
        <Ionicons name="notifications" size={35} color="#000" />
      </View> */}

      {/* <View style={[styles.text_input]}>
        <Feather
          name="search"
          size={INPUT_HEIGHT * 0.5}
          color="#C6C6C6"
          style={{
            alignSelf: "center",
          }}
        />

        <TextInput
          placeholder="Search"
          style={{
            paddingLeft: sizes.m8,
            fontWeight: "bold",
            fontSize: sizes.m15,
            // flex: 1,
            // backgroundColor: '#000',
            width: INPUT_WIDTH * 0.75
          }}
        />

        <Entypo
          name="cross"
          size={INPUT_HEIGHT * 0.5}
          color="#C6C6C6"
          style={{
            alignSelf: "center",
            // justifyContent: "space-between",
            // paddingLeft: 210,
            // flexDirection: 'row'
          }}
        />
      </View> */}
      <View>
        <StatusBar barStyle="dark-content" />
        {/* <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} /> */}
        <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
          <View style={{ height: curve_height }}>
            <View>
              <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
              />
            </View>
            {/* <View style={[styles.text_input]}>
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
                  width: input_width * 0.75,
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
            </View> */}
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
          <View style={styles.sliderContainer}>
            <Swiper autoplay activeDotColor="#2BB789">
              <View style={styles.slide}>
                <Image
                  source={require("../../../assets/Images/Scorer.jpg")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>

              <View style={styles.slide}>
                <Image
                  source={require("../../../assets/Images/cricketerAndfootballer.jpg")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>

              <View style={styles.slide}>
                <Image
                  source={require("../../../assets/Images/Scorer.jpg")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
            </Swiper>
          </View>

          <View
            style={{
              // flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: swiper_height,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {cardItems.map((item) => {
                return <Card item={item} navigation={navigation} />;
              })}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UmpireHome;

const styles = StyleSheet.create({
  //card
  // gridView: {
  //   marginTop: 300,
  //   flex: 1,
  // },

  // itemContainer: {
  //   justifyContent: "flex-end",
  //   borderRadius: 20,
  //   padding: 10,
  //   // height: 170,
  // },

  // itemName: {
  //   fontSize: 16,
  //   color: "#fff",
  //   fontWeight: "600",
  // },

  // itemCode: {
  //   fontWeight: "600",
  //   fontSize: 12,
  //   color: "#fff",
  // },

  //slider
  sliderContainer: {
    height: CARD_HEIGHT1,
    width: CARD_WIDTH1,
    marginTop: swiper_height,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: sizes.m20,
  },

  slide: {
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: sizes.m20,
  },

  sliderImage: {
    height: CARD_HEIGHT1,
    width: CARD_WIDTH1,
    alignSelf: "center",
    borderRadius: sizes.m20,
    // backgroundColor: 'yellow'
  },

  //search bar
  // text_input: {
  //   flex: 1,
  //   // position: "absolute",
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginTop: sizes.m10,
  //   flexDirection: "row",
  //   borderWidth: 2,
  //   borderRadius: sizes.m12,
  //   padding: sizes.m10,
  //   borderColor: "#C6C6C6",
  //   width: INPUT_WIDTH,
  //   height: INPUT_HEIGHT,
  //   alignSelf: "center",
  // },

  text_input: {
    marginTop: Search_Bar,
    flexDirection: "row",
    borderRadius: sizes.m8,
    padding: sizes.m10,
    borderColor: "#fff",
    backgroundColor: "#fff",
    width: input_width,
    height: INPUT_HEIGHT1,
    alignSelf: "center",
  },
});
