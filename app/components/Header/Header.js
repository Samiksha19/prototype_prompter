/* Header Component */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/dist/MaterialIcons";
import styles from "./styles";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.Backcontainer}
          onPress={() => this.props.onPress()}
        >
          {this.props.isDrawer ? (
            <FeatherIcon
              name="menu"
              size={26}
              style={styles.menuIcon}
              color="#fff"
            />
          ) : (
            <FeatherIcon
              name="chevron-left"
              size={26}
              style={styles.menuIcon}
              color="#fff"
            />
          )}
        </TouchableOpacity>
        <View style={styles.Titlecontainer}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.Backcontainer}
          onPress={() => this.props.onPressSearch()}
        >
          {this.props.isSearch ? (
            <FeatherIcon
              name="search"
              size={26}
              style={styles.menuIcon}
              color="#fff"
            />
          ) : (
            <View />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default Header;
