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
  Alert,
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

const LOGO_SIZE = windowHeight * 0.1;
const CARD_WIDTH = windowWidth * 0.95;
const CARD_HEIGHT = windowHeight * 0.12;
const curve_height = windowHeight * 0.2;
const INPUT_HEIGHT = windowHeight * 0.07;
const INPUT_WIDTH = windowWidth - 40;
const cross_icon = windowHeight * 0.01;
const Search_Bar = windowHeight * 0.06;
const INPUT_HEIGHT1 = windowHeight * 0.07;

const Request = () => {
  const navigation = useNavigation();
  const [recruterRequests, setRecruterRequests] = useState([]);
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });

  const requestList = (item, index) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, ...styles.card }}
        key={index}
        onPress={() => {}}
      >
        <View style={styles.cardView}>
          <View style={styles.logo}>
            <Avatar.Image
              size={LOGO_SIZE}
              source={{ uri: item.request_sender_team_logo }}
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
              flex: 1,
            }}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              {item.request_sender_id}
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
              justifyContent: "center",
            }}
          >
            <PlayerCustomButtom
              textColor="white"
              btnLabel="Accept"
              myStyle={{
                alignSelf: "flex-end",
                width: windowWidth * 0.22,
              }}
              onPress={() => {
                handleRequest({ matchid: item.id, status: "accept" });
              }}
            />
            <PlayerCustomButtom
              textColor="white"
              btnLabel="Decline"
              myStyle={{
                alignSelf: "flex-end",
                width: windowWidth * 0.22,
                backgroundColor: "red",
                marginTop: 5,
              }}
              icon="delete"
              onPress={() => {
                handleRequest({ matchid: item.id, status: "decline" });
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const executeRequest = (matchData) => {
    const FormData = require("form-data");
    let data = new FormData();
    data.append("matchId", matchData.matchid);
    data.append("request_status", matchData.status);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}umpire-update-status`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data), "UMPIRE REQUEST");
        if (response.data.success) {
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
          navigation.goBack();
        }
        if (response.data.success == false && response.data.message == "") {
          Toast.show("offer declined", {
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
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRequest = (matchData) => {
    if (matchData.status == "decline") {
      Alert.alert(
        "Confirm",
        "are you sure you wnat to decline the request",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "yes",
            onPress: async () => {
              executeRequest(matchData);
            },
          },
          {
            text: "no",
            onPress: () => {},
          },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      executeRequest(matchData);
    }
  };
  useFocusEffect(
    useCallback(() => {
      listRequest();
    }, [])
  );

  const listRequest = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}get-Umpiring-list`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.data?.length > 0) {
          setRecruterRequests([...response.data.data]);
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
        {/* <Portal>
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
        </Portal> */}

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
            {recruterRequests.length == 0 ? (
              <View>
                <Text style={[styles.text, { textAlign: "center" }]}>
                  No Requests found
                </Text>
              </View>
            ) : (
              <FlatList
                data={recruterRequests}
                renderItem={({ item }) => {
                  return requestList(item);
                }}
                keyExtractor={(item) => `${item.id}`}
              />
            )}
          </View>
        </View>
      </View>
      <CustomToast show={toast.show} message={toast.message} />
    </ScrollView>
  );
};

export default Request;

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
