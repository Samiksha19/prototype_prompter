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
    paddingVertical: 8
  },
  listTextStyle: {
    fontSize: 15,
    fontWeight: "100"
  },
  viewBorderStyle: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.black,
    marginHorizontal: 8,
    alignSelf: "center"
  },
  searchTopTextStyle: {
    fontSize: 16,
    fontWeight: "200",
    paddingLeft: 16,
    paddingVertical: 15,
    color: colors.black
  }
}));
