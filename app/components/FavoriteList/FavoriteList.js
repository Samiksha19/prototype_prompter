import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

class FavoriteList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            console.warn("List item Pressed!");
          }}
        >
          <Text style={styles.titleStyle}>{this.props.obj.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FavoriteList;
