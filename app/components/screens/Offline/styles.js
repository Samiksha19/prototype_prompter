import { Platform, StyleSheet } from "react-native";
import globals from "../../../lib/globals";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  offlineImage: {
    flex: 1
  },
  offline_imageStyle: { width: "90%", height: "50%" },
  offline_textStyle: {
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
    marginVertical: 20
  },
  refreshViewStyle: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 1,
    zIndex: 99,
    backgroundColor: colors.purple,
    justifyContent: "center",
    alignItems: "center",
    flex: 0,
    flexDirection: "row"
  },
  refresh: {
    color: colors.white,
    paddingHorizontal: 10
  },
  icon_image_view_style: {
    position: "absolute",
    top: 20,
    right: 20,
    height: 40,
    width: 40,
    borderRadius: 2,
    elevation: 1,
    zIndex: 99,
    backgroundColor: "transparent",
    shadowColor: colors.black,
    shadowOpacity: 1.0
  }
}));
