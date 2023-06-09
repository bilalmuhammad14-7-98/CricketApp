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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
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
import { useDispatch, useSelector } from "react-redux";
import { Days } from "../../util";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { useCallback } from "react";
import withToast from "../../components/Toast";
import { showSnackBar } from "../../store/actions";

const CARD_WIDTH = windowWidth * 0.05;
const CARD_HEIGHT = windowHeight * 0.23;
const curve_height = windowHeight * 0.15;
const IMAGE_SIZE = windowHeight * 0.13;
const IMAGE_SIZE1 = windowHeight * 0.025;
const LOGO_SIZE = windowHeight * 0.15;

const EditProfile = (props) => {
  console.log(props, "props");
  const { params } = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  const { colors } = useTheme();
  const [image, setImage] = useState(params?.item?.profileImg);
  const [imageName, setImageName] = useState();
  const [imgObj, setImgObj] = useState(null);

  const [data, setData] = useState([]);
  const { profile } = useContext(profileContext);
  const [picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const { route } = props;
  const { item } = params;
  const [userData, setUserData] = useState();

  const [selectedGender, setSelectedGender] = useState(
    item?.gender == "male"
      ? { label: "male", value: "1" }
      : item?.gender == "female"
      ? { label: "female", value: "2" }
      : ""
  );

  const [selectedBattingStyle, setSelectedBattingStyle] = useState(
    item?.player[0]?.batting_style_id == "left hand"
      ? { value: 1, label: "left hand" }
      : item?.player[0]?.batting_style_id == "right hand"
      ? { value: 2, label: "right hand" }
      : ""
  );
  const [battingStyle, setBattingStyle] = useState([]);

  const [selectedPlayingRole, setSelectedPlayingRole] = useState(
    item?.player[0]?.playing_role_id == "opener"
      ? { value: 1, label: "opener" }
      : item?.player[0]?.playing_role_id == "middle batsman"
      ? { value: 2, label: "middle batsman" }
      : item?.player[0]?.playing_role_id == "tail ender"
      ? { value: 3, label: "tail ender" }
      : item?.player[0]?.playing_role_id == "wicket keeper"
      ? { value: 4, label: "wicket keeper" }
      : ""
  );
  const [playingRole, setPlayingRole] = useState([]);

  const [selectedBowlingStyle, setSelectedBowlingStyle] = useState(
    item?.player[0]?.bowling_style_id == "right arm fast"
      ? { value: 1, label: "right arm fast" }
      : item?.player[0]?.bowling_style_id == "right arm off spin"
      ? { value: 2, label: "right arm off spin" }
      : item?.player[0]?.bowling_style_id == "right arm leg spin"
      ? { value: 3, label: "right arm leg spin" }
      : item?.player[0]?.bowling_style_id == "left arm fast"
      ? { value: 4, label: "left arm fast" }
      : item?.player[0]?.bowling_style_id == "left arm off spin"
      ? { value: 5, label: "left arm off spin" }
      : item?.player[0]?.bowling_style_id == "left arm leg spin"
      ? { value: 6, label: "left arm leg spin" }
      : ""
  );
  const [bowlingStyle, setBowlingStyle] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(
    item?.countryName == "pakistan" ? { value: 1, label: "pakistan" } : ""
  );
  const [country, setCountry] = useState([]);

  const [selectedCity, setSelectedCity] = useState(
    item?.cityName == "karachi" ? { value: 1, label: "karachi" } : ""
  );
  const [cities, setCities] = useState([]);

  const [model, setModel] = useState({
    firstName: item ? item?.first_name : "",
    lastName: item ? item?.last_name : "",
    middleName: item ? item?.middle_name : "",
    address: item ? item?.address : "",
    dob: item ? item?.dob : "",
    total_runs: item ? item?.player[0]?.total_runs : "",
    total_overs: item ? item?.player[0]?.total_overs : "",
    total_wickets: item ? item?.player[0]?.total_wickets : "",
    total_matches: item ? item?.player[0]?.total_matches : "",
    player_ratings: item ? item?.player[0]?.player_ratings : "",
    password: "",
    phone: item ? item?.phone : "",
    fees: item ? item?.fees : "",
    description: item ? item?.description : "",
  });

  const getUserData = async () => {
    // console.log(userLoginSuccess.token, "teams");
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}user/profile`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.data, "get user data response");
        setUserData(response.data.data);
      })
      .catch(function (error) {
        // console.log(error, "error");
      });
  };

  const onDaySelect = (selectedItems) => {
    setSelectedDays(selectedItems);
  };

  const handleUpdate = async () => {
    // console.log(model, "Update button pressed");
    let updateData = {
      model,
      gender: selectedGender,
      battingStyle: selectedBattingStyle,
      playingRole: selectedPlayingRole,
      bowlingStyle: selectedBowlingStyle,
      country: selectedCountry,
      city: selectedCity,
    };

    console.log("firstName", model?.firstName ? model.firstName : "");
    console.log("address", model?.address ? model?.address : "");
    console.log("gender", selectedGender ? selectedGender?.label : "");
    console.log("profile_img", imgObj ? imgObj : "");
    console.log("banner", "");
    console.log("dob", model?.dob ? model?.dob : "");
    console.log(
      "batting_style_id",
      selectedBattingStyle?.value ? selectedBattingStyle?.value : ""
    );
    console.log("total_runs", model?.total_runs ? model?.total_runs : "");
    console.log("total_overs", model.total_overs ? model.total_overs : "");
    console.log(
      "total_wickets",
      model?.total_wickets ? model?.total_wickets : ""
    );
    console.log(
      "total_matches",
      model?.total_matches ? model?.total_matches : ""
    );
    console.log(
      "player_ratings",
      model?.player_ratings ? model?.player_ratings : ""
    );
    console.log("password", model?.password ? model?.password : "");
    console.log(
      "bowling_style_id",
      selectedBowlingStyle?.value ? selectedBowlingStyle?.value : ""
    );
    console.log(
      "playing_role_id",
      selectedPlayingRole?.value ? selectedPlayingRole?.value : ""
    );

    console.log("phone", model?.phone ? model?.phone : "");
    console.log("city", selectedCity?.value ? selectedCity?.value : "");
    console.log(
      "country",
      selectedCountry?.value ? selectedCountry?.value : ""
    );
    console.log("fees", model?.fees ? model?.fees : "");
    console.log("description", model?.description ? model?.description : "");
    console.log(
      "available_days",
      selectedDays && selectedDays?.length > 0
        ? JSON.stringify(selectedDays)
        : []
    );
    // Consoles all
    var data = new FormData();
    data.append("firstName", model?.firstName ? model.firstName : "");
    data.append("address", model?.address ? model?.address : "");
    data.append("gender", selectedGender ? selectedGender?.label : "");
    data.append("profile_img", imgObj ? imgObj : "");
    data.append("banner", "");
    data.append("dob", model?.dob ? model?.dob : "");
    data.append(
      "batting_style_id",
      selectedBattingStyle?.value ? selectedBattingStyle?.value : ""
    );
    data.append("total_runs", model?.total_runs ? model?.total_runs : "");
    data.append("total_overs", model.total_overs ? model.total_overs : "");
    data.append(
      "total_wickets",
      model?.total_wickets ? model?.total_wickets : ""
    );
    data.append(
      "total_matches",
      model?.total_matches ? model?.total_matches : ""
    );
    data.append(
      "player_ratings",
      model?.player_ratings ? model?.player_ratings : ""
    );
    data.append("password", model?.password ? model?.password : "");
    data.append(
      "bowling_style_id",
      selectedBowlingStyle?.value ? selectedBowlingStyle?.value : ""
    );
    data.append(
      "playing_role_id",
      selectedPlayingRole?.value ? selectedPlayingRole?.value : ""
    );

    data.append("phone", model?.phone ? model?.phone : "");
    data.append("city", selectedCity?.value ? selectedCity?.value : "");
    data.append(
      "country",
      selectedCountry?.value ? selectedCountry?.value : ""
    );
    data.append("fees", model?.fees ? model?.fees : "");
    data.append("description", model?.description ? model?.description : "");
    data.append(
      "available_days",
      selectedDays && selectedDays?.length > 0
        ? JSON.stringify(selectedDays)
        : []
    );

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}user/updateProfile`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    console.log(config, "config");

    await axios(config)
      .then(function (response) {
        if (response.data.success) {
          dispatch(
            showSnackBar({
              visible: true,
              text: response.data.message,
              error: false,
            })
          );
          navigation.navigate("UserProfile");
        } else {
          dispatch(
            showSnackBar({
              visible: true,
              text: response.data.message,
              error: true,
            })
          );
        }
        // listTeams();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const listBattingStyle = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-bating-style`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.batting, "batting style response");
        setBattingStyle(response.data.batting);
        // setCountry(response.data.countries);
      })
      .catch(function (error) {});
  };

  const listPlayingRole = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-playing-role`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.batting, "playing role response");
        setPlayingRole(response.data.batting);
        // setCountry(response.data.countries);
      })
      .catch(function (error) {});
  };

  const listBowlingStyle = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-bowling-style`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.batting, "bowling style response");
        setBowlingStyle(response.data.batting);
        // setCountry(response.data.countries);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        console.log("hello");
        // alert("Login Successfully !!!");
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          Alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setModal(false);
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

  const pickFromCamera = async () => {};

  // const fetchPlayerProfile = async () => {
  //   try {
  //     var res = await searchPlayer();
  //     var payLoad = res.payLoad;
  //     console.log(res);
  //     if (!res.isOk) {
  //       alert(payLoad.message);
  //       return;
  //     }

  //     setModel({
  //       ...model,
  //       PlayingRole: payLoad.PlayingRole,
  //       BowlingStyle: payLoad.BowlingStyle,
  //       BattingStyle: payLoad.BattingStyle,
  //       Name: payLoad.User.name,
  //       Age: payLoad.User.age,
  //     });

  //     console.log("fetchPlayerProfile: ", res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const init = async () => {
  //   await fetchPlayerProfile();
  // };

  useEffect(() => {
    getUserData();
    listBattingStyle();
    listPlayingRole();
    listBowlingStyle();
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

  useFocusEffect(
    useCallback(() => {
      if (item) {
        const splittedDays = item?.available_days?.split(",");
        const temp = [];
        Days.map((d) => {
          if (
            splittedDays.some((s) => s.toLowerCase() == d.name.toLowerCase())
          ) {
            temp.push(d.id);
          }
        });
        setSelectedDays(temp);
      }
    }, [userLoginSuccess])
  );

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
            {/* {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )} */}

            <Avatar.Image
              size={LOGO_SIZE}
              // onPress={() => navigation.navigate("Profile")}
              // source={{ uri: image ? image : null }}
              source={image ? { uri: image } : images.FypLogo}
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
                  {/* <Button
                    icon="camera"
                    theme={theme}
                    mode="contained"
                    onPress={() => pickFromCamera()}
                  >
                    Camera
                  </Button> */}
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
              onChangeText={(val) => setModel({ ...model, firstName: val })}
              value={model.firstName}
              placeholderText="First Name"
            />

            {/* <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, lastName: val })}
              value={model.lastName}
              placeholderText="Last Name"
            />

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, middleName: val })}
              value={model.middleName}
              placeholderText="Middle Name"
            /> */}

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, address: val })}
              value={model.address}
              placeholderText="Address"
            />

            <View style={{ paddingVertical: 5 }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: "#2BB789",
                  fontSize: sizes.h3,
                }}
              >
                Gender
              </Text>
              <CustomDropDown
                value={selectedGender}
                onChange={(text) => setSelectedGender(text)}
                data={data_gender}
              />
            </View>

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, dob: val })}
              value={model.dob}
              placeholderText="Age"
              keyboardType="number-pad"
            />

            {userLoginSuccess?.data?.roleId == "recruiter" ||
            userLoginSuccess?.data?.roleId == "umpire" ? null : (
              <>
                <CustomFormInput
                  // autoComplete="name"
                  onChangeText={(val) =>
                    setModel({ ...model, total_runs: val })
                  }
                  value={model.total_runs}
                  placeholderText="Total Runs"
                />

                <CustomFormInput
                  // autoComplete="name"
                  onChangeText={(val) =>
                    setModel({ ...model, total_overs: val })
                  }
                  value={model.total_overs}
                  placeholderText="Total Overs"
                />

                <CustomFormInput
                  // autoComplete="name"
                  onChangeText={(val) =>
                    setModel({ ...model, total_wickets: val })
                  }
                  value={model.total_wickets}
                  placeholderText="Total Wickets"
                />

                <CustomFormInput
                  // autoComplete="name"
                  onChangeText={(val) =>
                    setModel({ ...model, total_matches: val })
                  }
                  value={model.total_matches}
                  placeholderText="Total Matches"
                />

                <CustomFormInput
                  // autoComplete="name"
                  onChangeText={(val) =>
                    setModel({ ...model, player_ratings: val })
                  }
                  value={model.player_ratings}
                  placeholderText="Player Ratings"
                />
              </>
            )}

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, password: val })}
              value={model.password}
              placeholderText="Password"
              secureTextEntry={true}
            />

            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, phone: val })}
              value={model.phone}
              placeholderText="Phone"
            />

            {userLoginSuccess?.data?.roleId == "umpire" && (
              <>
                <CustomFormInput
                  // autoComplete="name"
                  onChangeText={(val) => setModel({ ...model, fees: val })}
                  value={model.fees}
                  placeholderText="Fees"
                  keyboardType="number-pad"
                />

                <CustomFormInput
                  // autoComplete="name"
                  onChangeText={(val) =>
                    setModel({ ...model, description: val })
                  }
                  value={model.description}
                  placeholderText="Description"
                />

                <View>
                  <SectionedMultiSelect
                    items={Days}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    selectText="Choose availible days"
                    showDropDowns={true}
                    onSelectedItemsChange={onDaySelect}
                    selectedItems={selectedDays}
                  />
                </View>
              </>
            )}
            <View style={{ marginTop: 10 }}>
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

            {userLoginSuccess?.data?.roleId == "recruiter" ||
            userLoginSuccess?.data?.roleId == "umpire" ? null : (
              <>
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
                    value={selectedBattingStyle}
                    onChange={(text) => setSelectedBattingStyle(text)}
                    data={battingStyle}
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
                    Playing Role
                  </Text>
                  <CustomDropDown
                    value={selectedPlayingRole}
                    onChange={(text) => setSelectedPlayingRole(text)}
                    data={playingRole}
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
                    value={selectedBowlingStyle}
                    onChange={(text) => setSelectedBowlingStyle(text)}
                    data={bowlingStyle}
                  />
                </View>
              </>
            )}

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

export default withToast(EditProfile);

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
