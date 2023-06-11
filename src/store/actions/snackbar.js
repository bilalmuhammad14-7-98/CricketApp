export const showSnackBar = (data) => {
  return (dispatch) => dispatch({ type: "SNACKBAR", payload: data });
};
