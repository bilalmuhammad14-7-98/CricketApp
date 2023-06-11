import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
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
import { Avatar, Modal, Portal } from "react-native-paper";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import PlayerCustomButtom from "../../components/formComponents/PlayerCustomButtom";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { http } from "../../components/http/http";
import { apiActiveURL } from "../../ApiBaseURL";
import { useSelector } from "react-redux";
import CustomButton from "../../components/formComponents/CustomButton";
import { colors } from "../../config/colors";
import Toast from "react-native-root-toast";
import CustomToast from "../../components/formComponents/CustomToast";
import Search from "../../components/PlayerProfile/Search";

const LOGO_SIZE = windowHeight * 0.1;
const CARD_WIDTH = windowWidth * 0.95;
const CARD_HEIGHT = windowHeight * 0.12;
const curve_height = windowHeight * 0.2;
const INPUT_HEIGHT = windowHeight * 0.07;
const INPUT_WIDTH = windowWidth - 40;
const cross_icon = windowHeight * 0.01;
const Search_Bar = windowHeight * 0.06;
const INPUT_HEIGHT1 = windowHeight * 0.07;

const UmpireScreen = () => {
  const navigation = useNavigation();
  const [umpires, setUmpires] = useState([]);
  const [matches, setMatches] = useState([]);
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  const [searchedBlock, setSearchedBlock] = useState([]);

  const [currentUmpire, setCurrentUmpire] = useState("");
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  const data = [
    {
      id: 1,
      name: "Muhammad hashirhashirhashirhashirhashirhashirhashir",
      charges: 100,
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
      name: "Shan",
      // notification: "accept it"
    },

    {
      id: 5,
      name: "Uzair",
      // notification: "accept it"
    },

    {
      id: 6,
      name: "Uzair",
      // notification: "accept it"
    },

    {
      id: 7,
      name: "Uzair",
      // notification: "accept it"
    },

    {
      id: 8,
      name: "Uzair",
      // notification: "accept it"
    },
  ];

  const renderList = (item, index) => {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.card} key={index}>
            <View style={styles.cardView}>
              <View style={styles.logo}>
                <Avatar.Image
                  size={LOGO_SIZE}
                  source={{ uri: item.umpire_profile_img }}
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
              <View
                style={{
                  // alignItems: "center",
                  // margin: sizes.m8,
                  marginLeft: sizes.m3,
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                  {item.umpire_name}
                </Text>

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                  Fees:
                  {item?.fees ? item?.fees : "00.00"}
                </Text>
                {/* <Text style={styles.text}>{item.notification}</Text> */}
              </View>
              <View
                style={{
                  marginRight: sizes.m5,
                  marginBottom: sizes.m5,
                  justifyContent: "space-between",
                }}
              >
                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="Send Request"
                  myStyle={{
                    alignSelf: "flex-end",
                  }}
                  onPress={() => {
                    setCurrentUmpire(item.id);
                    getMatchID();
                  }}
                />
                <PlayerCustomButtom
                  textColor="white"
                  btnLabel="View Profile"
                  myStyle={{
                    alignSelf: "flex-end",
                  }}
                  onPress={() => {
                    navigation.navigate("umpireprofile", { umpire: item });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const matchesList = (item, index) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, ...styles.matchCard }}
        key={index}
        onPress={() => sendRequestToUmpire(item.id)}
      >
        <View style={styles.cardView}>
          <View style={styles.logo}>
            <Avatar.Image
              size={LOGO_SIZE}
              source={{ uri: item.requested_receiver_team_logo }}
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
          <View
            style={{
              // alignItems: "center",
              // margin: sizes.m8,
              marginLeft: sizes.m3,
            }}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              {item.request_receiver_name}
            </Text>

            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              Venue:
              {item?.venue}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              Team:
              {item?.requested_receiver_team_name}
            </Text>
            {/* <Text style={styles.text}>{item.notification}</Text> */}
          </View>
          <View
            style={{
              marginRight: sizes.m5,
              marginBottom: sizes.m5,
              justifyContent: "flex-end",
            }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      listUmpires();
    }, [])
  );

  const listUmpires = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-all-umpire`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response?.data?.success) {
          console.log(response?.data?.umpires, "response?.data?.umpires");
          setUmpires([...response?.data?.umpires]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getMatchID = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}sending-list`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), "RESPONSE OF MATCH ID");
        console.log(response?.data?.data);
        if (response?.data?.data?.length > 0) {
          setMatches([...response?.data?.data]);
          showModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showModal = (data) => {
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const sendRequestToUmpire = (matchid) => {
    const FormData = require("form-data");
    let data = new FormData();
    data.append("matchId", matchid);
    data.append("umpireId", currentUmpire);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}send-umpire-request`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), "REQUEST TO UMPIRE");
        if (response.data.success) {
          hideModal();
          Toast.show(response.data.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            textColor: "#FFFFFF",
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            position: 80,
            backgroundColor: "#32de84",
            style: {
              height: 100,
              padding: 30,
              borderRadius: 10,
              paddingLeft: 45,
              paddingRight: 15,
            },
          });
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(function hideToast() {
      setToast({ ...toast, show: false, message: "" });
    }, 500);
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: sizes.bottomTabHeight1,
        marginBottom: sizes.bottomTabHeight,
      }}
    >
      <View style={styles.root}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              ...styles.modalStyles,
              maxHeight: Platform.OS == "ios" ? null : "90%",
            }}
          >
            <Text style={[styles.text, { textAlign: "center", fontSize: 20 }]}>
              Your Matches
            </Text>
            <Text style={[styles.text, { textAlign: "center", fontSize: 14 }]}>
              Click on match to request umpire for the match
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={matches}
              renderItem={({ item }) => {
                return matchesList(item);
              }}
              keyExtractor={(item) => `${item.id}`}
            />
          </Modal>
        </Portal>

        <View>
          <StatusBar barStyle="dark-content" />
          <Search
            searchArray={umpires}
            searchField="umpire_name"
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
            <FlatList
              data={searchedBlock.length > 0 ? searchedBlock : umpires}
              renderItem={({ item }) => {
                return renderList(item);
              }}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        </View>
      </View>
      <CustomToast show={toast.show} message={toast.message} />
    </ScrollView>
  );
};

export default UmpireScreen;

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
  matchCard: {
    width: "100%",
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
  modalStyles: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("window").width - 20,
    borderRadius: 15,
    padding: 25,
  },
});
