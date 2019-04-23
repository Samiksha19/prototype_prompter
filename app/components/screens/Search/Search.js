import React, { Component } from "react";
import { Text, View, TextInput, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import * as colors from "../../../utils/colors";
import { connect } from "react-redux";
import SearchHistoryList from "../SearchHistory/SearchHistoryList";
import { addToSearch } from "../../../redux/actions/UserClick_Action";
import realm from "../../../database/realmDB";
import styles from "./styles";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      search: [],
      toggle: false
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      header: null
    };
  };

  componentWillMount() {
    let searchKeys = realm.objects("Search");
    let data = searchKeys[0] ? JSON.parse(searchKeys[0].data) : [];

    if (data !== null || undefined) {
      this.setState({ toggle: true, search: data });
    }
  }

  saveKeyword(keyword) {
    let realmData = realm.objects("Search");
    let prevSearchWords = realmData[0] ? JSON.parse(realmData[0].data) : [];
    if (!realmData[0]) {
      prevSearchWords.push(keyword);
      realm.write(() => {
        realm.create("Search", {
          data: JSON.stringify(prevSearchWords)
        });
      });
    } else {
      let val = prevSearchWords.findIndex(ele => ele === keyword);
      if (val === -1) {
        prevSearchWords.push(keyword);
        realm.write(() => {
          realmData[0].data = JSON.stringify(prevSearchWords);
        });
      }
    }
  }

  render() {
    const { textInput } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor={colors.purple} />
        <View style={styles.headerStyles}>
          <Icon
            name="arrow-back"
            size={27}
            color={colors.white}
            onPress={() => this.props.navigation.goBack()}
            style={styles.menuIcon}
          />

          <View style={styles.textInputViewStyle}>
            <TextInput
              style={styles.headerTextInputStyle}
              autoFocus={true}
              placeholder="Search"
              returnKeyType="search"
              placeholderTextColor={colors.white}
              selectionColor={colors.white}
              value={textInput}
              onChangeText={text => this.setState({ textInput: text })}
            />

            <Icon2
              name="cross"
              size={18}
              color={colors.white}
              style={styles.menuIcon}
              onPress={() => this.setState({ textInput: "" })}
            />
          </View>

          <Icon
            name="search"
            size={27}
            color={colors.white}
            style={styles.menuIcon}
            onPress={() => this.saveKeyword(textInput)}
          />
        </View>
        {this.state.toggle ? (
          <SearchHistoryList
            data={this.state.search}
            navigation={this.props.navigation}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { UserSearch } = state;

  return { UserSearch };
};

export default connect(
  mapStateToProps,
  {
    addToSearch
  }
)(Search);
