import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import React from "react";

import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { windowHeight, windowWidth } from "../../config/dimensions";

const curve_height = windowHeight * 0.10;

const Marketplace = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <StatusBar barStyle="light-content" /> */}
      <View>
        <StatusBar barStyle="dark-content" />
        <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
          <View style={{ height: curve_height }}>

            
          </View>
        </LinearGradient>

        <View
          style={{
            marginTop: -25,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
            <View>

            </View>
          </View>
      </View>
    </ScrollView>
  );
};

export default Marketplace;
