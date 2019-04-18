import { Platform, StyleSheet } from "react-native";
import globals from "../../../lib/globals";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.grey },
  menuIcon: {
    marginRight: 10,
    backgroundColor: colors.purple,
    marginLeft: 10
  },
  blankScreenStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  containerListStyle: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
    zIndex: 99
  },
  titleListStyle: {
    marginVertical: 20,
    marginLeft: 22,
    fontSize: 16,
    fontWeight: "200",
    color: colors.black
  },
  removeStyle: {
    flex: 1,
    backgroundColor: colors.purple,
    justifyContent: "center",
    alignItems: "center"
  },
  removeTextStyle: {
    color: colors.purple,
    fontSize: 16,
    fontWeight: "100"
  }
}));
