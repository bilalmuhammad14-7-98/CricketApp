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
import { useSelector } from "react-redux";
import Search from "../../components/PlayerProfile/Search";
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
          width: CARD_WIDTH,
          height: CARD_HEIGHT * 0.15,
          borderRadius: sizes.m15,
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

const PlayerHome = ({ navigation }) => {
  const userLoginSuccess = useSelector((state) => {
    console.log(state.loginData.data, "login data ");
    return state.loginData.data;
  });
  const [playinRole, setplayinRole] = useState("");
  const [battingStyle, setbattingStyle] = useState("");
  const [bowlingStyle, setbowlingStyle] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(true);
  const [searchedBlock, setSearchedBlock] = useState([]);

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
      name: "My Players",
      code: colors.white,
      image: images.cricketerAndfootballer,
      navigationScreen: () => {
        {
          navigation.navigate("PlayerHomeRoot", { screen: "PlayersScreen" });
        }
      },
    },
    {
      name: "All Players",
      code: colors.white,
      image: images.cricketerAndfootballer,
      navigationScreen: () => {
        {
          navigation.navigate("PlayerHomeRoot", {
            screen: "AllPlayersScreen",
          });
        }
      },
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
    {
      name: "Gallery",
      code: colors.white,
      image: images.Scorer,
      navigationScreen: () =>
        navigation.navigate("PlayerHomeRoot", { screen: "Gallery" }),
    },
  ];

  const playerCardItems = [
    {
      name: "All Players",
      code: colors.white,
      image: images.cricketerAndfootballer,
      navigationScreen: () => {
        {
          navigation.navigate("PlayerHomeRoot", {
            screen: "AllPlayersScreen",
          });
        }
      },
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
    {
      name: "Gallery",
      code: colors.white,
      image: images.Scorer,
      navigationScreen: () =>
        navigation.navigate("PlayerHomeRoot", { screen: "Gallery" }),
    },
    {
      name: "Matches Scheduled",
      code: colors.white,
      image: images.Scorer,
      navigationScreen: () =>
        navigation.navigate("PlayerHomeRoot", { screen: "ScheduleMatches" }),
    },
  ];

  const umpireCardItems = [
    {
      name: "Gallery",
      code: colors.white,
      image: images.Scorer,
      navigationScreen: () =>
        navigation.navigate("PlayerHomeRoot", { screen: "Gallery" }),
    },
    {
      name: "Request",
      code: colors.white,
      image: images.cricketerAndfootballer,
      navigationScreen: () =>
        navigation.navigate("PlayerHomeRoot", { screen: "Request" }),
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
      <View>
        <StatusBar barStyle="dark-content" />
        <Search
          searchArray={
            userLoginSuccess?.data?.roleId == "umpire"
              ? umpireCardItems
              : userLoginSuccess?.data?.roleId == "recruiter"
              ? cardItems
              : playerCardItems
          }
          searchField="name"
          results={(data) => {
            setSearchedBlock([...data]);
          }}
        />

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
              {searchedBlock && searchedBlock?.length > 0
                ? searchedBlock.map((item) => {
                    return (
                      <Card
                        key={item.name}
                        item={item}
                        navigation={navigation}
                      />
                    );
                  })
                : userLoginSuccess?.data?.roleId == "umpire"
                ? umpireCardItems.map((item) => {
                    return (
                      <Card
                        key={item.name}
                        item={item}
                        navigation={navigation}
                      />
                    );
                  })
                : userLoginSuccess?.data?.roleId == "recruiter"
                ? cardItems.map((item) => {
                    return (
                      <Card
                        key={item.name}
                        item={item}
                        navigation={navigation}
                      />
                    );
                  })
                : playerCardItems.map((item) => {
                    return (
                      <Card
                        key={item.name}
                        item={item}
                        navigation={navigation}
                      />
                    );
                  })}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlayerHome;

const styles = StyleSheet.create({
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
  },
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
