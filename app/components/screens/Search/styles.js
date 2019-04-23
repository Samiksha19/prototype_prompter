import { StyleSheet, Platform } from "react-native";
import * as FontSizes from "../../../utils/fontsSizes";
import * as colors from "../../../utils/colors";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey
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
    marginHorizontal: 10
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
  },
  cardHeaderStyle: {
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 15
  },
  cardHeaderImageStyle: {
    height: 50,
    width: 50,
    marginHorizontal: 22
  },
  cardTeaserViewStyle: {
    marginVertical: 15,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    padding: 20
  }
}));
