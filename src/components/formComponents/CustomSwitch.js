import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';


//IMPORT
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";
import { useTheme } from "@react-navigation/native";


export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  option3,
  onSelectSwitch,
}) {
  const SWITCH_WIDTH = windowWidth * 0.95;
  const SWITCH_HEIGHT = windowWidth * 0.10;
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: SWITCH_HEIGHT,
        width: SWITCH_WIDTH,
        backgroundColor: 'white',
        borderRadius: 10,
        // borderColor: '#AD40AF',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 4,
      }}>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 1 ? '#2BB789' : 'white',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'white' : '#2BB789',
            fontSize: 15,
            fontFamily: 'Roboto-Medium',
          }}>
          {option1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 2 ? '#2BB789' : 'white',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'white' : '#2BB789',
            fontSize: 14,
            fontFamily: 'Roboto-Medium',
          }}>
          {option2}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(3)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 3 ? '#2BB789' : 'white',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 3 ? 'white' : '#2BB789',
            fontSize: 14,
            fontFamily: 'Roboto-Medium',
          }}>
          {option3}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
