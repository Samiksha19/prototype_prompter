import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingHorizontal: 10
  },
  menuIcon: {
    backgroundColor: colors.purple,
    marginLeft: 10,
    marginRight: 10
  },
  cardStyle: {
    flex: 1,
    backgroundColor: "white",
    margin: 10
  },
  titleStyle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 10
  },
  dataStyle: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center"
  },
  imageStyle: { flex: 1, height: 45 },
  titleTextStyle: {
    flex: 3,
    fontSize: 16,
    marginLeft: 10,
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
  }
}));
