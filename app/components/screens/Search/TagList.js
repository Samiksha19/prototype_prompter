import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import * as colors from "../../../utils/colors";
import { Dropdown } from "react-native-material-dropdown";
import styles from "./styles.js";

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      selectedTags: [],
      selectedValueDuration: "",
      selectedValueEvaluation: ""
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

  changeText(text) {
    console.warn(text);
  }

  render() {
    let { selectedTags } = this.state;

    return (
      <View>
        {this.props.data.filter.map((key, index) => (
          <View key={index} style={styles.filterViewStyle}>
            {key.type === "dropdown" ? (
              <View style={{ padding: 6 }}>
                <Text style={styles.labelStyle}>{key.text}</Text>
                <Dropdown
                  label="Select an option"
                  data={key.values}
                  onChangeText={text => this.changeText(text)}
                />
              </View>
            ) : (
              <View>
                <Text style={styles.labelStyle}>{key.text}</Text>
                <View style={styles.tagsViewStyle}>
                  {key.values.map((val, ind) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.selectTag(val)}
                      key={ind}
                      style={[
                        styles.tagsTextViewStyle,
                        {
                          backgroundColor: selectedTags.includes(val)
                            ? colors.purple
                            : colors.white
                        }
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagsTextStyle,
                          {
                            color: selectedTags.includes(val)
                              ? colors.white
                              : colors.purple
                          }
                        ]}
                      >
                        {val}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}

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
