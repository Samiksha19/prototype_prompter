import { StyleSheet, Platform } from "react-native";
import * as FontSizes from "../../../utils/fontsSizes";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  headerStyles: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? 65 : 50,
    backgroundColor: colors.purple,
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  welcomeTxt: {
    alignSelf: "center",
    fontSize: FontSizes.medium,
    marginTop: 40
  },
  menuIcon: {
    backgroundColor: colors.purple,
    marginHorizontal: 10,
    paddingBottom: 10
  },
  headerTextInputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    paddingLeft: 5
  },
  textInputViewStyle: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 2,
    marginBottom: 5,
    borderBottomColor: colors.white
  }
}));
