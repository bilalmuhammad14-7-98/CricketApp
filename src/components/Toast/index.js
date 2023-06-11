import React from "react";
import { Appearance, StyleSheet, Text } from "react-native";
import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { SCREEN_WIDTH } from "../../ApiBaseURL";
import { showSnackBar } from "../../store/actions";
const withToast = (WrappedComponent) => {
  const ToastStatus = () => {
    const colorScheme = Appearance.getColorScheme();
    const dispatch = useDispatch();
    const onDismissSnackBar = () =>
      dispatch(showSnackBar({ visible: false, text: "" }));
    const snack = useSelector((state) => state.snackbar.visible);

    return (
      <>
        <WrappedComponent />
        <Snackbar
          wrapperStyle={{ top: 90 }}
          style={{
            alignSelf: "center",
            width: SCREEN_WIDTH - 100,
            backgroundColor: snack.error ? "#FF033E" : "#32de84",
          }}
          visible={snack?.visible}
          // wrapperStyle={props.screens == 'Filters' ? {top: 0} : ''}
          onDismiss={() => onDismissSnackBar()}
          onIconPress={() => onDismissSnackBar()}
          duration={2000}
          action={{}}
        >
          <Text style={{ color: colorScheme == "dark" ? "black" : "white" }}>
            {snack?.text}
          </Text>
        </Snackbar>
      </>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorMessage: {
      color: "#2A3D49",
      fontSize: 19,
      fontFamily: "Montserrat-SemiBold",
      textAlign: "center",
      width: "90%",
      paddingBottom: 10,
    },
    errorImage: {
      width: 250,
      height: 250,
    },
  });

  return ToastStatus;
};

export default withToast;
