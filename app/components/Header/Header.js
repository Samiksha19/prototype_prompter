/* Header Component */

import React, { Component } from "react";
import { DrawerActions } from "react-navigation";
import { View, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/dist/Feather";
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
              color="#000"
            />
          ) : (
            <FeatherIcon
              name="chevron-left"
              size={26}
              style={styles.menuIcon}
              color="#000"
            />
          )}
        </TouchableOpacity>
        <View style={styles.Titlecontainer}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

export default Header;
