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
    color: colors.black
  },
  imageStyle: {
    height: 250,
    width: 250
  }
});

export default styles;
