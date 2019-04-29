import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as colors from "../../../utils/colors";
import styles from "./styles";

class SearchHistoryList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.data.length > 0 ? (
          <ScrollView>
            <Text style={styles.searchTopTextStyle}>
              {"Previously Searched Keywords"}
            </Text>
            {this.props.data.map((element, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => this.props.onPress(element)}
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
        ) : (
          <View style={styles.blankScreenStyle}>
            <View style={styles.iconContainerStyle}>
              <Icon
                name="search"
                size={50}
                style={styles.largeIconStyle}
                color={colors.gray}
              />
            </View>
            <Text style={styles.blankScreenHeaderTextStyle}>
              {"No Search Data Found!"}
            </Text>
            <Text style={styles.detailTextStyle}>
              {"Begin your first search with any keyword!"}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default SearchHistoryList;
