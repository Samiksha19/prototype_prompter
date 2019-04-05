import { StyleSheet } from "react-native";
import globals from "../../../lib/globals";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    paddingBottom: 0
  },
  imageStyle: {
    width: "100%",
    height: 200,
    paddingBottom: 10
  },
  headerTextStyle: {
    fontSize: globals.header_fontsize,
    paddingBottom: 10,
    color: colors.purple
  },
  descriptionTextStyle: {
    fontSize: globals.description_fontsize,
    paddingBottom: 10,
    color: "#000"
  },
  propertiesStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  tableStyles: {
    marginVertical: 6
  }
}));
