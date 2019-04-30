import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey
  },
  elementStyle: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10
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
  },
  blankScreenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  largeIconStyle: {
    marginVertical: 35,
    position: "absolute"
  },
  blankScreenHeaderTextStyle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.gray
  },
  detailTextStyle: {
    fontSize: 16,
    fontWeight: "100",
    color: colors.gray,
    paddingVertical: 16
  },
  iconContainerStyle: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },
  searchHistoryListViewStyle: {
    paddingVertical: 15
  },
  columnStyle: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 4
  },
  rowStyle: {
    paddingHorizontal: 5,
    marginTop: 5
  },
  smalltext: {
    fontSize: 12,
    color: colors.black
  }
}));
