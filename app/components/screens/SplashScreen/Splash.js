import React, { Component } from "react";
import { View, Text, StatusBar, Image } from "react-native";
import styles from "./styles";
import * as colors from "../../../utils/colors";

class SplashScreen extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => this.props.navigation.navigate("App"), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor={colors.purple} />
        <Image
          resizeMode="contain"
          source={require("../../../images/splash_icon.png")}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>{"Prototype Prompter"}</Text>
      </View>
    );
  }
}

export default SplashScreen;
