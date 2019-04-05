import { Platform, StyleSheet } from "react-native";
import globals from "../../lib/globals";
import * as colors from "../../utils/colors";

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
  cardStyle: {
    flex: 1,
    marginHorizontal: 22,
    marginVertical: 20,
    elevation: 1,
    zIndex: 99,
    alignItems: "stretch",
    backgroundColor: "#FFF",
    borderWidth: StyleSheet.hairlineWidth
  },
  imageStyle: {
    width: "100%",
    height: 250
  },
  mainCarouselStyle: {
    flex: 1,
    backgroundColor: "#EDEDED",
    paddingHorizontal: 20,
    paddingBottom: 65,
    paddingTop: 20
  },
  absoluteIconStyle: {
    flex: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: "purple",
    backgroundColor: "white",
    alignSelf: "center",
    borderWidth: 2,
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    justifyContent: "center"
  }
}));
