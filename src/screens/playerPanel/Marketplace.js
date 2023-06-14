import { StatusBar } from "expo-status-bar";
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
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import CustomButton from "../../components/formComponents/CustomButton";
import CustomFormInput from "../../components/formComponents/CustomFormInput";
import { Button } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { windowHeight, windowWidth } from "../../config/dimensions";
import * as ImagePicker from "expo-image-picker";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { sizes } from "../../config/sizes";
import images from "../../config/images";
import axios from "axios";
import { apiActiveURL, imageURL, SCREEN_HEIGHT } from "../../ApiBaseURL";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-root-toast";
import PlayerCustomButtom from "../../components/formComponents/PlayerCustomButtom";
import withToast from "../../components/Toast";
import { showSnackBar } from "../../store/actions";
import { useCallback } from "react";

const CARD_WIDTH = windowWidth * 0.05;
const CARD_HEIGHT = windowHeight * 0.23;
const curve_height = windowHeight * 0.15;
const IMAGE_SIZE = windowHeight * 0.13;
const IMAGE_SIZE1 = windowHeight * 0.025;
const LOGO_SIZE = windowHeight * 0.15;

const Marketplace = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState([]);
  const [loader, setLoader] = useState(false);

  const [imageName, setImageName] = useState();
  const [imgObj, setImgObj] = useState(null);
  const [model, setModel] = useState({
    team_name: "",
    title: "",
    description: "",
    price: "",

    contact_info: "",
  });
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  // useEffect(() => {
  //   Toast.show(",dsaldsadsa", {
  //     duration: 2000,
  //     position: Toast.positions.TOP,
  //     textColor: "#FFFFFF",
  //     shadow: true,
  //     animation: true,
  //     hideOnPress: true,
  //     delay: 0,
  //     position: 80,
  //     backgroundColor: "green",
  //     style: {
  //       height: 100,
  //       padding: 30,
  //       borderRadius: 10,
  //       paddingLeft: 45,
  //       paddingRight: 15,
  //       zIndex:1
  //     },
  //   });
  // }, []);
  const { colors } = useTheme();
  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    setModal(false);
    if (!result?.cancelled) {
      if (result?.selected) {
        // handleUpdate(result.selected);
        setImage([...image, ...result.selected]);
      } else {
        const temp = [];
        temp.push({ uri: result.uri });
        setImage([...image, ...temp]);
      }
    }
  };

  const handleUpdate = (images) => {
    if (!model.title)
      return dispatch(
        showSnackBar({ visible: true, text: "Title is required", error: true })
      );
    if (!model.description)
      return dispatch(
        showSnackBar({
          visible: true,
          text: "Description is required",
          error: true,
        })
      );
    if (!model.price)
      return dispatch(
        showSnackBar({ visible: true, text: "Price is required", error: true })
      );

    if (images.length == 0)
      return dispatch(
        showSnackBar({
          visible: true,
          text: "Select at least one image",
          error: true,
        })
      );
    // return;
    if (images.length > 0 && model.title && model.description && model.price) {
      setLoader(true);
      var data = new FormData();
      data.append("title", model.title);
      data.append("description", model.description);
      data.append("contact_info", "76663647336");
      data.append("price", model.price);
      if (params?.edit) data.append("market_place_id", params.data.id);

      images.forEach((image, index) => {
        const fileParts = image.uri.split(".");
        // Get the last part of the split array, which represents the file extension
        const fileExtension = fileParts[fileParts.length - 1];
        data.append(`images[${index}]`, {
          uri: image.uri,
          name: image.uri.substring(image.uri.lastIndexOf("/") + 1),
          type: `image/${fileExtension}`,
        });
      });
      console.log("ALLL IMAGES IN API OF EDIT", images);
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiActiveURL}${
          params.edit ? "edit-market-place" : "post-market-place"
        }`,
        headers: {
          Authorization: `Bearer ${userLoginSuccess.token}`,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      // return
      axios(config)
        .then(function (response) {
          // if(response.status === 'Posted in market successfully!')
          setLoader(false);

          if (response.data.success) {
            dispatch(
              showSnackBar({
                visible: true,
                text: response.data.message,
                error: false,
              })
            );
            if (params?.edit) return navigation.navigate("ViewMyMarketplace");
            return navigation.goBack();
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
          setLoader(false);
          console.log(error);
        });
    } else {
      setLoader(false);
      dispatch(
        showSnackBar({
          visible: true,
          text: "All fields are required",
          error: true,
        })
      );
    }
  };
  const handleDelete = (uri) => {
    let data = new FormData();
    const index = image.findIndex((i) => i.uri === uri);

    data.append("market_place_id", image[index].id.toString());

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}delete-market-place-image`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.data.success) {
          if (index != -1) {
            image.splice(index, 1);
          }
          setImage([...image]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      if (params?.edit) {
        setModel({
          title: params?.data?.title,
          description: params?.data?.description,
          price: params?.data?.price,
          contact_info: params?.data?.contact,
        });
        const temp = [];
        params?.data?.images?.map((img) => {
          temp.push({ ...img, uri: `${imageURL}${img.image_path}` });
        });
        image.length = 0;
        setImage([...temp]);
      }
    }, [])
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
                    onPress={() =>
                      // {ima}
                      pickFromGallery()
                    }
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
              onChangeText={(val) => setModel({ ...model, title: val })}
              value={model.title}
              placeholderText="Please enter title"
            />
            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, description: val })}
              value={model.description}
              placeholderText="Please enter description"
            />
            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => {
                const regex = /[^a-zA-Z0-9 ]/g;
                const cleanedString = val.replace(regex, "");
                setModel({ ...model, price: cleanedString.trim() });
              }}
              value={model.price}
              placeholderText="Please enter price"
              keyboardType={"numeric"}
            />
            <CustomFormInput
              // autoComplete="name"
              onChangeText={(val) => setModel({ ...model, contact_info: val })}
              value={userLoginSuccess?.data?.phone}
              placeholderText="Please enter contact No"
              editable={false}
            />
            {image && image.length > 0 && (
              <FlatList
                data={image}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                }}
                renderItem={({ item, index }) => {
                  return (
                    <Pressable
                      onPress={() => {}}
                      style={{ flexDirection: "row" }}
                    >
                      <Image
                        key={index}
                        style={{
                          height: 70,
                          width: 70,
                          resizeMode: "cover",
                          borderRadius: 10,
                          margin: 10,
                        }}
                        source={{ uri: item.uri }}
                      />
                      <Entypo
                        name="squared-cross"
                        color="red"
                        size={20}
                        style={{ marginLeft: -20, zIndex: 100 }}
                        onPress={() => handleDelete(item.uri)}
                      />
                    </Pressable>
                  );
                }}
              />
            )}
            <CustomButton
              textColor="white"
              txtStyle={{ fontSize: 16 }}
              btnLabel={"Upload Images"}
              Press={() => setModal(true)}
            />

            <CustomButton
              textColor="white"
              txtStyle={{ fontSize: 16 }}
              btnLabel={
                !loader ? (
                  <>
                    {params?.edit
                      ? "Edit in Marketplace"
                      : "Post in Marketplace"}
                  </>
                ) : (
                  <ActivityIndicator animating size={30} color="#fff" />
                )
              }
              Press={() => handleUpdate(image)}
            />
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

export default withToast(Marketplace);
