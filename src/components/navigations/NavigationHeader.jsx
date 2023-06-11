import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { windowWidth } from "../../config/dimensions";
import { sizes } from "../../config/sizes";
import icons from "../../config/icons";
import { useNavigation } from "@react-navigation/native";

const upper_margin = windowWidth * 0.001;

const NavigationHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 33,
              height: 33,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              backgroundColor: "#2BB789",
              opacity: 0.6,
              marginLeft: upper_margin,
            }}
            onPress={() => navigation.goBack()}
          >
            {icons.backIcon()}
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              marginLeft: sizes.m8,
              fontWeight: "bold",
              color: "#2BB789",
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
