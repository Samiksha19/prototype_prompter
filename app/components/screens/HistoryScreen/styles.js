import { Platform, StyleSheet } from "react-native";
import globals from "../../../lib/globals";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingBottom: 5
  },
  menuIcon: {
    backgroundColor: colors.purple,
    marginLeft: 10,
    marginRight: 10
  },
  cardStyle: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    marginRight: 20
  },
  titleStyle: {
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
  titleTextStyle: { flex: 3, fontSize: 16, marginLeft: 10 }
}));
