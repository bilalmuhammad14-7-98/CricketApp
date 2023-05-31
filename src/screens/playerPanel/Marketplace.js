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
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import CustomButton from "../../components/formComponents/CustomButton";
import CustomFormInput from "../../components/formComponents/CustomFormInput";
import { Button } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { windowHeight, windowWidth } from "../../config/dimensions";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { sizes } from "../../config/sizes";
import images from "../../config/images";

const CARD_WIDTH = windowWidth * 0.05;
const CARD_HEIGHT = windowHeight * 0.23;
const curve_height = windowHeight * 0.15;
const IMAGE_SIZE = windowHeight * 0.13;
const IMAGE_SIZE1 = windowHeight * 0.025;
const LOGO_SIZE = windowHeight * 0.15;

const Marketplace = () => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState([]);
  const [imageName, setImageName] = useState();
  const [imgObj, setImgObj] = useState(null);

  const [model, setModel] = useState({
    team_name: "",
    title: "",
    description: "",
    contact_info: "",
  });

  const { colors } = useTheme();

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result, "selected images");
    if (!result.canceled) {
      result.selected.forEach((result) => {
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
        console.log(result.uri, "uriiiiiiii");
        let imagesArr = [];
        imagesArr.push(result.uri);
        console.log(imagesArr, "array");
        // setImage((prevItems) => [...prevItems, imagesArr]);
        setImage(imagesArr.push(result.uri));
      });

      console.log(image, "images arr");
    }

    // if (!result.canceled) {
    //   let pathParts = result.uri.split("/");
    //   console.log(pathParts, "path parts");
    //   let typeLength = pathParts[pathParts.length - 1].split(".");
    //   let typeimg = typeLength[1];
    //   console.log(typeimg, "type----------");
    //   const imageObj = {
    //     name: pathParts[pathParts.length - 1],
    //     type: `image/${typeimg}`,
    //     uri: result.uri,
    //   };
    //   setImgObj(imageObj);
    //   console.log(imageObj, "image obj");
    //   console.log(pathParts[pathParts.length - 1].split("."), "name");
    //   setImageName(pathParts[pathParts.length - 1]);
    //   setImage(result.uri);
    // }
  };

  const handleUpdate = () => {
    console.log(image, "images");
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
              // source={{ uri: image ? image : null }}
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
              onChangeText={(val) => setModel({ ...model, contact_info: val })}
              value={model.contact_info}
              placeholderText="Please enter contact info"
            />

            <Button
              style={styles.inputStyle}
              // icon={picture == "" ? "upload" : "check"}
              icon={"upload"}
              mode="contained"
              theme={theme}
              onPress={() => setModal(true)}
            >
              Upload Image
            </Button>

            {/* {image &&
              image.map(
                (image) => console.log(image, "image")(<>bilal</>)

                // <Image
                //   key={image.path}
                //   source={{ uri: image.path }}
                //   style={{ width: 200, height: 200 }}
                // />
              )} */}

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

export default Marketplace;
