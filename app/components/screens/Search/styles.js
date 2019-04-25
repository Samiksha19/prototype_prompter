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
  },
  modalStyle: {
    margin: 0,
    padding: 0
  },
  modalViewStyle: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: 10,
    paddingBottom: 5
  },
  modalHeaderTextStyle: {
    color: colors.purple,
    fontSize: 17,
    fontWeight: "300",
    marginTop: 20,
    paddingLeft: 22
  },
  tagsViewStyle: {
    padding: 12,
    flexDirection: "row",
    flexWrap: "wrap-reverse"
  },
  tagsTextViewStyle: {
    borderWidth: 1,
    alignSelf: "flex-start",
    borderColor: colors.purple,
    borderRadius: 25,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 10,
    marginLeft: 6
  },
  tagsTextStyle: {
    fontSize: 15,
    fontWeight: "100"
  },
  borderStyle: {
    height: 2,
    backgroundColor: colors.gray,
    marginVertical: 10
  },
  modalBottomViewStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  modalBottomViewTextViewStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  modalBottomButtonStyle: {
    marginHorizontal: 15,
    marginVertical: 12,
    fontSize: 15,
    color: colors.purple,
    fontWeight: "100"
  }
}));
