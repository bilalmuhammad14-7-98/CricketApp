import { Dimensions } from "react-native";

const apiBaseURL = "https://cricketapp.gulfresource.org/public/api/";
const appKey =
  "smart-$2y$10$RdYWP.Z6T1DFDjSSunimzOUcMDGIBmyqCQ11/Vof.idVxCY14h8ky-api";
const imageURL = "https://cricketapp.gulfresource.org/public/storage/";
var apiActiveURL = apiBaseURL;
var appId = 7;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
// const GOOGLE_MAP_KEY = "AIzaSyDdMQY2wOaHUnzHscBoqvNWmKDH4VUGUXQ";
// const GOOGLE_MAP_KEY = "AIzaSyAPA2PaJ3zo1in4Nl0IJ8Mssc7cseSaD4Y";
export { apiActiveURL, appKey, appId, imageURL, SCREEN_HEIGHT, SCREEN_WIDTH };
