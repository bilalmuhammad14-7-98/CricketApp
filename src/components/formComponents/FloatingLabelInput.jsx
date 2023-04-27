import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";
import {
  SimpleLineIcons,
  Entypo,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { windowHeight } from "../../config/dimensions";
import { useTheme } from "@react-navigation/native";
import { sizes } from "../../config/sizes";
import { CustomDefaultTheme, colors } from "../../config/colors";

console.log(colors);

export default function FloatingLabelInput({
  label,
  mystyle,
  iconName,
  iconFamily,
  ...rest
}) {
  const _animatedIsFocused = useRef(
    new Animated.Value(rest.value === "" ? 0 : 1)
  ).current;
  const [model, setModel] = useState({
    isFocused: false,
  });
  // console.log(windowWidth)
  const labelStyle = {
    // fontSize: model.isFocused ? sizes.h4 : sizes.h3,
    // top: model.isFocused ? 0 : 22,
    top: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 22],
    }),
    fontSize: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [sizes.h4, sizes.h3],
    }),
    color: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.primary, colors.gray],
    }),
    // color: model.isFocused ? colors.primary : colors.gray
  };

  const animateLabel = () => {
    Animated.timing(_animatedIsFocused, {
      toValue: model.isFocused || rest.value ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const renderIcon = () => {
    if (iconFamily == "SimpleLineIcons") {
      return (
        <SimpleLineIcons
          size={sizes.h2}
          name={iconName}
          color={model.isFocused || rest.value ? colors.primary : colors.gray}
          style={{ marginBottom: 10 }}
        />
      );
    } else if (iconFamily == "Entypo") {
      return (
        <Entypo
          size={sizes.h2}
          name={iconName}
          color={model.isFocused || rest.value ? colors.primary : colors.gray}
          style={{ marginBottom: 10 }}
        />
      );
    } else if (iconFamily == "Feather") {
      return (
        <Feather
          size={sizes.h2}
          name={iconName}
          color={model.isFocused || rest.value ? colors.primary : colors.gray}
          style={{ marginBottom: 10 }}
        />
      );
    } else if (iconFamily == "MaterialCommunityIcons") {
      return (
        <Feather
          size={sizes.h2}
          name={iconName}
          color={model.isFocused || rest.value ? colors.primary : colors.gray}
          style={{ marginBottom: 10 }}
        />
      );
    } else if (iconFamily == "AntDesign") {
      return (
        <Feather
          size={sizes.h2}
          name={iconName}
          color={model.isFocused || rest.value ? colors.primary : colors.gray}
          style={{ marginBottom: 10 }}
        />
      );
    }
  };

  useEffect(() => {
    animateLabel();
  }, [model.isFocused]);

  return (
    <View
      style={[
        styles.textFieldWrapper,
        { ...mystyle, borderBottomColor: colors.gray },
      ]}
    >
      <Animated.Text
        style={[
          styles.textFieldLabel,
          labelStyle,
          {
            color: colors.primary,
          },
        ]}
      >
        {label}
      </Animated.Text>
      <View style={styles.textBoxIconWrapper}>
        <TextInput
          style={styles.textBox}
          autoCapitalize="none"
          onFocus={() => setModel({ ...model, isFocused: true })}
          onBlur={() => setModel({ ...model, isFocused: false })}
          {...rest}
        />

        {renderIcon()}

        {/* <SimpleLineIcons
            name="envelope"
            color={model.isFocused ? colors.primary : colors.gray}
            size={20}
          /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textFieldWrapper: {
    borderBottomWidth: 1,
    marginTop: sizes.m10,
    marginBottom: 10,
    // width: windowWidth,
    // width: '45%',
    height: windowHeight / 15,
    // backgroundColor: colors.primary,
    justifyContent: "center",
  },
  textFieldLabel: {
    left: 0,
    // fontFamily: "PoppinsRegular",
    // position: 'absolute'
    // fontSize: sizes.h3
  },
  textBoxIconWrapper: {
    flexDirection: "row",
    width: "100%",
  },
  textBox: {
    flex: 1,
    width: "100%",
    // marginBottom: 15,
    // position: 'absolute'
  },
});
