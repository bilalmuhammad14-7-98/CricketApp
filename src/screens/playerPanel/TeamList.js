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
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
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
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { http } from "../../components/http/http";
import { apiActiveURL } from "../../ApiBaseURL";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import withToast from "../../components/Toast";

const LOGO_SIZE = windowHeight * 0.1;
const CARD_WIDTH = windowWidth * 0.95;
const CARD_HEIGHT = windowHeight * 0.12;
const curve_height = windowHeight * 0.2;
const INPUT_HEIGHT = windowHeight * 0.07;
const INPUT_WIDTH = windowWidth - 40;
const cross_icon = windowHeight * 0.01;
const Search_Bar = windowHeight * 0.06;
const INPUT_HEIGHT1 = windowHeight * 0.07;

const TeamList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route.params, "route params");
  const isFocused = useIsFocused();
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  const [players, setPlayers] = useState([]);
  const [pressedItem, setPressedItem] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (isFocused) {
      // This code will run when the screen gains focus
      // alert("screen gained focus");
      listPlayers();
    }
  }, [isFocused]);

  const listPlayers = async () => {
    console.log(userLoginSuccess?.data?.team_id, "recruiter id");
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-players?teamId=${route.params.data}`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data, "players response");
        setPlayers(response?.data?.players);
        // setTeams(response.data.teams);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    listPlayers();
  }, []);

  const renderList = (item, index) => {
    console.log(item, "item team list");
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        key={item.playerId}
        // onLongPress={() => handleLongPress(item)}
      >
        <View>
          <View style={styles.card}>
            <View style={styles.cardView}>
              <View style={styles.logo}>
                <Avatar.Image
                  size={LOGO_SIZE}
                  source={
                    item?.player_profile_img
                      ? { uri: item?.player_profile_img }
                      : images.logo
                  }
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                padding: sizes.m7,
              }}
            >
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                  {item?.player_name}
                </Text>

                {item?.isCaptian == "true" ? (
                  <>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.text}
                    >
                      Captain
                    </Text>
                  </>
                ) : null}
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
                  btnLabel="View Profile"
                  onPress={() => {
                    // onPress(item);
                    navigation.navigate("CricketProfile", {
                      profile: { ...item, id: item.playerId },
                      other: true,
                    });
                    // navigation.navigate("MyPlayerDetail", {
                    //   playerId: item.playerId,
                    //   screenName: "myPlayer",
                    // });
                  }}
                  myStyle={{
                    alignSelf: "flex-end",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
              //   marginTop: -15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              //   flex: 1,
            }}
          >
            {players.length > 0 ? (
              <FlatList
                data={players}
                renderItem={(item) => {
                  return renderList(item.item);
                }}
                keyExtractor={(item) => `${item.playerId}`}
              />
            ) : (
              <Text>No players in the team</Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(TeamList);

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
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 100,
    borderRadius: 10,
    borderWidth: 1,

    borderColor: "#2e8b57",
  },

  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
