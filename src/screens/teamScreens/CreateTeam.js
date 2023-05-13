import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-native-paper";
// import * as ImagePicker from "expo-image-picker";
// import * as ImagePicker from "expo-image-picker";
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
  Platform,
} from "react-native";
import { apiActiveURL } from "../../ApiBaseURL";
import Toast from "react-native-root-toast";
//icons import
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
} from "react-native-vector-icons";
// import * as ImagePicker from "react-native-image-crop-picker";
// import { ImageCropPicker, openPicker } from "react-native-image-crop-picker";
// import { openPicker } from "react-native-image-crop-picker";
// import ImageCropPicker from "react-native-image-crop-picker";

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
import { useSelector } from "react-redux";
const CARD_WIDTH = windowWidth * 0.05;
const CARD_HEIGHT = windowHeight * 0.23;
const curve_height = windowHeight * 0.15;
const IMAGE_SIZE = windowHeight * 0.13;
const IMAGE_SIZE1 = windowHeight * 0.025;
const LOGO_SIZE = windowHeight * 0.15;

const CreateTeam = (props) => {
  console.log(props, "props");
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  const { colors } = useTheme();

  const [modal, setModal] = useState(false);
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState();
  const [imgObj, setImgObj] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState();
  const [country, setCountry] = useState([]);

  const [selectedCity, setSelectedCity] = useState();
  const [cities, setCities] = useState([]);

  const [model, setModel] = useState({
    team_name: "",
    team_reg_no: "",
    team_total_players: "",
    team_total_wins: "",
    team_total_lose: "",
    team_total_overs: "",
    team_total_runs: "",
  });

  useEffect(() => {
    // alert("Login Successfully !!!");
    (async () => {
      if (Platform.OS !== "web") {
        console.log("hello");

        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          Alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    listCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      listCities(selectedCountry);
    } else return;
  }, [selectedCountry]);

  const listCountries = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}get-country`,
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.countries, "country response");
        setCountry(response.data.countries);
      })
      .catch(function (error) {});
  };

  const listCities = async (value) => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}get-city?countryId=${value.value}`,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.cities, "cities response");
        setCities(response.data.cities);
      })
      .catch(function (error) {});
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      let pathParts = result.uri.split("/");
      console.log(pathParts, "path parts");
      let typeLength = pathParts[pathParts.length - 1].split(".");
      let typeimg = typeLength[1];
      console.log(typeimg, "type----------");

      const imageObj = {
        name: pathParts[pathParts.length - 1],
        type: `image/${typeimg}`,
        uri: result.uri,
      };

      setImgObj(imageObj);

      console.log(imageObj, "image obj");
      console.log(pathParts[pathParts.length - 1].split("."), "name");
      setImageName(pathParts[pathParts.length - 1]);
      setImage(result.uri);
    }
  };

  const handleUpdate = async () => {
    // console.log(model, "Update button pressed");
    let updateData = {
      model,
      selectedCity,
      selectedCountry,
    };
    // console.log(updateData, selectedGender.value, image, "dropdown data");
    console.log(updateData, imgObj, "imagesOBJ");

    if (!imgObj) {
      return alert("Please select an image !!!");
    }

    // return;

    var data = new FormData();
    data.append("team_name", model.team_name);
    data.append("team_reg_no", model.team_reg_no);
    data.append("team_logo_path", imgObj !== null ? imgObj : "");
    data.append("country_id", selectedCountry?.value);
    data.append("city_id", selectedCity?.value);
    data.append("team_total_players", model.team_total_players);
    data.append("team_total_wins", model.team_total_wins);
    data.append("team_total_lose", model.team_total_lose);
    data.append("team_total_overs", model.team_total_overs);
    data.append("team_total_runs", model.team_total_runs);

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}create-team`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    console.log(config, "config");

    await axios(config)
      .then(function (response) {
        console.log(response, "create team data response");

        Toast.show(response.data.message, {
          duration: 2000,
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

        props.navigation.goBack();
        // listTeams();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
              source={{ uri: image ? image : null }}
              // source={{ uri: item?.profileImg }}
              // source={{ uri: image }}
              style={{
                marginTop: LOGO_SIZE * 0.5 * -1,
                // borderColor: colors.primary,
                // borderWidth: 5
              }}
            />
            {/* <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200 }}
          /> */}
            <Text
              style={styles.image_text}
              mode="contained"
              theme={theme}
              onPress={() => setModal(true)}
            >
              Upload Image
            </Text>

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
              onChangeText={(val) => setModel({ ...model, team_name: val })}
              value={model.team_name}
              placeholderText="Team Name"
            />

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, team_reg_no: val })}
              value={model.team_reg_no}
              placeholderText="Team Registeration Number"
            />

            <View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: "#2BB789",
                  fontSize: sizes.h3,
                }}
              >
                Country
              </Text>
              <CustomDropDown
                value={selectedCountry}
                onChange={(text) => setSelectedCountry(text)}
                data={country}
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
                City
              </Text>
              <CustomDropDown
                disable={selectedCountry ? false : true}
                value={selectedCity}
                onChange={(text) => setSelectedCity(text)}
                data={cities}
              />
            </View>

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) =>
                setModel({ ...model, team_total_players: val })
              }
              value={model.team_total_players}
              placeholderText="Team Total Players"
            />

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) =>
                setModel({ ...model, team_total_wins: val })
              }
              value={model.team_total_wins}
              placeholderText="Team Total Wins"
            />

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) =>
                setModel({ ...model, team_total_lose: val })
              }
              value={model.team_total_lose}
              placeholderText="Team Total Loose"
            />

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) =>
                setModel({ ...model, team_total_overs: val })
              }
              value={model.team_total_overs}
              placeholderText="Team Total Overs"
            />

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) =>
                setModel({ ...model, team_total_runs: val })
              }
              value={model.team_total_runs}
              placeholderText="Team Total Runs"
            />

            <TouchableOpacity>
              <CustomButton
                textColor="white"
                btnLabel="Update"
                Press={handleUpdate}
              />
            </TouchableOpacity>
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

export default CreateTeam;
