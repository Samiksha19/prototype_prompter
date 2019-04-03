import React from "react";
import { Dimensions, Platform, StatusBar } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

export { height, width, STATUSBAR_HEIGHT };
