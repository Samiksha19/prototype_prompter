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

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      selectedTags: []
    };
  }

  selectTag(key) {
    let { selectedTags } = this.state;
    if (selectedTags.includes(key)) {
      selectedTags.indexOf(key) !== -1 &&
        selectedTags.splice(selectedTags.indexOf(key), 1);
    } else {
      selectedTags.push(key);
    }
    this.setState({ selectedTags: selectedTags });
  }

  resetSelectedTags() {
    this.setState({ selectedTags: [] });
  }

  render() {
    let { selectedTags } = this.state;

    return (
      <View>
        <View style={styles.tagsViewStyle}>
          {DATA.map((key, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.selectTag(key)}
              style={[
                styles.tagsTextViewStyle,
                {
                  backgroundColor: selectedTags.includes(key)
                    ? colors.purple
                    : colors.white
                }
              ]}
            >
              <Text
                style={[
                  styles.tagsTextStyle,
                  {
                    color: selectedTags.includes(key)
                      ? colors.white
                      : colors.purple
                  }
                ]}
              >
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.modalBottomViewStyle}>
          <View style={styles.modalBottomViewTextViewStyle}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => this.resetSelectedTags()}
            >
              <Text style={styles.modalBottomButtonStyle}>RESET</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.4}>
              <Text style={styles.modalBottomButtonStyle}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default TagList;
