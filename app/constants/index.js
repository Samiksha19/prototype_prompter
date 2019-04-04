import React from "react";
import { Dimensions, Platform, StatusBar } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const isAndroid = Platform.OS === "android";
const ICON_SIZE = 20;
const header_height = 60;

export { height, width, STATUSBAR_HEIGHT, isAndroid, ICON_SIZE, header_height };
