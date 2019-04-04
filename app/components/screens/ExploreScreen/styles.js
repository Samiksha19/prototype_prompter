import { Platform, StyleSheet } from "react-native";
import globals from "../../lib/globals";
import * as colors from "../../utils/colors";

export default (styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: globals.OS === "ios" ? 70 : 50,
    width: "100%",
    backgroundColor: colors.purple,
    alignItems: "center"
  },
  Titlecontainer: {
    width: "70%",
    alignItems: "center"
  },
  Backcontainer: {
    width: "15%",
    alignItems: "center"
  },
  text: {
    alignItems: "center",
    fontSize: 18,
    marginTop: 5,
    color: colors.white
  },
  menuIcon: {
    backgroundColor: colors.purple,
    marginLeft: 10
  },
  cardStyle: {
    flex: 1,
    marginHorizontal: 22,
    marginVertical: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 1,
    zIndex: 99,
    alignItems: "stretch",
    backgroundColor: "#FFF",
    borderWidth: StyleSheet.hairlineWidth
  }
}));
