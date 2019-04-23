import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  elementStyle: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 16
  },
  listTextStyle: {
    fontSize: 17,
    fontWeight: "100"
  },
  viewBorderStyle: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.black,
    marginHorizontal: 12,
    width: "90%",
    alignSelf: "center"
  }
}));
