import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { windowWidth } from "../../config/dimensions";
import Feather from "react-native-vector-icons/Feather";

import images from "../../config/images";
import * as ImagePicker from "expo-image-picker";
import Entypo from "react-native-vector-icons/Entypo";
import { apiActiveURL, imageURL } from "../../ApiBaseURL";
import axios from "axios";
import { useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import FormData from "form-data";
import CustomToast from "../../components/formComponents/CustomToast";
import Toast from "react-native-root-toast";
import { useFocusEffect } from "@react-navigation/native";

const Gallery = () => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  const cardItems = [
    {
      image: images.UmpireAndReferee,
    },
    {
      image: images.Teams,
    },
    {
      image: images.Scorer,
    },
    {
      image: images.Scorer,
    },
    {
      image: images.Scorer,
    },
    {
      image: images.Scorer,
    },
    {
      image: images.Scorer,
    },
    {
      image: images.Scorer,
    },
    {
      image: images.Scorer,
    },
  ];

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
    // console.log(typeof test);
    // image.length = 0;
    if (!result?.cancelled) {
      uploadImages(result.selected);
      setImage([...image, ...result.selected]);
    }
  };

  const uploadImages = async (images) => {
    const formData = new FormData();
    formData.append("title", "hello");
    formData.append("description", "test");
    images.map(async (img) => {
      console.log(img.uri, "IMAGE URI");
      const image1Info = await FileSystem.getInfoAsync(img.uri);
      formData.append("images[]", {
        uri: img.uri,
        name: image1Info.uri.split("/").pop(),
        type: "image/png", // Adjust the type accordingly
      });
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}add-Player-Gallery`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
      data: formData,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      if (response.data.message == "The images field is required.") {
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
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userLoginSuccess);
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
        console.log(JSON.stringify(response.data));
        const team = response?.data?.teams?.filter(
          (team) => team.id == userLoginSuccess.data.team_id
        );
        team[0].images?.map((img) => {
          image.push({ uri: `${imageURL}${img.profile_img}` });
        });
        setImage([...image]);
        console.log(team[0].images, "TEAM IMAGES");
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

  useFocusEffect(
    useCallback(() => {
      getuserGallery();
    }, [])
  );
  return (
    <View>
      <CustomToast show={toast.show} message={toast.message} />

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
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {console.log(image, "image")}
          {image &&
            image?.length > 0 &&
            image?.map((c, index) => {
              return (
                <>
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                      resizeMode: "cover",
                      borderRadius: 10,
                      margin: 10,
                    }}
                    source={{ uri: c.uri }}
                  />
                  <Entypo
                    name={"squared-cross"}
                    size={25}
                    color="red"
                    style={{ marginLeft: -22, marginTop: -3 }}
                    onPress={() => {
                      image.splice(index, 1);
                      setImage([...image]);
                    }}
                  />
                </>
              );
            })}
        </View>
        {/* <FlatList
          data={image}
          contentContainerStyle={{
            // alignItems: "flex-start",
            // flexWrap: "wrap",
            flex: 1,
          }}
          // style={{ flexWrap: "wrap", flexDirection: "row" }}
          horizontal
          renderItem={({ item }) => {
            console.log(item, "item");
            return (
              <Image
                style={{
                  height: 70,
                  width: 70,
                  resizeMode: "cover",
                  borderRadius: 10,
                  margin: 10,
                }}
                source={{ uri: item.uri }}
              />
            );
          }}
        /> */}
      </View>
    </View>
  );
};

export default Gallery;
