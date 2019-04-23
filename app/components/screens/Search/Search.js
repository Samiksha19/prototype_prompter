import React, { Component } from "react";
import { Text, View, TextInput, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import * as colors from "../../../utils/colors";
import { connect } from "react-redux";
import { addToSearch } from "../../../redux/actions/UserClick_Action";
import realm from "../../../database/realmDB";
import styles from "./styles";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      search: []
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      header: null
    };
  };

  componentDidMount() {
    let data = realm.objects("Search")
      ? JSON.parse(realm.objects("Search"))
      : [];
    this.setState({ search: data });
    console.warn(data);
  }

  saveKeyword(keyword) {
    let realmData = realm.objects("Search");
    let prevSearchWords = realmData[0] ? JSON.parse(realmData[0].data) : [];
    if (prevSearchWords === []) {
      prevSearchWords.push(keyword);
      console.warn(prevSearchWords);
      realm.write(() => {
        realm.create("Search", {
          data: JSON.stringify(prevSearchWords)
        });
      });
      debugger;
    } else {
      let check = false;
      prevSearchWords.map(item => {
        if (item === keyword) {
          check = true;
        }
      });
      debugger;
      if (!check) {
        prevSearchWords.push(keyword);
        debugger;
        realm.write(() => {
          realmData = JSON.stringify(prevSearchWords);
        });
      }
    }
    console.warn(prevSearchWords);
    this.props.addToSearch(prevSearchWords);
    debugger;
  }

  render() {
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
              value={this.state.textInput}
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
            onPress={() => this.saveKeyword(this.state.textInput)}
          />
        </View>
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
    UserSearch
  }
)(Search);
