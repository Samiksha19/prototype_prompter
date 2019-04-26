import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as colors from "../../../utils/colors";
import styles from "./styles.js";

const DATA = [
  "Live",
  "4K",
  "HD",
  "SubTitles/CC",
  "Creative Commons",
  "360",
  "VR180",
  "3D",
  "HDR",
  "Location",
  "Purchased"
];

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsBackgroundColor: "",
      tagsTextColor: colors.purple
    };
  }

  render() {
    const { tagsBackgroundColor, tagsTextColor } = this.state;

    return (
      <View style={styles.tagsViewStyle}>
        {DATA.map((element, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              this.setState({
                tagsBackgroundColor: colors.purple,
                tagsTextColor: colors.white
              })
            }
            style={[
              styles.tagsTextViewStyle,
              { backgroundColor: tagsBackgroundColor }
            ]}
            key={index}
          >
            <Text style={[styles.tagsTextStyle, { color: tagsTextColor }]}>
              {element}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default TagList;
