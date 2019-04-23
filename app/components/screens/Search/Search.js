import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StatusBar,
  Image,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import * as colors from "../../../utils/colors";
import { connect } from "react-redux";
import SearchHistoryList from "../SearchHistory/SearchHistoryList";
import { addToSearch } from "../../../redux/actions/UserClick_Action";
import callApi from "../../../lib/apicaller";
import realm from "../../../database/realmDB";
import styles from "./styles";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      search: [],
      toggle: false,
      gotData: false,
      article: null
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

  async saveKeyword(keyword) {
    this.setState({ toggle: false });
    let end_point = `search/${keyword}`;
    let method = "GET";
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
    try {
      let response = await callApi(end_point, method);
      this.setState({ gotData: true, article: response, toggle: false });
      console.warn(response);
    } catch (err) {
      alert("Failed to fetch data from server.");
    }
    debugger;
  }

  renderCard() {
    const { article, gotData } = this.state;
    debugger;
    if (gotData) {
      return article.map((element, index) => (
        <View>
          <View key={index} style={styles.cardHeaderStyle}>
            <Image
              source={{ uri: element.image }}
              style={styles.cardHeaderImageStyle}
            />
            <Text>{element.title}</Text>
          </View>
          <View style={styles.cardTeaserViewStyle}>
            <Text style={styles.cardTeaserTextStyle}>{element.teaser}</Text>
          </View>
        </View>
      ));
    }
    debugger;
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
              onPress={() =>
                this.setState({ textInput: "", toggle: false, gotData: false })
              }
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
        <ScrollView>{this.renderCard()}</ScrollView>
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
