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
import Toast from "react-native-root-toast";

//import
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import PlayerCustomButtom from "../../components/formComponents/PlayerCustomButtom";
import colors from "../../config/colors";
import SearchBar from "../../components/formComponents/SearchBar";

import { apiActiveURL } from "../../ApiBaseURL";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Search from "../../components/PlayerProfile/Search";
import withToast from "../../components/Toast";
import { showSnackBar } from "../../store/actions";

const curve_height = windowHeight * 0.2;
const CARD_WIDTH = windowWidth * 0.93;
const CARD_HEIGHT = windowHeight * 0.12;
const INPUT_WIDTH = windowWidth - 40;
const INPUT_HEIGHT = windowHeight * 0.07;
const INPUT_HEIGHT1 = windowHeight * 0.07;
const Search_Bar = windowHeight * 0.06;
const cross_icon = windowHeight * 0.01;

const TeamsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [teams, setTeams] = useState([]);
  // const [filter, setFilter] = useState("");

  const [clicked, setClicked] = useState(false);
  const [searchedBlock, setSearchedBlock] = useState([]);

  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });

  useEffect(() => {
    if (isFocused) {
      // This code will run when the screen gains focus
      // alert("screen gained focus");
      listTeams();
    } else {
      // This code will run when the screen loses focus
      // alert("screen lost focus");
    }
  }, [isFocused]);

  useEffect(() => {
    // console.log("bilal");
    listTeams();
  }, []);

  const listTeams = async () => {
    // console.log(userLoginSuccess.token, "teams");
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-teams`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.teams, "teams response ===");
        // setCountry(response.data.countries);
        setTeams(response.data.teams);
      })
      .catch(function (error) {
        // console.log(error, "error");
      });
  };

  const onPress = async (item) => {
    console.log(item, "Button pressed!");

    let data = new FormData();

    data.append("team_id", item.value);
    data.append("recruiter_id", item.recruiter_id);

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}join-team`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        dispatch(
          showSnackBar({
            visible: true,
            text: response.data.message,
            error: false,
          })
        );
        listTeams();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderList = (item) => {
    // console.log(item, "item---");
    return (
      <View style={styles.cardsWrapper} key={item.value}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{ uri: item.logo }}
              resizeMode="contain"
              style={styles.cardImg}
            />
          </View>

          <View style={styles.cardInfo}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.label}
            </Text>

            {userLoginSuccess?.data?.roleId == "recruiter" ? (
              <>
                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="Schedule Match"
                  onPress={() => {
                    navigation.navigate("ScheduleMatch", { data: item });
                  }}
                  myStyle={{
                    alignSelf: "flex-end",

                    // marginRight: 20,
                    // paddingVertical: 10,
                  }}
                />
                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="View Players"
                  onPress={() => {
                    navigation.navigate("TeamList", { data: item.value });
                  }}
                  myStyle={{
                    alignSelf: "flex-end",

                    // marginRight: 20,
                    // paddingVertical: 10,
                  }}
                />
              </>
            ) : (
              <>
                <PlayerCustomButtom
                  textColor="white"
                  btnLabel={item.requested_status}
                  onPress={() => {
                    onPress(item);
                  }}
                  myStyle={{
                    alignSelf: "flex-end",
                  }}
                />

                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="View Players"
                  onPress={() => {
                    navigation.navigate("TeamList", { data: item.value });
                  }}
                  myStyle={{
                    alignSelf: "flex-end",

                    // marginRight: 20,
                    // paddingVertical: 10,
                  }}
                />
              </>
            )}
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
          <Search
            searchArray={teams}
            searchField="label"
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
              paddingVertical: 10,
            }}
          >
            {userLoginSuccess?.data?.roleId == "recruiter" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="Create Team"
                  onPress={() => {
                    navigation.navigate("CreateTeam");
                  }}
                  myStyle={{
                    alignSelf: "center",
                    marginRight: 20,
                    paddingVertical: 10,
                    width: 150,
                  }}
                />

                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="Send Invite List"
                  onPress={() => {
                    navigation.navigate("InviteList");
                  }}
                  myStyle={{
                    alignSelf: "center",
                    marginRight: 20,
                    paddingVertical: 10,
                    width: 150,
                  }}
                />
                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="Received Invite List"
                  onPress={() => {
                    navigation.navigate("RecivedInviteList");
                  }}
                  myStyle={{
                    alignSelf: "center",
                    marginRight: 20,
                    marginTop: 20,
                    paddingVertical: 10,
                    width: 150,
                  }}
                />
              </View>
            ) : null}
            {searchedBlock[0] == "empty" ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>No Teams found</Text>
              </View>
            ) : (
              <FlatList
                data={searchedBlock.length > 0 ? searchedBlock : teams}
                renderItem={({ item }) => {
                  console.log(item, "item list");
                  return renderList(item);
                }}
                keyExtractor={(item) => `${item.value}`}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(TeamsScreen);

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
    // backgroundColor: "red",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "green",
  },

  cardImg: {
    height: "50%",
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

  input: {
    paddingLeft: sizes.m8,
    fontWeight: "bold",
    fontSize: sizes.m16,
    width: INPUT_WIDTH * 0.75,
  },
});
