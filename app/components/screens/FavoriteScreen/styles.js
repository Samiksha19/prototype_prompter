import { Platform, StyleSheet } from "react-native";
import globals from "../../../lib/globals";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.grey, paddingBottom: 5 },
  menuIcon: {
    marginRight: 10,
    backgroundColor: colors.purple,
    marginLeft: 10
  },
  blankScreenStyle: { flex: 1, justifyContent: "center", alignItems: "center" }
}));
