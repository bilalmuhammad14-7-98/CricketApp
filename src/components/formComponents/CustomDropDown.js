import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { color } from "react-native-reanimated";
import { sizes } from "../../config/sizes";
//   import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CustomDropDown(props) {
  const { data, ...rest } = props;
  // console.log("props: ", props);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#2BB789" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select" : "..."}
        // value={value}
        // onSelect={value1 => setSelectedItem(value1)}
        // value1={selectedItem}
        // disable={true}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        // onChange={(item) => {
        //   setValue(item.value);
        //   setIsFocus(false);
        // }}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: sizes.m10,
    color: "#2BB789",
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderBottomWidth: 1.5,
    borderColor: "#B2BEB5",
    // paddingHorizontal: 8,
    padding: sizes.m10,
  },

  placeholderStyle: {
    fontSize: sizes.h3,
  },
  selectedTextStyle: {
    fontSize: sizes.h3,
  },
});
