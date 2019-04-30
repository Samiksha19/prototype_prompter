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
    alignItems: "center",
    flexWrap: "wrap"
  },
  cardHeaderImageStyle: {
    height: 50,
    width: 50,
    marginHorizontal: 10
  },
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: "100",
    flexWrap: "wrap",
    flex: 1,
    paddingLeft: 5
  },
  cardTeaserViewStyle: {
    flexWrap: "wrap",
    backgroundColor: colors.white,
    padding: 20
  },
  cardTeaserTextStyle: {
    flexWrap: "wrap",
    fontSize: 15
  },
  modalStyle: {
    margin: 0,
    padding: 0
  },
  modalViewStyle: {
    backgroundColor: colors.white,
    borderRadius: 5,
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
    flexWrap: "wrap"
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
  modalBottomViewStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopColor: colors.gray,
    borderTopWidth: 2,
    paddingTop: 10
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
  },
  blankScreenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100
  },
  largeIconStyle: {
    marginVertical: 35,
    position: "absolute"
  },
  blankScreenHeaderTextStyle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.gray,
    textAlign: "center"
  },
  detailTextStyle: {
    fontSize: 16,
    fontWeight: "100",
    color: colors.gray,
    paddingVertical: 16,
    textAlign: "center"
  },
  iconContainerStyle: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },
  labelStyle: {
    color: colors.purple,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "100"
  },
  filterViewStyle: {
    margin: 8
  },
  cancelIcon: {}
}));
