import { StyleSheet } from "react-native";
import * as colors from "../../../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 22,
    color: colors.black,
    textAlign: "center"
  },
  imageStyle: {
    height: 250,
    width: 250,
    flex: 1,
    alignSelf: "center"
  }
});

export default styles;
