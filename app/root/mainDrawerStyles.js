import { Platform, StyleSheet } from "react-native";
import * as colors from "../utils/colors";

export default (styles = StyleSheet.create({
  drawerBackground: {
    flex: 1,
    backgroundColor: colors.grey,
    marginBottom: 40
  },
  drawerImageStyle: {
    width: "100%",
    height: 200,
    backgroundColor: colors.purple
  },
  drawerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "100",
    marginHorizontal: 8,
    marginTop: 8
  }
}));
