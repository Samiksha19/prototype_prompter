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
    alignItems: "flex-end",
    paddingBottom: 6
  },
  welcomeTxt: {
    alignSelf: "center",
    fontSize: FontSizes.medium,
    marginTop: 40
  },
  menuIcon: {
    backgroundColor: colors.purple,
    marginHorizontal: 10,
    marginBottom: 2
  },
  headerTextInputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    paddingLeft: 5,
    paddingBottom: 5
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
  cardStyle: {
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: colors.white,
    paddingVertical: 15
  },
  cardHeaderStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  cardHeaderImageStyle: {
    height: 50,
    width: 50,
    marginHorizontal: 22
  },
  headerTitleStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "100"
  },
  cardTeaserViewStyle: {
    backgroundColor: colors.white,
    padding: 20
  },
  cardTeaserTextStyle: {
    fontSize: 15
  }
}));
