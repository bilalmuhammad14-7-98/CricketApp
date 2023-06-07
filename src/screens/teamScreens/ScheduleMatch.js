import React, { useState, useEffect, useContext } from "react";

import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { apiActiveURL } from "../../ApiBaseURL";
import Toast from "react-native-root-toast";
//icons import

import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

//import
import CustomButton from "../../components/formComponents/CustomButton";
import CustomFormInput from "../../components/formComponents/CustomFormInput";
import { windowHeight, windowWidth } from "../../config/dimensions";
import { sizes } from "../../config/sizes";
import CustomDropDown from "../../components/formComponents/CustomDropDown";
import axios from "axios";

import { useSelector } from "react-redux";

const CARD_WIDTH = windowWidth * 0.05;
const CARD_HEIGHT = windowHeight * 0.23;
const curve_height = windowHeight * 0.15;
const IMAGE_SIZE = windowHeight * 0.13;
const IMAGE_SIZE1 = windowHeight * 0.025;
const LOGO_SIZE = windowHeight * 0.15;

const ScheduleMatch = (props) => {
  console.log(props.route.params.data.recruiter_id, "props ======");
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });

  console.log(userLoginSuccess, "userLoginSuccess");
  const { colors } = useTheme();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loader, setLoader] = useState(false);
  const [finalDate, setFinalDate] = useState();
  const [finalTime, setFinalTime] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [type, setType] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");

  const matchType = [
    { label: "t20", value: "1" },
    { label: "one-day", value: "2" },
    { label: "test-match", value: "3" },
  ];

  useEffect(() => {
    setShowPicker(false);
  }, []);

  // useEffect(() => {
  //   setShowDatePicker(false);
  //   setShowTimePicker(false);
  // }, [date, time]);

  // const handleDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   console.log(currentDate, "current date");
  //   setDate(currentDate);
  //   formatDateTime(currentDate);
  //   setShowPicker(false);
  //   hideDateTimePicker();
  // };
  // const showDateTimePicker = () => {
  //   setShowPicker(true);
  // };

  // const hideDateTimePicker = () => {
  //   setShowPicker(false);
  // };

  // const showDatePickerModal = () => {
  //   setShowDatePicker(true);
  // };
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || date;

    const formattedDate = currentDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");

    console.log(formattedDate, "date---");
    setFinalDate(formattedDate);
    setDate(currentDate);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    console.log(event, selectedTime, "data----");
    const currentTime = selectedTime || time;
    console.log(currentTime, "time");
    const formattedTime = selectedTime.toLocaleTimeString("en-GB");
    console.log(formattedTime, "time");
    setFinalTime(formattedTime);
    setTime(currentTime);
  };
  const scheduleMatch = async (date) => {
    if (type && venue && description && formatDateTime(date)) {
      setLoader(true);

      var data = new FormData();
      data.append("request_sender_team_id", userLoginSuccess.data.team_id);
      data.append("requested_receiver_team_id", props.route.params.data.value);
      data.append("request_receiver_id", props.route.params.data.recruiter_id);
      data.append("venue", venue);
      data.append("description", description);
      data.append("match_date_time", formatDateTime(date));
      data.append("match_type", type.label);

      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiActiveURL}send-match-request`,
        headers: {
          Authorization: `Bearer ${userLoginSuccess.token}`,
        },
        data: data,
      };

      console.log(config, "config");

      await axios(config)
        .then(function (response) {
          console.log(response, "create team data response");

          Toast.show(response.data.message, {
            duration: 2000,
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
          setLoader(false);
          if (response.data.success) props.navigation.goBack();
          // listTeams();
        })
        .catch(function (error) {
          Toast.show(error.message, {
            duration: 2000,
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
          setLoader(false);
          console.log(error.message, "error,");
        });
    } else {
      Toast.show("All fields are Required", {
        duration: 2000,
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
  };

  const formatDateTime = (dateTime) => {
    const formattedDate = dateTime
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    const formattedTime = dateTime.toLocaleTimeString("en-GB");

    return `${formattedDate} ${formattedTime}`;
  };
  const minimumDate = new Date();

  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1, marginBottom: sizes.bottomTabHeight + 1 }}>
      <LinearGradient colors={["rgba(255,255,255,0.6)", "#2BB789"]}>
        <View style={{ height: curve_height }}></View>
      </LinearGradient>
      <View
        style={{
          marginTop: sizes.m35 * -1,
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: 1,
        }}
      >
        <View style={{ flex: 1, padding: sizes.m10 }}>
          <CustomFormInput
            onChangeText={(val) => setVenue(val)}
            value={venue}
            placeholderText="Venue Name"
          />

          <CustomFormInput
            onChangeText={(val) => setDescription(val)}
            value={description}
            placeholderText="Description"
          />

          <View style={styles.container}>
            {/* Date Picker */}
            <Button title="Select Date" onPress={showDatePickerModal} />
            {showDatePicker && (
              <DateTimePicker
                testID="datePicker"
                value={date}
                mode="date"
                display="default"
                style={{
                  width: 200,
                  height: 50,
                  alignSelf: "center",
                }}
                minimumDate={minimumDate}
                onChange={handleDateChange}
              />
            )}

            {/* Time Picker */}
            <Button title="Select Time" onPress={showTimePickerModal} />
            {showTimePicker && (
              <DateTimePicker
                testID="timePicker"
                value={time}
                mode="time"
                display="default"
                onChange={handleTimeChange}
                style={{
                  width: 200,
                  height: 50,
                  alignSelf: "center",
                }}
              />
            )}
          </View>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            {finalDate ? finalDate : null}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 26,
            }}
          >
            {finalTime ? finalTime : null}
          </Text>

          {/* )} */}
          <CustomDropDown
            value={type}
            onChange={(text) => setType(text)}
            data={matchType}
          />

          <TouchableOpacity>
            <CustomButton
              textColor="white"
              btnLabel={
                !loader ? (
                  "Schedule a Match"
                ) : (
                  <ActivityIndicator animating size={30} color={colors.white} />
                )
              }
              Press={() => scheduleMatch(date)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </ScrollView>
  );
};

const theme = {
  colors: {
    primary: "#2BB789",
  },
};

const styles = StyleSheet.create({
  logo: {
    marginLeft: CARD_WIDTH,
  },

  profile: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: sizes.m15,
  },

  image_text: {
    alignSelf: "center",
    paddingTop: sizes.m8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#2BB789",
  },

  input: {
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
  },

  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },

  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },

  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default ScheduleMatch;
