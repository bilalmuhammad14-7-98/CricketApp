import { callApi } from ".";
import { methodType } from "../config/methodType";

const signInRequest = (email, password) => {
  var url = "api/signin";
  const data = { email, password };
  return callApi(url, methodType.POST, data);
};

const signUpRequest = (name, email, password, gender, dob) => {
  var url = "api/signup";
  const data = { name: name, email, password, Gender: gender, DateofBirth: dob };
  return callApi(url, methodType.POST, data);
};

// const getApi = (email, password) => {
//   var url = "api/signin";
//   return callApi(url, methodType.GET);
// };

export { signInRequest };
export { signUpRequest };
