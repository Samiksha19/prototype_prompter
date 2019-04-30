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
    flexDirection: "column",
    backgroundColor: colors.purple,
    justifyContent: "center",
    alignItems: "center"
  },
  removeTextStyle: {
    color: colors.white,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "100"
  },
  blankScreenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    paddingHorizontal: 20
  },
  largeIconStyle: {
    marginVertical: 35,
    position: "absolute"
  },
  blankScreenHeaderTextStyle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.gray,
    textAlign: 'center'
  },
  detailTextStyle: {
    fontSize: 16,
    fontWeight: "100",
    color: colors.gray,
    textAlign: 'center',
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
  }
}));
