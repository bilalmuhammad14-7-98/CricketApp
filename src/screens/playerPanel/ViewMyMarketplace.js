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
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Search from "../../components/PlayerProfile/Search";
import CustomButton from "../../components/formComponents/CustomButton";
import withToast from "../../components/Toast";

const ViewMyMarketplace = (props) => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [marketplace, setMarketplace] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchedBlock, setSearchedBlock] = useState([]);

  const isFocused = useIsFocused();

  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });

  useEffect(() => {
    console.log(params?.type, "params?.type");
    if (isFocused) {
      showMarketplace();
    }
  }, [isFocused, params?.type]);
  const showMarketplace = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}list-my-post`,

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
          <Search
            searchArray={marketplace}
            searchField="title"
            results={(data) => {
              setSearchedBlock([...data]);
            }}
          />

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <CustomButton
              textColor="white"
              btnLabel="Post in Marketplace"
              Press={() => {
                navigation.navigate("MarketPlace");
              }}
              myStyle={{
                // marginTop: 10,
                width: 150,
                alignSelf: "flex-start",
                marginRight: 10,
                // paddingVertical: 15,
                paddingHorizontal: 20,
              }}
              txtStyle={{ fontSize: 12 }}
            />

            <CustomButton
              textColor="white"
              btnLabel="View All Post"
              Press={() => {
                navigation.navigate("ViewMarketplace");
              }}
              myStyle={{
                // marginTop: 10,
                width: 150,
                alignSelf: "flex-end",
                marginRight: 10,
                // paddingVertical: 15,
                paddingHorizontal: 20,
              }}
              txtStyle={{ fontSize: 12 }}
            />
          </View>
          {!loader ? (
            marketplace.length > 0 ? (
              <>
                {searchedBlock[0] == "empty" ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text>No post found</Text>
                  </View>
                ) : (
                  <FlatList
                    data={
                      searchedBlock.length > 0 ? searchedBlock : marketplace
                    }
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      alignItems: "center",
                      paddingBottom: 70,
                    }}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          style={{
                            // backgroundColor: "#fff",
                            margin: 19,

                            borderRadius: 10,
                            height: 200,
                            width: 120,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            navigation.navigate("ViewMarketplaceDetail", {
                              data: item,
                            })
                          }
                        >
                          <Image
                            style={{
                              height: 200,
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
                )}
              </>
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

export default withToast(ViewMyMarketplace);
