import { Platform, StyleSheet } from "react-native";
import globals from "../../../lib/globals";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: globals.OS === "ios" ? 70 : 50,
    width: "100%",
    backgroundColor: colors.purple,
    alignItems: "center"
  },
  Titlecontainer: {
    width: "70%",
    alignItems: "center"
  },
  Backcontainer: {
    width: "15%",
    alignItems: "center"
  },
  text: {
    alignItems: "center",
    fontSize: 18,
    marginTop: 5,
    color: colors.white
  },
  menuIcon: {
    marginRight: 10,
    backgroundColor: colors.purple,
    marginLeft: 10
  },
  mainCarouselStyle: {
    flex: 1,
    backgroundColor: "#EDEDED",
    paddingHorizontal: 20,
    paddingBottom: 65,
    paddingTop: 20
  },
  imageStyle: {
    width: "100%",
    height: 250
  },
  cardStyle: {
    flex: 1,
    marginHorizontal: 22,
    marginVertical: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 1,
    zIndex: 99,
    alignItems: "stretch",
    backgroundColor: "#FFF",
    borderWidth: StyleSheet.hairlineWidth
  },
  absoluteIconStyle: {
    flex: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: colors.purple,
    backgroundColor: colors.white,
    alignSelf: "center",
    borderWidth: 2,
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  icon_borderStyle: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: colors.black,
    shadowOpacity: 1.0
  },
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
    backgroundColor: colors.purple
  },
  icon_image_view_style: {
    position: "absolute",
    top: 20,
    right: 20,
    height: 40,
    width: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    shadowOpacity: 100
  }
}));
