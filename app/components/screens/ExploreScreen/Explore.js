import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  AsyncStorage,
  NetInfo,
  ImageBackground,
  ToastAndroid
} from "react-native";
import Loader from "../../Loader/Loader";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import * as colors from "../../../utils/colors";
import callApi from "../../../lib/apicaller";
import Offline from "../Offline/Offline";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";

const end_point = "random";
const method = "GET";

class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loader: true,
      saved_articles: [],
      loading: false,
      icon_favorite: "favorite-border",
      icon_color: colors.gray,
      isConnected: true
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Icon
          style={styles.menuIcon}
          name="menu"
          onPress={() => navigation.toggleDrawer()}
          color="#fff"
          size={27}
        />
      ),
      headerBackTitle: "",
      headerRight: (
        <Icon
          style={styles.menuIcon}
          name="search"
          color="#fff"
          size={27}
          onPress={() => navigation.navigate("SearchFeed")}
        />
      )
    };
  };

  UNSAFE_componentWillMount() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type === "none") {
        this.setState({ isConnected: false });
      }
    });
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type === "none") {
        this.setState({ isConnected: false });
      }
    });
    this.handleApiCall();
  }

  async handleApiCall() {
    try {
      let response = await callApi(end_point, method);
      this.setState({
        articles: response,
        loading: false
      });
    } catch (err) {
      alert(err);
    }
  }

  //   async saveArticle(article) {
  //     this.state.icon_favorite === "favorite"
  //       ? this.setState(
  //           {
  //             icon_favorite: "favorite-border",
  //             icon_color: colors.grey
  //           },
  //           async () => {
  //             let saved_articles = await AsyncStorage.getItem("SAVED_ARTICLES");
  //             if (saved_articles === null) {
  //               await AsyncStorage.setItem(
  //                 "SAVED_ARTICLES",
  //                 JSON.stringify(article)
  //               );
  //             } else {
  //               //await AsyncStorage.setItem
  //             }
  //           }
  //         )
  //       : this.setState(
  //           {
  //             icon_favorite: "favorite",
  //             icon_color: colors.red
  //           },
  //           async () => {
  //             let saved_articles = await AsyncStorage.getItem("SAVED_ARTICLES");
  //             if (saved_articles === null) {
  //               await AsyncStorage.setItem(
  //                 "SAVED_ARTICLES",
  //                 JSON.stringify(article)
  //               );
  //             }
  //           }
  //         );
  //   }

  async refreshArticle() {
    this.setState({ loading: true });
    try {
      let response = await callApi(end_point, method);
      this.setState({
        articles: response,
        loading: false
      });
    } catch (err) {
      alert(err);
    }
  }

  handleConnectivityChange = isConnected => {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type === "none") {
        this.setState({ isConnected: false });
      } else {
        this.setState({ isConnected: true });
        this.handleApiCall();
      }
    });

    NetInfo.isConnected.fetch(connectionStatus => {
      if (connectionStatus === "none") {
        this.setState({ isConnected: false });
      } else {
        this.setState({ isConnected: true });
      }
    });
  };

  retryApiCall() {
    if (this.state.isConnected) {
      this.handleApiCall();
    } else {
      ToastAndroid.showWithGravity(
        "No Internet Connection!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  render() {
    if (!this.state.isConnected) {
      return (
        <View style={{ flex: 1 }}>
          <Offline retryApiCall={() => this.retryApiCall()} />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: colors.grey }}>
          <StatusBar translucent={false} barStyle="light-content" />
          <IndicatorViewPager
            style={{ flex: 1 }}
            indicator={this._renderDotIndicator()}
          >
            {this.state.articles !== undefined &&
              this.state.articles.map(article => (
                <View style={styles.mainCarouselStyle}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      this.props.navigation.navigate("ArticleFeed", {
                        param: article
                      })
                    }
                    style={{
                      backgroundColor: "white",
                      flex: 1,
                      paddingBottom: 10
                    }}
                  >
                    <Image
                      style={styles.imageStyle}
                      source={require("../../../images/genfb.jpg")}
                    />
                    <View style={styles.icon_image_view_style}>
                      <Icon
                        name={this.state.icon_favorite}
                        color={this.state.icon_color}
                        size={28}
                        //onPress={() => this.saveArticle(article)}
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 20,
                        marginTop: 25,
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      {article.title}
                    </Text>
                    <Text style={{ flex: 1, margin: 20, fontSize: 15 }}>
                      {article.teaser}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.absoluteIconStyle}>
                    <Icon
                      name="autorenew"
                      color={colors.purple}
                      size={28}
                      onPress={() => this.refreshArticle()}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </IndicatorViewPager>
          <Loader visible={this.state.loading} />
        </View>
      );
    }
  }

  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={this.state.articles.length}
        selectedDotStyle={{ backgroundColor: colors.purple }}
      />
    );
  }
}

export default Explore;
