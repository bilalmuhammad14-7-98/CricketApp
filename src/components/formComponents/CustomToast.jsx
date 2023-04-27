import React from "react";
import Toast from "react-native-root-toast";

export default function CustomToast({ show, message }) {
  return (
    <Toast
      visible={show}
      shadow={false}
      animation={false}
      hideOnPress={true}
      duration={Toast.durations.SHORT}
      position={Toast.positions.BOTTOM}
    >
      {message}
    </Toast>
  );
}
