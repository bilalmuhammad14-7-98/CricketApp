import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { windowWidth } from "../../config/dimensions";
import Feather from "react-native-vector-icons/Feather";

import images from "../../config/images";

const Gallery = () => {
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
  return (
    <View>
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
          // onPress={() => openImage()}
        >
          <Feather style={{ fontSize: 20 }} name="camera" />
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
            Upload Images
          </Text>
        </TouchableOpacity>
        <FlatList
          data={cardItems}
          contentContainerStyle={{
            // alignItems: "flex-start",
            flexWrap: "wrap",
            flex: 1,
          }}
          // style={{ flexWrap: "wrap", flexDirection: "row" }}
          horizontal
          renderItem={({ item }) => {
            return (
              <Image
                style={{
                  height: 70,
                  width: 70,
                  resizeMode: "cover",
                  borderRadius: 10,
                  margin: 10,
                }}
                source={require("../../../assets/Images/ronaldo.jpg")}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Gallery;
