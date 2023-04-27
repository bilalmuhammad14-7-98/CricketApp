import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";

//icons import
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
} from "react-native-vector-icons";

// imports
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Asset } from "expo-asset";

//import
import Dateinput from "../../components/formComponents/Dateinput";
import CustomButton from "../../components/formComponents/CustomButton";
import CustomFormInput from "../../components/formComponents/CustomFormInput";
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import FloatingLabelInput from "../../components/formComponents/FloatingLabelInput";
import CustomDropDown from "../../components/formComponents/CustomDropDown";
import axios from "axios";
import { http } from "../../components/http/http";
import { profileContext } from "../../components/context/context";
import {
  data_battingStyle,
  data_bowlingStyle,
  data_gender,
  data_playingRole,
} from "../../config/data";
import { callApi } from "../../services";
import { methodType } from "../../config/methodType";
import { searchPlayer } from "../../services/playerService";

const CARD_WIDTH = windowWidth * 0.05;
const CARD_HEIGHT = windowHeight * 0.23;
const curve_height = windowHeight * 0.15;
const IMAGE_SIZE = windowHeight * 0.13;
const IMAGE_SIZE1 = windowHeight * 0.025;
const LOGO_SIZE = windowHeight * 0.15;

const EditProfile = (route) => {
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const { profile } = useContext(profileContext);
  const [picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);

  const [model, setModel] = useState({
    PlayingRole: "",
    BattingStyle: "",
    BowlingStyle: "",
    Name: "",
    Age: "",
  });

  const handleUpdate = async () => {
    console.log(profile.payLoad.token);
    try {
      console.log("model: ", model);
      var response = callApi(
        `api/player/addEditProfile`,
        methodType.POST,
        model
      );
      console.log(response);
      alert("Successful");
      return;
    } catch (error) {
      console.log(err);
      alert("Error", error.message);
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "fyp_TeamRecruiter");
    data.append("cloud_name", "hashir561");

    fetch("https://api.cloudinary.com/v1_1/hashir561/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

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
      if (!data.canceled) {
        let newfile = {
          uri: data.assets.uri,
          type: `test/${data.assets.uri.split(".")[1]}`,
          name: `test.${data.assets.split(".")[1]}`,
        };

        handleUpload(newfile);
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
      if (!data.canceled) {
        let newfile = {
          uri: data.assets.uri,
          type: `test/${data.assets.uri.split(".")[1]}`,
          name: `test.${data.assets.split(".")[1]}`,
        };

        handleUpload(newfile);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const fetchPlayerProfile = async () => {
    try {
      var res = await searchPlayer();
      var payLoad = res.payLoad;
      console.log(res);
      if (!res.isOk) {
        alert(payLoad.message);
        return;
      }

      setModel({
        ...model,
        PlayingRole: payLoad.PlayingRole,
        BowlingStyle: payLoad.BowlingStyle,
        BattingStyle: payLoad.BattingStyle,
        Name: payLoad.User.name,
        Age: payLoad.User.age,
      });

      console.log("fetchPlayerProfile: ", res);
    } catch (error) {
      console.log(error);
    }
  };

  const init = async () => {
    await fetchPlayerProfile();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, marginBottom: sizes.bottomTabHeight + 1 }}>
        <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
          <View style={{ height: curve_height }}></View>
        </LinearGradient>
        <View
          style={{
            marginTop: sizes.m35 * -1,
            backgroundColor: colors.white,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            flex: 1,
          }}
        >
          <View style={styles.profile}>
            <Avatar.Image
              size={LOGO_SIZE}
              // onPress={() => props.navigation.navigate("Profile")}
              source={images.logo}
              style={{
                marginTop: LOGO_SIZE * 0.5 * -1,
                // borderColor: colors.primary,
                // borderWidth: 5
              }}
            />
            <Text
              style={styles.image_text}
              mode="contained"
              theme={theme}
              onPress={() => setModal(true)}
            >
              Upload Image
            </Text>

            {/* <Button
                style={styles.inputStyle}
                icon={picture == "" ? "upload" : "check"}
                mode="contained"
                theme={theme}
                onPress={() => setModal(true)}
              >
                Upload Image
              </Button> */}

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

          <View style={{ flex: 1, padding: sizes.m10 }}>
            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, Name: val })}
              value={model.Name}
              placeholderText="Name"
            />

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, Age: val })}
              value={model.Age}
              placeholderText="Age"
            />

            <View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: "#2BB789",
                  fontSize: sizes.h3,
                }}
              >
                Playing Role
              </Text>
              <CustomDropDown
                data={data_playingRole}
                value={model.PlayingRole}
                onChange={(val) => {
                  setModel({ ...model, PlayingRole: val.value });
                }}
              />
            </View>

            <View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: "#2BB789",
                  fontSize: sizes.h3,
                }}
              >
                Batting Style
              </Text>
              <CustomDropDown
                data={data_battingStyle}
                value={model.BattingStyle}
                onChange={(val) => {
                  setModel({ ...model, BattingStyle: val.value });
                }}
              />
            </View>

            <View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: "#2BB789",
                  fontSize: sizes.h3,
                }}
              >
                Bowling Style
              </Text>
              <CustomDropDown
                data={data_bowlingStyle}
                value={model.BowlingStyle}
                onChange={(val) => {
                  setModel({ ...model, BowlingStyle: val.value });
                }}
              />
            </View>

            {/* <View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: "#2BB789",
                  fontSize: sizes.h3,
                }}
              >
                Gender
              </Text>
              <CustomDropDown data={data_gender} />
            </View> */}

            <TouchableOpacity>
              <CustomButton
                textColor="white"
                btnLabel="Update"
                Press={handleUpdate}
              />
            </TouchableOpacity>
            {/* <Dateinput /> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const theme = {
  colors: {
    primary: "#2BB789",
  },
};

export default EditProfile;

const styles = StyleSheet.create({
  logo: {
    // marginLeft: CARD_WIDTH,
    marginLeft: CARD_WIDTH,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // paddingRight: sizes.m10,
    // position: 'absolute',
  },

  profile: {
    // flexDirection: "row",
    // backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: sizes.m15,
    // paddingTop: 3,
    // flex: 1,
  },

  image_text: {
    alignSelf: "center",
    paddingTop: sizes.m8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#2BB789",
  },

  input: {
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },

  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
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
