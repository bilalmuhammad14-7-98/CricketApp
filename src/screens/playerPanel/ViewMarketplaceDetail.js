import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { windowHeight, windowWidth } from "../../config/dimensions";

import images from "../../config/images";
import { apiActiveURL } from "../../ApiBaseURL";
import axios from "axios";
import { useSelector } from "react-redux";
import { colors } from "../../config/colors";
import { useIsFocused } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import { sizes } from "../../config/sizes";
const CARD_WIDTH1 = windowWidth * 0.93;
const CARD_HEIGHT1 = windowWidth * 0.5;
const CARD_WIDTH = windowWidth * 0.44;
const CARD_HEIGHT = windowHeight * 0.23;
const INPUT_WIDTH = CARD_WIDTH1;
const INPUT_HEIGHT = windowHeight * 0.07;
const Search_Bar = windowHeight * 0.06;
const INPUT_HEIGHT1 = windowHeight * 0.07;
const input_width = windowWidth - 40;
const cross_icon = windowHeight * 0.01;
const curve_height = windowHeight * 0.2;
const swiper_height = windowHeight * 0.04;
const ViewMarketplaceDetail = (props) => {
  console.log(props.route.para, "marketplace property detail");
  const [marketplace, setMarketplace] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loader, setLoader] = useState(true);
  const isFocused = useIsFocused();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={{ width: "90%", alignSelf: "center" }}>
          <View style={styles.sliderContainer}>
            <Swiper autoplay activeDotColor="#2BB789">
              <View style={styles.slide}>
                <Image
                  source={require("../../../assets/Images/Scorer.jpg")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>

              <View style={styles.slide}>
                <Image
                  source={require("../../../assets/Images/cricketerAndfootballer.jpg")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>

              <View style={styles.slide}>
                <Image
                  source={require("../../../assets/Images/Scorer.jpg")}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
            </Swiper>
          </View>

          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold" }}>
            {props.route.params.data.title}
          </Text>

          <Text style={{ marginTop: 10, fontSize: 14 }}>
            {props.route.params.data.description}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 14 }}>
            {props.route.params.data.contact}
          </Text>
          {/* <Text>{item.description}</Text> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewMarketplaceDetail;
const styles = StyleSheet.create({
  //card
  // gridView: {
  //   marginTop: 300,
  //   flex: 1,
  // },

  // itemContainer: {
  //   justifyContent: "flex-end",
  //   borderRadius: 20,
  //   padding: 10,
  //   // height: 170,
  // },

  // itemName: {
  //   fontSize: 16,
  //   color: "#fff",
  //   fontWeight: "600",
  // },

  // itemCode: {
  //   fontWeight: "600",
  //   fontSize: 12,
  //   color: "#fff",
  // },

  //slider
  sliderContainer: {
    height: CARD_HEIGHT1,
    width: CARD_WIDTH1,
    marginTop: swiper_height,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: sizes.m20,
  },

  slide: {
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: sizes.m20,
  },

  sliderImage: {
    height: CARD_HEIGHT1,
    width: CARD_WIDTH1,
    alignSelf: "center",
    borderRadius: sizes.m20,
    // backgroundColor: 'yellow'
  },

  //search bar
  // text_input: {
  //   flex: 1,
  //   // position: "absolute",
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginTop: sizes.m10,
  //   flexDirection: "row",
  //   borderWidth: 2,
  //   borderRadius: sizes.m12,
  //   padding: sizes.m10,
  //   borderColor: "#C6C6C6",
  //   width: INPUT_WIDTH,
  //   height: INPUT_HEIGHT,
  //   alignSelf: "center",
  // },

  text_input: {
    marginTop: Search_Bar,
    flexDirection: "row",
    borderRadius: sizes.m8,
    padding: sizes.m10,
    borderColor: "#fff",
    backgroundColor: "#fff",
    width: input_width,
    height: INPUT_HEIGHT1,
    alignSelf: "center",
  },
});