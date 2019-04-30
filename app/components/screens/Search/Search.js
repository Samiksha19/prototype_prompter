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
    let newArr = [];
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
    let end_point = `search/${keyword}/` + this.state.filterTags;
    let method = "GET";
    try {
      let response = await callApi(end_point, method);
      this.setState(
        {
          article: response.length > 0 ? response : [],
          searchArticleRes: true,
          toggle: false
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
        <ScrollView
          contentContainerStyle={{
            flex: 1
          }}
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
    this.setState({ toggle: false, textInput: key });
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
        </SafeAreaView>
        {toggle ? (
          <SearchHistoryList
            data={search}
            onPress={key => this.handleSearchHistoryListPress(key)}
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
          backdropOpacity={0.2}
          onBackButtonPress={() => this.setState({ isVisible: !isVisible })}
          onBackdropPress={() => this.setState({ isVisible: !isVisible })}
        >
          <Icon
            name="cancel"
            size={27}
            color={colors.red}
            style={styles.cancelIcon}
            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
          />
          <View style={styles.modalViewStyle}>
            <TagList data={DATA} />
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
