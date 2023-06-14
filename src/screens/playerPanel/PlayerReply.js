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
import { apiActiveURL } from "../../ApiBaseURL";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-root-toast";
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

const PlayerReply = (navigation) => {
  const dispatch = useDispatch();
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  const [players, setPlayers] = useState([]);

  const listPlayers = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}player-team-request-listing`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response?.data?.teams, "response?.data?.teams");
        setPlayers(response?.data?.teams);
        // setTeams(response.data.teams);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  const onPress = async (item, status) => {
    // console.log(item.team_id, "team_id");
    // console.log(item.team_req_id, "team_req_id");
    // console.log(item.recruiter_id, "recruiter_id");
    // console.log(status, "recruiter_id");
    // return console.log(item);
    let data = new FormData();
    data.append("team_req_id", item.team_id.toString());
    data.append("team_id", item.team_id.toString());
    data.append("recruiter_id", item.recruiter_id.toString());
    data.append("status", status);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}change-player-team-request-status`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data, "players request response");
        if (response.data.success) {
          dispatch(
            showSnackBar({
              visible: true,
              text: response.data.message,
              error: false,
            })
          );
          listPlayers();
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
      .catch(function (error) {
        dispatch(
          showSnackBar({
            visible: true,
            text: error.message,
            error: true,
          })
        );
      });

    // var data = new FormData();
    // data.append("team_req_id", item.team_req_id);
    // data.append("team_id", item.team_id);
    // data.append("recruiter_id", item.recruiter_id);
    // data.append("status", status);

    // var config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: `${apiActiveURL}change-player-team-request-status`,
    //   headers: {
    //     Authorization: `Bearer ${userLoginSuccess.token}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: data,
    // };

    // await axios(config)
    //   .then(function (response) {
    //     console.log(response.data, "players request response");
    //     if (response.data.success) {
    //       dispatch(
    //         showSnackBar({
    //           visible: true,
    //           text: response.data.message,
    //           error: false,
    //         })
    //       );
    //       listPlayers();
    //     } else {
    //       dispatch(
    //         showSnackBar({
    //           visible: true,
    //           text: response.data.message,
    //           error: true,
    //         })
    //       );
    //     }
    //   })
    //   .catch(function (error) {
    //     dispatch(
    //       showSnackBar({
    //         visible: true,
    //         text: error.message,
    //         error: true,
    //       })
    //     );
    //   });
  };

  useEffect(() => {
    listPlayers();
  }, []);

  const renderList = (item, index) => {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.card} key={item.player_id}>
            <View style={styles.cardView}>
              <View style={styles.logo}>
                <Avatar.Image
                  size={LOGO_SIZE}
                  source={
                    item?.playerImage
                      ? { uri: item?.playerImage }
                      : images.FypLogo
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

                {/* <Text style={styles.text}>{item.notification}</Text> */}
              </View>
              <View
                style={{
                  marginRight: sizes.m5,
                  marginBottom: sizes.m5,
                  justifyContent: "flex-end",
                  //   backgroundColor: "red",
                }}
              >
                <View style={{ justifyContent: "space-evenly" }}>
                  <PlayerCustomButtom
                    textColor="white"
                    btnLabel={item.status}
                    myStyle={{
                      alignSelf: "center",
                      marginTop: -10,
                      marginBottom: 5,
                    }}
                    disabled={true}
                  />
                </View>
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
              data={players}
              renderItem={(item) => {
                return renderList(item.item);
              }}
              keyExtractor={(item) => `${item.player_id}`}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(PlayerReply);

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
