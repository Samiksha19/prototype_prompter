import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as colors from "../../../utils/colors";
import styles from "./styles";

class SearchHistoryList extends React.Component {
  render() {
    return (
      <ScrollView>
        <Text style={styles.searchTopTextStyle}>
          {"Previously Searched Keywords"}
        </Text>
        {this.props.data.map((element, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => console.warn("Pressed")}
              activeOpacity={0.7}
              style={styles.elementStyle}
            >
              <Text style={styles.listTextStyle}>{element}</Text>
              <Icon name="history" size={27} color={colors.gray} />
            </TouchableOpacity>
            <View style={styles.viewBorderStyle} />
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default SearchHistoryList;
