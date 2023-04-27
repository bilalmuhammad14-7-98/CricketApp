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
  Modal
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
import { useTheme } from "@react-navigation/native";
import PlayerGalleryButton from "../formComponents/PlayerGalleryButton";
import { Button } from "react-native-paper";


const CARD_WIDTH = windowWidth * 0.46;
const CARD_HEIGHT = windowHeight * 0.22;

const Card = ({ item }) => {
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
      }}>
      
      <View
        style={{
          alignItems: "center",
          paddingTop: 45, // width: CARD_WIDTH, // height: CARD_HEIGHT * 0.20,
        }}
      >
        <Text
          style={{
            fontSize: sizes.h4,
            color: item.code,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          {item.name}
        </Text>
      </View>
    </View>
  );
};

const PlayerGallery = () => {
  const { colors } = useTheme();
  const [modal, setModal] = useState(false);

  const cardItems = [
    {
    //   name: "Matches",
      code: "black",
      //   image: images.cricketerAndfootballer,
    },
    {
    //   name: "Innings",
      code: 'black',
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

  const pickFromGallery = async () => {
    // Ask the user for the permission to access the media library
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if(!data.canceled){
        let newfile = {
          uri:data.assets.uri, 
          type:`test/${data.assets.uri.split(".")[1]}`,
          name:`test.${data.assets.split(".")[1]}`
        }
        
        handleUpload(newfile)
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const pickFromCamera = async () => {
    // Ask the user for the permission to access the camera
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if(!data.canceled){
        let newfile = {
          uri:data.assets.uri, 
          type:`test/${data.assets.uri.split(".")[1]}`,
          name:`test.${data.assets.split(".")[1]}`
        }
        
        handleUpload(newfile)
      }
      
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };


  return (
    <View style={{ flex: 1 }}>
    <View style ={{alignSelf:"center", marginTop:sizes.m5}}>
    <PlayerGalleryButton
              textColor="white"
              btnLabel="Upload Photo"
              Press={() => setModal(true)}
              myStyle={{
                alignSelf: "flex-end",
              }}
            />

<Modal
                //  animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                  setModal(false);
                }}
              >
                <View style={styles.modalView}>
                  <View style={styles.modalButtonView}>
                    <Button
                      icon="camera"
                      theme={theme}
                      mode="contained"
                      onPress={() => pickFromCamera()}
                    >
                      Camera
                    </Button>
                    <Button
                      icon="image-area"
                      mode="contained"
                      theme={theme}
                      onPress={() => pickFromGallery()}
                    >
                      Gallery
                    </Button>
                  </View>
                  <Button theme={theme} onPress={() => setModal(false)}>
                    Cancel
                  </Button>
                </View>
              </Modal>
    </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {cardItems.map((item) => {
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

export default PlayerGallery;

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
