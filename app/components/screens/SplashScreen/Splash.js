import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

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
        <Text>Splash</Text>
      </View>
    );
  }
}

export default SplashScreen;
