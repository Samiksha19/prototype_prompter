import React from "react";
import { StyleSheet } from "react-native";
import globals from "../../lib/globals";
import * as colors from "../../utils/colors";

export default (styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.transparent
  },
  loaderStyle: {
    marginBottom: "30%"
  }
}));
