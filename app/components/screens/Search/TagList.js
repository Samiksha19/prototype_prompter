import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as colors from "../../../utils/colors";
import { Dropdown } from "react-native-material-dropdown";
import styles from "./styles.js";

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      selectedTags: [],
      pdDuration: "",
      pdEvaluationType: "",
      data: props.data
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
    let propsData = this.props.data;
    this.setState(
      {
        selectedTags: [],
        pdDuration: "",
        pdEvaluationType: "",
        data: { filter: [] }
      },
      () => {
        this.setState({ data: propsData });
      }
    );
  }

  changeText(text, key) {
    this.setState({ [key.label]: text });
  }

  filterArticles() {
    let a = [];
    if (this.state.pdDuration !== "") {
      a.push(this.state.pdDuration);
    }
    if (this.state.pdEvaluationType !== "") {
      a.push(this.state.pdEvaluationType);
    }
    let txt = this.props.text;
    let array =
      this.state.pdDuration !== "" || this.state.pdEvaluationType !== ""
        ? this.state.selectedTags.concat(a)
        : this.state.selectedTags;
    if (array.length !== 0) {
      this.props.getFilteredArtciles(array, txt);
    } else {
      Alert.alert("Alert", "Select filter tags to continue");
    }
  }

  render() {
    let { selectedTags } = this.state;
    return (
      <View>
        {this.state.data.filter.map((key, index) => (
          <View key={index} style={styles.filterViewStyle}>
            {key.type === "dropdown" ? (
              <View>
                <Dropdown
                  label={key.text}
                  baseColor={colors.purple}
                  data={key.values}
                  onChangeText={text => this.changeText(text, key, [])}
                />
              </View>
            ) : (
              <View>
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

            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => this.filterArticles()}
            >
              <Text style={styles.modalBottomButtonStyle}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default TagList;
