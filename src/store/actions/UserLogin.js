import axios from "axios";
import { apiActiveURL } from "../../ApiBaseURL";

export const UserLogin = (data) => {
  console.log(
    data.username,
    data.password,
    "data==============================================="
  );
  const { username, password } = data;
  console.log(username, password, "email");
  // return;

  var data = new FormData();
  data.append("email", username);
  data.append("password", password);

  var config = {
    url: `${apiActiveURL}user/login`,
    // url:
    //   checkedValue == "company"
    //     ? `${apiActiveURL}company_login`
    //     : checkedValue == "employee"
    //     ? `${apiActiveURL}employee_login`
    //     : `${apiActiveURL}login`,
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    data: data,
  };

  return (dispatch) => {
    axios(config)
      .then((res) => {
        console.log(res.data, "login response");

        if (res.data.success) {
          LoginSuccess(dispatch, res.data);
        } else {
          LoginFail(dispatch, res.data);
        }
      })
      .catch((e) => {
        console.log(e.message, "catch error");
        LoginFail(dispatch, e.message);
      });
  };
};

export const ResetLoginError = () => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_FAIL", payload: null });
  };
};

export const ResetLogin = () => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_SUCCESS", payload: null });
  };
};

export const LoginRequested = () => {
  // console.log("Login Requested");
  return (dispatch) => {
    dispatch({ type: "LOGIN_REQUESTED" });
  };
};

const LoginSuccess = (dispatch, res) => {
  // console.log(res, "post data res");
  dispatch({ type: "LOGIN_SUCCESS", payload: res });
};

const LoginFail = (dispatch, res) => {
  dispatch({ type: "LOGIN_FAIL", payload: res });
};

export const logoutUser = () => {
  console.log("Logout Requested");
  return (dispatch) => {
    dispatch({ type: "LOGOUT_USER" });
  };
};
// export function logoutUser(history) {
//   console.log("logout action hit");
//   localStorage.removeItem("userDetails");
//   history.push("/login");
//   return {
//     type: "LOGOUT_USER",
//   };
// }
