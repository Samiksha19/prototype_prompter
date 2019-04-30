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
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import EaIcon from "react-native-vector-icons/Entypo";
import Modal from "react-native-modal";
import * as colors from "../../../utils/colors";
import { connect } from "react-redux";
import SearchHistoryList from "../SearchHistory/SearchHistoryList";
import { addToSearch } from "../../../redux/actions/UserClick_Action";
import callApi from "../../../lib/apicaller";
import realm from "../../../database/realmDB";
import styles from "./styles";
import TagList from "./TagList";

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
      DATA: [],
      filterTags: ["filter"]
    };
    this.childRef = React.createRef();
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      header: null,
      headerBackTitle: null
    };
  };

  componentDidMount() {
    let searchKeys = realm.objects("Search");
    let data = searchKeys[0] ? JSON.parse(searchKeys[0].data) : [];
    if (data !== null || undefined) {
      this.setState({ toggle: true, search: data });
    }
    this.getTags();
  }

  async getTags() {
    let end_point = "def";
    let method = "GET";
    let response = await callApi(end_point, method);
    let newArr1 = [];
    let newArr2 = [];
    response.filter.map((ele, index) => {
      if (ele.type === "dropdown") {
        if (newArr1.length === 0) {
          ele.values.map((val, index) => {
            val = { value: val };
            newArr1.push(val);
          });
        } else {
          ele.values.map((val, index) => {
            val = { value: val };
            newArr2.push(val);
          });
        }
      }
    });
    response.filter[1].values = newArr1;
    response.filter[2].values = newArr2;
    response.filter = response.filter.reverse();
    this.setState({ DATA: response });
  }

  async saveKeyword(arr, keyword) {
    if (keyword === "" || keyword.length < 3) {
      alert("Please enter search keyword value");
      return 0;
    }
    let data_to_be_pushed = {};
    data_to_be_pushed.key = keyword;
    data_to_be_pushed.arr = arr;
    let realmData = realm.objects("Search");
    let prevSearchWords = realmData[0] ? JSON.parse(realmData[0].data) : [];
    if (!realmData[0]) {
      prevSearchWords.push(data_to_be_pushed);
      realm.write(() => {
        realm.create("Search", {
          data: JSON.stringify(prevSearchWords)
        });
      });
    } else {
      let insert = true;
      prevSearchWords.map((item, index) => {
        if (item.key === keyword) {
          if (arr.length === 0) {
            insert = false;
          } else {
            prevSearchWords.splice(index, 1);
          }
        }
      });
      if (insert) {
        prevSearchWords.push(data_to_be_pushed);
        realm.write(() => {
          realmData[0].data = JSON.stringify(prevSearchWords);
        });
      }
    }
    this.setState({ search: prevSearchWords });
    this.fetchData(keyword, arr);
  }

  async fetchData(keyword, arr) {
    let initVal = "filter";
    if (arr.length === 0) {
      arr.push(initVal);
    }
    let end_point = `search/${keyword}/` + arr;
    let method = "GET";
    try {
      let response = await callApi(end_point, method);
      this.setState({
        article: response.length > 0 ? response : [],
        searchArticleRes: true,
        toggle: false
      });
    } catch (err) {
      alert("Failed to fetch data from server.");
    }
  }

  renderIcon() {
    const { searchArticleRes, textInput } = this.state;
    if (searchArticleRes && this.state.article.length !== 0) {
      return (
        <EaIcon
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
        onPress={() => this.saveKeyword([], textInput)}
      />
    );
  }

  renderCard() {
    const { article, searchArticleRes } = this.state;
    if (searchArticleRes && article) {
      return (
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 5,
            flexGrow: 1
          }}
          showsVerticalScrollIndicator={false}
        >
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
          <View style={{ height: 50 }} />
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

  async handleSearchHistoryListPress(key, arr) {
    this.setState({ toggle: false, textInput: key });
    await this.fetchData(key, arr);
  }

  renderEmptyScreen() {
    return (
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
          {"No Data Found!"}
        </Text>
        <Text style={styles.detailTextStyle}>
          {"Try again with another keyword"}
        </Text>
      </View>
    );
  }

  async getFilteredArtciles(filterKeys, txt) {
    let end_point = "search/" + txt + "/" + filterKeys;
    let method = "GET";
    let response = await callApi(end_point, method);
    this.saveKeyword(filterKeys, txt);
    this.renderCard(response);
    this.setState({ article: [{}], isVisible: false });
    setTimeout(() => {
      this.setState({
        article: response.length > 0 ? response : [],
        searchArticleRes: true,
        toggle: false
      });
    }, 400);
  }

  render() {
    const { textInput, DATA, isVisible, toggle, search } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <StatusBar translucent={false} backgroundColor={colors.purple} />
        <SafeAreaView style={styles.headerStyles}>
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
              onSubmitEditing={() => this.saveKeyword([], textInput)}
              onChangeText={text => this.setState({ textInput: text })}
            />

            <EaIcon
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
        </SafeAreaView>
        {toggle ? (
          <SearchHistoryList
            data={search}
            onPress={(key, arr) => this.handleSearchHistoryListPress(key, arr)}
          />
        ) : (
          <View style={{ flex: 1 }}>{this.renderCard()}</View>
        )}
        <Modal
          isVisible={isVisible}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          avoidKeyboard={true}
          style={styles.modalStyle}
          backdropOpacity={0.8}
          onBackButtonPress={() => this.setState({ isVisible: !isVisible })}
          onBackdropPress={() => this.setState({ isVisible: !isVisible })}
        >
          <TouchableOpacity
            onPress={() => this.setState({ isVisible: false })}
            style={{ flex: 0, alignItems: "flex-end", paddingHorizontal: 10 }}
          >
            <Icon
              name="cancel"
              size={30}
              color={colors.white}
              style={styles.cancelIcon}
              onPress={() =>
                this.setState({ isVisible: !this.state.isVisible })
              }
            />
          </TouchableOpacity>
          <View style={styles.modalViewStyle}>
            <TagList
              data={DATA}
              text={textInput}
              getFilteredArtciles={(arr, txt) =>
                this.getFilteredArtciles(arr, txt)
              }
            />
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
