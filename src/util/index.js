import Toast from "react-native-root-toast";

export const showToast = (message, status, duration) => {
  return Toast.show(message, {
    duration: duration ? Toast.durations.LONG : Toast.durations.SHORT,
    position: Toast.positions.TOP,
    textColor: "#FFFFFF",
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    position: 80,
    backgroundColor: status == "error" ? "#FF033E" : "#32de84",
    style: {
      height: 100,
      padding: 30,
      borderRadius: 10,
      paddingLeft: 45,
      paddingRight: 15,
    },
  });
};

export const validateEmail = (email) => {
  // Regular expression pattern to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const Days = [
  {
    name: "Monday",
    id: 1,
  },
  {
    name: "Tuesday",
    id: 2,
  },
  {
    name: "Wednesday",
    id: 3,
  },
  {
    name: "Thursday",
    id: 4,
  },
  {
    name: "Friday",
    id: 5,
  },
  {
    name: "Satuarday",
    id: 6,
  },
  {
    name: "Sunday",
    id: 7,
  },
];
