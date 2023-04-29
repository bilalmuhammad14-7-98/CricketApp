const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_REQUESTED":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return { ...state, data: action.payload, loading: false };
    case "LOGIN_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT_USER":
      // console.log(action, "action");
      return { ...state, data: null, error: null, loading: false };
    default:
      return state;
  }
};
