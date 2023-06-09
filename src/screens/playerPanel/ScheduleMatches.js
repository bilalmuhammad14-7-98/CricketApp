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
import { useSelector } from "react-redux";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Search from "../../components/PlayerProfile/Search";
import withToast from "../../components/Toast";

const curve_height = windowHeight * 0.2;
const CARD_WIDTH = windowWidth * 0.93;
const CARD_HEIGHT = windowHeight * 0.32;
const INPUT_WIDTH = windowWidth - 40;
const INPUT_HEIGHT = windowHeight * 0.07;
const INPUT_HEIGHT1 = windowHeight * 0.07;
const Search_Bar = windowHeight * 0.06;
const cross_icon = windowHeight * 0.01;

const ScheduleMatches = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [matches, setMatches] = useState([]);
  // const [filter, setFilter] = useState("");

  const [clicked, setClicked] = useState(false);
  const [searchedBlock, setSearchedBlock] = useState([]);

  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });

  //   useEffect(() => {
  //     if (isFocused) {
  //       // This code will run when the screen gains focus
  //       // alert("screen gained focus");
  //       listTeams();
  //     } else {
  //       // This code will run when the screen loses focus
  //       // alert("screen lost focus");
  //     }
  //   }, [isFocused]);

  useEffect(() => {
    // console.log("bilal");
    listMatches();
  }, []);

  const listMatches = async () => {
    // console.log(userLoginSuccess.token, "teams");
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}player-schedule-match?player_id=${userLoginSuccess.data.id}&status=unplayed`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data, "teams response ===");
        // setCountry(response.data.countries);
        setMatches(response.data.data);
      })
      .catch(function (error) {
        // console.log(error, "error");
      });
  };

  const renderList = (item) => {
    // console.log(item, "item---");
    return (
      <View style={styles.cardsWrapper} key={item.value}>
        <View style={styles.card}>
          {/* <View style={styles.cardImgWrapper}></View> */}

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Venue:</Text>
            <Text>{item.venue}</Text>
            <Text style={styles.cardTitle}>Description:</Text>
            <Text>{item.description}</Text>
            <Text style={styles.cardTitle}>Match Date & Time:</Text>
            <Text>{item.match_date_time}</Text>
            <Text style={styles.cardTitle}>Match Type: </Text>
            <Text>{item.match_type}</Text>
            <Text style={styles.cardTitle}>Reciever: </Text>
            <Text>{item.request_receiver_name}</Text>
            <Text style={styles.cardTitle}>Reciever Team: </Text>
            <Text>{item.requested_receiver_team_name}</Text>
            <Text style={styles.cardTitle}>Sender Team: </Text>
            <Text>{item.requested_sender_team_name}</Text>
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
            <View style={{ height: curve_height }}></View>
          </LinearGradient>

          <View
            style={{
              marginTop: -35,
              backgroundColor: "white",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingVertical: 10,
            }}
          >
            {matches.length > 0 ? (
              <FlatList
                data={matches}
                renderItem={({ item }) => {
                  console.log(item, "item list");
                  return renderList(item);
                }}
                keyExtractor={(item) => `${item.value}`}
              />
            ) : (
              <Text
                style={{
                  alignSelf: "center",
                }}
              >
                No match found
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default withToast(ScheduleMatches);

const styles = StyleSheet.create({
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
    // height: CARD_HEIGHT,
    marginTop: 8,
    flexDirection: "row",
    // shadowColor: "#999",
    // shadowOffset: { width: CARD_WIDTH, height: CARD_HEIGHT },
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // elevation: 5,
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
    borderLeftWidth: 1,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,

    backgroundColor: "#fff",
    // justifyContent: "space-between",
    // flexDirection: "row",
  },

  cardTitle: {
    fontWeight: "bold",
    marginTop: 5,
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
