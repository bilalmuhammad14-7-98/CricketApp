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
  ActivityIndicator,
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
import { colors } from "../../config/colors";
import CustomButton from "../../components/formComponents/CustomButton";
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

const PlayersScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userLoginSuccess = useSelector((state) => {
    // console.log(state, "state");
    console.log(state.loginData.data.token, "login data success");
    return state.loginData.data;
  });
  const [loader, setLoader] = useState(false);

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
    console.log(userLoginSuccess?.data?.team_id, "recruiter id");
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-players?teamId=${userLoginSuccess?.data?.team_id}`,
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

  const onPress = async (item) => {
    console.log(item, "clicked item");
  };

  const handleLongPress = (item) => {
    console.log(item, "long press item");
    setPressedItem(item);
    setModal(true);
    // Additional actions you want to perform on long press
  };

  const makeCaptian = async () => {
    console.log(pressedItem, "final data");
    var data = new FormData();
    data.append("playerId", pressedItem?.playerId);
    data.append("teamId", userLoginSuccess?.data?.team_id);

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}change-Captain`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    console.log(config, "config");

    await axios(config)
      .then(function (response) {
        console.log(response, "make captain response");
        dispatch(
          showSnackBar({
            visible: true,
            text: response.data.message,
            error: true,
          })
        );
        listPlayers();
        setModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deletePlayer = async (item) => {
    console.log(item, "Button pressed!");
    setLoader(true);
    let data = new FormData();

    data.append("playerId", item);

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}leave-team`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: data,
    };
    console.log(config.data, "config");
    // return

    await axios(config)
      .then(function (response) {
        const newData = [...players];
        const index = newData.findIndex((item) => item.playerId === item);
        newData.splice(index, 1);
        setPlayers(newData);
        // console.log(response.data, "join team response");
        dispatch(
          showSnackBar({
            visible: true,
            text: response.data.message,
            error: true,
          })
        );
        // listTeams();
        setLoader(false);
      })
      .catch(function (error) {
        setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    listPlayers();
  }, []);

  const renderList = (item, index) => {
    console.log(item, "item");
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        key={item.playerId}
        onLongPress={() => handleLongPress(item)}
      >
        <View>
          <View style={styles.card}>
            <View style={styles.cardView}>
              <View style={styles.logo}>
                <Avatar.Image
                  size={LOGO_SIZE}
                  source={
                    item?.playerImage ? { uri: item?.playerImage } : images.logo
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
                  {item?.playerName}
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
                  // backgroundColor: "red",
                  flexDirection: "row",
                  // marginHorizontal: 13,
                  width: "100%",
                  // marginBottom: sizes.m5,
                  justifyContent: "flex-end",
                }}
              >
                <CustomButton
                  textColor="white"
                  btnLabel="View Profile"
                  Press={() => {
                    // onPress(item);
                    navigation.navigate("MyPlayerDetail", {
                      playerId: item.playerId,
                      screenName: "myPlayer",
                    });
                  }}
                  myStyle={{
                    // alignSelf: "flex-end",

                    width: 100,
                  }}
                  txtStyle={{ fontSize: 12 }}
                />
                <CustomButton
                  textColor="white"
                  btnLabel={
                    !loader ? (
                      "Delete Player"
                    ) : (
                      <ActivityIndicator
                        animating
                        size={12}
                        color={colors.white}
                      />
                    )
                  }
                  Press={() => {
                    deletePlayer(item.playerId);
                    // onPress(item);
                  }}
                  txtStyle={{ fontSize: 12 }}
                  myStyle={{
                    alignSelf: "flex-end",
                    width: 100,
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
          <Search
            searchArray={players}
            searchField="playerName"
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
            <Modal
              //  animationType="slide"
              transparent={true}
              visible={modal}
              onRequestClose={() => {
                setModal(false);
              }}
            >
              <View style={styles.modalView}>
                <Text>
                  Are you sure you want to make {pressedItem?.playerName} a
                  captian
                </Text>
                <View style={styles.modalButtonView}>
                  <Button onPress={() => setModal(false)}>Cancel</Button>
                  <Button onPress={() => makeCaptian()}>ok</Button>
                  {/* <Button
                    icon="image-area"
                    mode="contained"
                    theme={theme}
                    onPress={() => pickFromGallery()}
                  >
                    Gallery
                  </Button> */}
                </View>
              </View>
            </Modal>
            <PlayerCustomButtom
              textColor="white"
              btnLabel="View Player request"
              onPress={() => {
                navigation.navigate("PlayerRequest");
              }}
              myStyle={{
                marginTop: 10,
                alignSelf: "flex-end",
                marginRight: 20,
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderRadius: 40,
              }}
            />
            <FlatList
              data={searchedBlock.length > 0 ? searchedBlock : players}
              renderItem={(item) => {
                return renderList(item.item);
              }}
              keyExtractor={(item) => `${item.playerId}`}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(PlayersScreen);

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
