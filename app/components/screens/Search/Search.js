import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Modal from "react-native-modal";
import * as colors from "../../../utils/colors";
import { connect } from "react-redux";
import SearchHistoryList from "../SearchHistory/SearchHistoryList";
import { addToSearch } from "../../../redux/actions/UserClick_Action";
import callApi from "../../../lib/apicaller";
import realm from "../../../database/realmDB";
import styles from "./styles";

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
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      search: [],
      toggle: true,
      searchArticleRes: false,
      article: null,
      isVisible: false
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      header: null,
      headerBackTitle: null
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
    if (keyword === "" || keyword.length < 3) {
      alert("No results");
      return 0;
    }
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
      debugger;
      if (response.length > 0) {
        debugger;
        this.setState({
          article: response,
          searchArticleRes: true,
          toggle: false
        });
      } else {
        debugger;
        alert("No data retrieved.");
      }
    } catch (err) {
      alert("Failed to fetch data from server.");
    }
  }

  renderIcon() {
    const { searchArticleRes, textInput } = this.state;
    if (searchArticleRes) {
      return (
        <Icon2
          name="sound-mix"
          size={27}
          color={colors.white}
          style={styles.menuIcon}
          onPress={() => this.setState({ isVisible: true })}
        />
      );
    } else {
      return (
        <Icon
          name="search"
          size={27}
          color={colors.white}
          style={styles.menuIcon}
          onPress={() => this.saveKeyword(textInput)}
        />
      );
    }
  }

  renderCard() {
    const { article, searchArticleRes } = this.state;
    if (searchArticleRes) {
      return article.map((element, index) => (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            this.props.navigation.navigate("SearchedFeed", {
              param: element,
              headerTitle: element.title
            })
          }
          key={index}
          style={styles.cardStyle}
        >
          <View style={styles.cardHeaderStyle}>
            <Image
              source={{ uri: element.image }}
              style={styles.cardHeaderImageStyle}
            />
            <Text style={styles.headerTitleStyle}>{element.title}</Text>
          </View>
          <View style={styles.cardTeaserViewStyle}>
            <Text style={styles.cardTeaserTextStyle} numberOfLines={4}>
              {element.teaser}
            </Text>
          </View>
        </TouchableOpacity>
      ));
    }
  }

  handleBackPress() {
    const { textInput } = this.state;
    if (textInput.length > 0) {
      this.setState({ textInput: "" });
    } else {
      this.props.navigation.goBack();
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
            onPress={() => this.handleBackPress()}
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
                this.setState({
                  textInput: "",
                  toggle: true,
                  searchArticleRes: false
                })
              }
            />
          </View>

          {this.renderIcon()}
        </View>
        {this.state.toggle ? (
          <SearchHistoryList data={this.state.search} />
        ) : (
          <ScrollView>{this.renderCard()}</ScrollView>
        )}
        <Modal
          isVisible={this.state.isVisible}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          avoidKeyboard={true}
          style={styles.modalStyle}
          backdropOpacity={0.2}
          onBackButtonPress={() =>
            this.setState({ isVisible: !this.state.isVisible })
          }
          onBackdropPress={() =>
            this.setState({ isVisible: !this.state.isVisible })
          }
        >
          <ScrollView style={styles.modalViewStyle}>
            <Text style={styles.modalHeaderTextStyle}>Features</Text>

            <View style={styles.tagsViewStyle}>
              {DATA.map((element, index) => (
                <View style={styles.tagsTextViewStyle} key={index}>
                  <Text style={styles.tagsTextStyle}>{element}</Text>
                </View>
              ))}
            </View>
            <View style={styles.borderStyle} />
            <View style={styles.modalBottomViewStyle}>
              <View style={styles.modalBottomViewTextViewStyle}>
                <TouchableOpacity activeOpacity={0.4}>
                  <Text style={styles.modalBottomButtonStyle}>CANCEL</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.4}>
                  <Text style={styles.modalBottomButtonStyle}>APPLY</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
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
