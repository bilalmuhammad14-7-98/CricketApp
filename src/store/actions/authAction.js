function SetUser(val) {
  return {
    type: "SET_USER",
    data: val,
  };
}

function UnSetUser() {
  return {
    type: "UNSET_USER",
  };
}

function setNotification(data) {
  return {
    type: "NOTIFICATION",
    data,
  };
}

export { SetUser, UnSetUser, setNotification };
