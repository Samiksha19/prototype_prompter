import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StatusBar,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
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
import TagList from "./TagList";

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
      article: [],
      isVisible: false,
      selectedTags: [],
      DATA: DATA
    };
    this.childRef = React.createRef();
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
      alert("Please enter search keyword value");
      return 0;
    }
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
    this.setState({ search: prevSearchWords });
    this.fetchData(keyword);
  }

  async fetchData(keyword) {
    let end_point = `search/${keyword}`;
    let method = "GET";
    try {
      let response = await callApi(end_point, method);
      this.setState(
        {
          article: response.length > 0 ? response : [],
          searchArticleRes: true,
          toggle: false
        },
        () => {
          setTimeout(() => {}, 500);
        }
      );
    } catch (err) {
      alert("Failed to fetch data from server.");
    }
  }

  renderIcon() {
    const { searchArticleRes, textInput } = this.state;
    if (searchArticleRes && this.state.article.length !== 0) {
      return (
        <Icon2
          name="sound-mix"
          size={27}
          color={colors.white}
          style={styles.menuIcon}
          onPress={() => this.setState({ isVisible: true })}
        />
      );
    }

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

  renderCard() {
    const { article, searchArticleRes } = this.state;
    if (searchArticleRes && article) {
      return (
        <ScrollView>
          {article.length !== 0
            ? article.map((element, index) => (
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
              ))
            : this.renderEmptyScreen()}
        </ScrollView>
      );
    }
  }

  handleBackPress() {
    const { toggle, textInput } = this.state;
    if (toggle) {
      if (textInput.length === 0) {
        this.props.navigation.goBack();
      } else {
        this.setState({ textInput: "", searchArticleRes: false });
      }
    } else {
      this.setState({
        textInput: "",
        toggle: true,
        searchArticleRes: false,
        article: []
      });
    }
  }

  async handleSearchHistoryListPress(key) {
    this.setState({ toggle: false, searchArticleRes: true, textInput: key });
    await this.fetchData(key);
  }

  pushInSelectedArr(val, ind) {
    const { selectedTags } = this.state;
    let status = selectedTags.findIndex(ele => ele === val);
    if (status === -1) {
      this.setState({
        selectedTags: [...selectedTags, val]
      });
    }
  }

  popInSelectedArr(val, ind) {
    const { selectedTags } = this.state;
    let arr = selectedTags.filter(ele => ele !== val);
    this.setState({
      selectedTags: arr
    });
  }

  clearArr() {
    const { DATA, selectedTags } = this.state;
    this.setState({ selectedTags: [] });
    this.childRef.current.clear(DAt);
  }

  renderEmptyScreen() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 130,
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "center"
        }}
      >
        <Text style={{ fontSize: 16, color: colors.purple, margin: 10 }}>
          No similar articles found. Try with another search
        </Text>
      </View>
    );
  }

  render() {
    const { textInput, DATA } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
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
              placeholder="Search"
              returnKeyType="search"
              placeholderTextColor={colors.white}
              selectionColor={colors.white}
              value={textInput}
              onSubmitEditing={() => this.saveKeyword(textInput)}
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
                  searchArticleRes: false,
                  article: []
                })
              }
            />
          </View>

          {this.renderIcon()}
        </View>
        <KeyboardAvoidingView>
          {this.state.toggle ? (
            <SearchHistoryList
              data={this.state.search}
              onPress={key => this.handleSearchHistoryListPress(key)}
            />
          ) : (
            <View style={{ flex: 1 }}>{this.renderCard()}</View>
          )}
        </KeyboardAvoidingView>
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
          <View style={styles.modalViewStyle}>
            <Text style={styles.modalHeaderTextStyle}>Features</Text>
            <TagList />
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
