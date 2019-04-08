import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import styles from "./styles";
import * as colors from "../../../utils/colors";

class SplashScreen extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => this.props.navigation.navigate("App"), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor={colors.purple} />
        <Text style={styles.textStyle}>Splash</Text>
      </View>
    );
  }
}

export default SplashScreen;
