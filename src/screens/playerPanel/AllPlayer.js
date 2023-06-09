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
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { http } from "../../components/http/http";
import { apiActiveURL } from "../../ApiBaseURL";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import Search from "../../components/PlayerProfile/Search";
import withToast from "../../components/Toast";
import { showSnackBar } from "../../store/actions";

const LOGO_SIZE = windowHeight * 0.1;
const CARD_WIDTH = windowWidth * 0.95;
const CARD_HEIGHT = windowHeight * 0.12;
const curve_height = windowHeight * 0.2;
const INPUT_HEIGHT = windowHeight * 0.07;
const INPUT_WIDTH = windowWidth - 40;
const cross_icon = windowHeight * 0.01;
const Search_Bar = windowHeight * 0.06;
const INPUT_HEIGHT1 = windowHeight * 0.07;

const AllPlayer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  const [players, setPlayers] = useState([]);
  const [pressedItem, setPressedItem] = useState(null);
  const [modal, setModal] = useState(false);
  const [searchedBlock, setSearchedBlock] = useState([]);

  useEffect(() => {
    if (isFocused) {
      // This code will run when the screen gains focus
      // alert("screen gained focus");
      listPlayers();
    } else {
      // This code will run when the screen loses focus
      // alert("screen lost focus");
    }
  }, [isFocused]);

  const listPlayers = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-all-players`,
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
                flexDirection: "row",
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
                      Captian
                    </Text>
                  </>
                ) : null}
              </View>
              <View
                style={{
                  marginRight: sizes.m5,
                  marginBottom: sizes.m5,
                  justifyContent: "space-evenly",
                }}
              >
                {userLoginSuccess?.data?.roleId == "recruiter" && (
                  <PlayerCustomButtom
                    textColor="white"
                    btnLabel="Hire Player"
                    onPress={() => {
                      // onPress(item);
                      hirePlayer(item);
                    }}
                    myStyle={{
                      alignSelf: "flex-end",
                    }}
                  />
                )}
                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="View Profile"
                  onPress={() => {
                    // onPress(item);
                    navigation.navigate("CricketProfile", {
                      profile: item,
                      other: true,
                    });
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

  const hirePlayer = (item) => {
    let data = new FormData();
    data.append("player_id", item.id);
    data.append("team_id", userLoginSuccess.data.team_id);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}send-player-team-request`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          dispatch(
            showSnackBar({ visible: true, text: response.data.message })
          );
        } else {
          dispatch(
            showSnackBar({
              visible: true,
              text: response.data.message,
              error: true,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showSnackBar({ visible: true, text: error.message, error: true })
        );
      });
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
          <Search
            searchArray={players}
            searchField="player_name"
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
            {userLoginSuccess?.data?.roleId == "recruiter" && (
              <PlayerCustomButtom
                textColor="white"
                btnLabel="Filter"
                onPress={() => {
                  // onPress(item);
                  navigation.navigate("FilterPlayersScreen");
                }}
                myStyle={{
                  alignSelf: "center",
                  marginTop: 10,
                }}
              />
            )}

            {searchedBlock[0] == "empty" ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>No player found</Text>
              </View>
            ) : (
              <FlatList
                data={searchedBlock.length > 0 ? searchedBlock : players}
                renderItem={(item) => {
                  return renderList(item.item);
                }}
                keyExtractor={(item) => `${item.id}`}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(AllPlayer);

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
