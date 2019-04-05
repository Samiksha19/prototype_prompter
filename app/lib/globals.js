/** Globally used check are declared here*/

import { Dimensions, Platform } from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const screen_header_fontsize = 18;
const header_fontsize = 16;
const description_fontsize = 15;
const label_fontsize = 12;

module.exports = {
  deviceHeight: deviceHeight,
  deviceWidth: deviceWidth,
  deviceType: deviceHeight / deviceWidth > 1.6 ? "Phone" : "Tablet",
  iphoneX: deviceHeight == 812 ? true : false,
  OS: Platform.OS === "ios" ? "ios" : "android",
  header_fontsize: header_fontsize,
  description_fontsize: description_fontsize,
  screen_header_fontsize: screen_header_fontsize,
  label_fontsize: label_fontsize
};
