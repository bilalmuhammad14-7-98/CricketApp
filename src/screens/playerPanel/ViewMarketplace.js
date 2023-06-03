import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { windowWidth } from "../../config/dimensions";
import Feather from "react-native-vector-icons/Feather";

import images from "../../config/images";
import { apiActiveURL } from "../../ApiBaseURL";
import axios from "axios";
import { useSelector } from "react-redux";
import { colors } from "../../config/colors";
import { useIsFocused } from "@react-navigation/native";

const ViewMarketplace = (props) => {
  console.log(props.route, "marketplace property changed");
  const [marketplace, setMarketplace] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loader, setLoader] = useState(true);
  const isFocused = useIsFocused();

  const userLoginSuccess = useSelector((state) => {
    // console.log(state, "state");
    console.log(state.loginData.data, "login data success");
    return state.loginData.data;
  });

  useEffect(() => {
    if (isFocused) {
      showMarketplace();
    }
  }, [isFocused]);
  const showMarketplace = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        props.route.params.type == "my-post"
          ? `${apiActiveURL}list-my-post`
          : `${apiActiveURL}list-all-post`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data, "get market response");
        setMarketplace(response?.data?.teams);
        // handleData();
        setLoader(false);

        // setTeams(response.data.teams);
      })
      .catch(function (error) {
        setLoader(false);

        console.log(error, "error");
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={{ width: "90%", alignSelf: "center" }}>
          {!loader ? (
            marketplace.length > 0 ? (
              <FlatList
                data={marketplace}
                // extraData={imageData}
                contentContainerStyle={{
                  // alignItems: "flex-start",
                  flexWrap: "wrap",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // style={{
                //   justifyContent: "center",
                //   alignItems: "center",
                // }}
                horizontal
                // numColumns={2}
                // numRows={2}
                renderItem={({ item }) => {
                  console.log(item, "====");
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#fff",
                        margin: 10,

                        borderRadius: 10,
                        height: 200,
                        width: 150,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() =>
                        props.navigation.navigate("ViewMarketplaceDetail", {
                          data: item,
                        })
                      }
                    >
                      <Image
                        style={{
                          height: 150,
                          width: 150,
                          resizeMode: "cover",
                          borderRadius: 10,
                        }}
                        source={{
                          uri: `https://cricketapp.gulfresource.org/public/storage/${item.images[0].image_path}`,
                        }}
                      />

                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                          paddingTop: 10,
                        }}
                      >
                        {item.title}
                      </Text>
                      {/* <Text>{item.description}</Text> */}
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>No post found</Text>
              </View>
            )
          ) : (
            //   ) : (
            //     <></>
            //   )
            <ActivityIndicator animating size={30} color={colors.primary} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewMarketplace;
