const initialState = {
  visible: false,
};
export const snackReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SNACKBAR":
      return { ...state, visible: action.payload };
    default:
      return state;
  }
};
