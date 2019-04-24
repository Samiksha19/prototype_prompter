import { StyleSheet } from "react-native";
import globals from "../../../lib/globals";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 0
  },
  imageStyle: {
    width: "100%",
    height: "100%"
  },
  headerTextStyle: {
    fontSize: globals.header_fontsize,
    paddingBottom: 10,
    color: colors.purple
  },
  descriptionViewStyle: {
    paddingBottom: 10
  },
  propertiesStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tableStyles: {
    marginVertical: 10
  },
  imageViewStyle: {
    width: "100%",
    height: 250
  },
  menuIcon: {
    marginRight: 10,
    backgroundColor: colors.purple,
    marginLeft: 10
  },
  teaserStyle: { flex: 1, color: colors.black, fontSize: 16 }
}));
