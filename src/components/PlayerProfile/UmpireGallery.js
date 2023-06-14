import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Modal,
} from "react-native";
import { useState } from "react";

//icons import
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
} from "react-native-vector-icons";

//import
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import PlayerGalleryButton from "../formComponents/PlayerGalleryButton";
import { Button } from "react-native-paper";
import { useCallback } from "react";
import { apiActiveURL, imageURL } from "../../ApiBaseURL";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../store/actions";
import axios from "axios";

const CARD_WIDTH = windowWidth * 0.46;
const CARD_HEIGHT = windowHeight * 0.22;

const Card = ({ item, index }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginLeft: 10,
        marginTop: sizes.m15,
        borderRadius: sizes.m3,
        borderColor: "#C6C6C6",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          // paddingTop: 45, // width: CARD_WIDTH, // height: CARD_HEIGHT * 0.20,
        }}
      >
        <Image
          key={index}
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            resizeMode: "cover",
            borderRadius: 10,
            margin: 10,
          }}
          source={{ uri: item.uri }}
        />
      </View>
    </View>
  );
};

const UmpireGallery = ({ profile }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  const cardItems = [
    {
      //   name: "Matches",
      code: "black",
      //   image: images.cricketerAndfootballer,
    },
    {
      //   name: "Innings",
      code: "black",
      //   image: images.UmpireAndReferee,
    },
    {
      //   name: "Runs",
      code: colors.white,
      //   image: images.UmpireAndReferee,
    },

    {
      //   name: "Highest",
      code: colors.white,
      //   image: images.UmpireAndReferee,
    },

    // {
    //   name: "50s",
    //   code: colors.white,
    //   //   image: images.UmpireAndReferee,
    // },

    // {
    //   name: "Wickets",
    //   code: colors.white,
    //   //   image: images.UmpireAndReferee,
    // },

    // {
    //   name: "Best",
    //   code: colors.white,
    //   //   image: images.UmpireAndReferee,
    // },

    // {
    //   name: "Runs Conceded",
    //   code: colors.white,
    //   //   image: images.UmpireAndReferee,
    // },
  ];
  useFocusEffect(
    useCallback(() => {
      getuserGallery();
    }, [])
  );
  const getuserGallery = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-Player-Gallery?player_id=${
        userLoginSuccess?.data?.roleId == "recruiter"
          ? profile?.umpire_id
          : userLoginSuccess.data.id
      }`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response?.data, "response?.data OF GET IMAGE");
        response?.data?.teams?.map((team) => {
          team.images?.map((img) => {
            image.push({ uri: `${imageURL}${img.profile_img}`, id: img.id });
          });
        });
        setImage([...image]);
      })
      .catch((error) => {
        dispatch(
          showSnackBar({ visible: true, text: "error.message", error: true })
        );
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", paddingBottom: 30 }}
      >
        {image &&
          image.length > 0 &&
          image.map((item) => {
            return <Card item={item} />;
          })}
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#2BB789",
  },
};

export default UmpireGallery;

const styles = StyleSheet.create({
  //card
  gridView: {
    marginTop: 300,
    flex: 1,
  },

  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 20,
    padding: 10,
    height: 170,
  },

  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },

  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },

  //curve
  curve: {
    backgroundColor: "lightyellow",
    flex: 1,
    borderTopLeftRadius: sizes.m50,
    borderTopRightRadius: sizes.m50,
    marginTop: 80,
    // justifyContent: "space-between",
    alignItems: "center",
  },

  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },

  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
