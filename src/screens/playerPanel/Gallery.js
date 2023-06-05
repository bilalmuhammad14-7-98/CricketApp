import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { windowWidth } from "../../config/dimensions";
import Feather from "react-native-vector-icons/Feather";

import images from "../../config/images";
import * as ImagePicker from "expo-image-picker";
import Entypo from "react-native-vector-icons/Entypo";
import { apiActiveURL, imageURL, SCREEN_HEIGHT } from "../../ApiBaseURL";
import axios from "axios";
import { useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import FormData from "form-data";
import CustomToast from "../../components/formComponents/CustomToast";
import Toast from "react-native-root-toast";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../../config/colors";
import ImageView from "react-native-image-viewing";
const Gallery = () => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });

  const [image, setImage] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });
    // const test = [1, 2, 3];
    // image.length = 0;
    if (!result?.cancelled) {
      if (result?.selected) {
        uploadImages(result.selected);
        if (image.length > 0) {
          setImage([...image, ...result.selected]);
        } else {
          setImage([...result.selected]);
        }
      } else {
        const temp = [];
        temp.push({ uri: result.uri });
        uploadImages(temp);
        if (image.length > 0) {
          setImage([...image, ...temp]);
        } else {
          setImage([...temp]);
        }
      }
    }
  };

  const uploadImages = async (images) => {
    const data = new FormData();
    data.append("title", "hello");
    data.append("description", "test");

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

    const config = {
      method: "post",
      url: `${apiActiveURL}add-Player-Gallery`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
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
        }
      })
      .catch((error) => {
        Toast.show(error.message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          textColor: "#FFFFFF",
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          position: 80,
          backgroundColor: "#FF033E",
          style: {
            height: 100,
            padding: 30,
            borderRadius: 10,
            paddingLeft: 45,
            paddingRight: 15,
          },
        });
      });
  };

  const getuserGallery = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-Player-Gallery`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response?.data?.teams, "response?.data?.teams");
        response?.data?.teams?.map((team) => {
          team.images?.map((img) => {
            image.push({ uri: `${imageURL}${img.profile_img}`, id: img.id });
          });
        });
        setImage([...image]);
      })
      .catch((error) => {
        Toast.show(error.message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          textColor: "#FFFFFF",
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          position: 80,
          backgroundColor: "#FF033E",
          style: {
            height: 100,
            padding: 30,
            borderRadius: 10,
            paddingLeft: 45,
            paddingRight: 15,
          },
        });
      });
  };
  useEffect(() => {
    setTimeout(function hideToast() {
      setToast({ ...toast, show: false, message: "" });
    }, 500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getuserGallery();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this image?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "yes",
          onPress: async () => {
            deleteGallery(id);
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
  };
  const deleteGallery = (id) => {
    let data = new FormData();
    console.log(id, "ID");
    data.append("player_gallery_id", id);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}delete-Player-Gallery`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          const index = image.findIndex((i) => i.id === id);
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
  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <View>
      <CustomToast show={toast.show} message={toast.message} />
      <ImageView
        images={image}
        imageIndex={index}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={{}}>Attach photos</Text>
        <TouchableOpacity
          style={{
            // width: windowWidth * 0.5,
            backgroundColor: "#FFF",
            height: 40,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
            flexDirection: "row",
          }}
          onPress={pickImage}
        >
          <Feather style={{ fontSize: 20 }} name="camera" />
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
            Upload Images
          </Text>
        </TouchableOpacity>
        <View style={{ height: SCREEN_HEIGHT - 200 }}>
          {image && image.length > 0 && (
            <FlatList
              data={image}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
              }}
              renderItem={({ item, index }) => {
                console.log(item);
                return (
                  <Pressable
                    onPress={() => {
                      setIndex(index);
                      setIsVisible(true);
                    }}
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
                      onPress={() => handleDelete(item.id)}
                    />
                  </Pressable>
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Gallery;
