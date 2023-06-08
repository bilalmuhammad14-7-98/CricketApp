const initState = { user: { token: null }, notification: [] };
function authReducer(state = initState, action) {
  switch (action.type) {
    case "SET_USER": {
      console.log("data: ", action.data);
      return { ...state, user: action.data };
    }
    case "UNSET_USER": {
      return { ...state, user: { token: null } };
    }
    case "NOTIFICATION": {
      return { ...state, notification: action.data };
    }
    default: {
      return state;
    }
  }
}

export default authReducer;
