import { Platform, StyleSheet } from "react-native";
import * as colors from "../../utils/colors";

export default (styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 4,
    elevation: 1,
    zIndex: 99
  },
  titleStyle: {
    marginVertical: 16,
    marginLeft: 22,
    fontSize: 16,
    fontWeight: "100",
    color: colors.black
  }
}));
