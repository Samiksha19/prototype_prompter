import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ToastAndroid
} from "react-native";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";
import Icon from "react-native-vector-icons/MaterialIcons";
import NetInfo from "@react-native-community/netinfo";

import { connect } from "react-redux";
import { addToHistory } from "../../../redux/actions/UserClick_Action";

import styles from "./styles";

import * as colors from "../../../utils/colors";
import callApi from "../../../lib/apicaller";
import Offline from "../Offline/Offline";
import Loader from "../../Loader/Loader";

import realm from "../../../database/realmDB";

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
      icon_color: colors.white,
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
      headerBackTitle: null,
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

  saveArticle(article) {
    {
      this.state.icon_color === colors.white
        ? this.setState({
            icon_color: colors.red
          })
        : this.setState({
            icon_color: colors.white
          });
    }
    let realmData = realm.objects("Favourites");
    let previousArticles = realmData[0] ? JSON.parse(realmData[0].data) : [];

    let newData = previousArticles.concat([article]);
    if (Object.keys(realmData).length === 0) {
      realm.write(() => {
        realm.create("Favourites", {
          data: JSON.stringify(newData)
        });
      });
    } else {
      realm.write(() => {
        realmData[0].data = JSON.stringify(newData);
      });
    }
  }

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

  insertInHistory(selectedArticle) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let date = new Date();
    let year = date.getFullYear();
    let curr_date = date.getDate();
    let month = monthNames[date.getMonth()];
    let date_obj = `${curr_date} ${month} ${year}`;

    let article = selectedArticle;
    article.date = date_obj;

    let realmData = realm.objects("History");
    let previousArticles = realmData[0] ? JSON.parse(realmData[0].data) : [];
    let index = previousArticles.findIndex(
      article => article.title === selectedArticle.title
    );
    let newData = previousArticles.concat([article]);
    if (Object.keys(realmData).length === 0) {
      realm.write(() => {
        realm.create("History", {
          data: JSON.stringify(newData)
        });
      });
    } else {
      realm.write(() => {
        realmData[0].data = JSON.stringify(newData);
      });
    }

    this.props.addToHistory(newData);

    this.props.navigation.navigate("ArticleFeed", {
      param: article
    });
  }

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

  renderFavoriteIcon(article) {
    let db_data = realm.objects("Favourites");
    // return(
    //     <Icon
    //     name="favorite"
    //     color={this.state.icon_color}
    //     size={28}
    //     onPress={() => this.saveArticle(article)}
    //   />
    // )
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
        <View style={styles.container}>
          <StatusBar translucent={false} barStyle="light-content" />
          <IndicatorViewPager
            style={{ flex: 1 }}
            indicator={this._renderDotIndicator()}
          >
            {this.state.articles !== undefined &&
              this.state.articles.map((article, index) => (
                <View key={index} style={styles.mainCarouselStyle}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.insertInHistory(article)}
                    style={styles.touchableStyle}
                  >
                    <View style={styles.image_view_style}>
                      <Image
                        resizeMode="contain"
                        style={styles.imageStyle}
                        source={{ uri: `${article.image}` }}
                      />
                    </View>
                    <View style={styles.seperatorStyle} />
                    <View style={styles.icon_image_view_style}>
                      {/* {this.renderFavoriteIcon(article)} */}
                      <Icon
                        name="favorite"
                        color={this.state.icon_color}
                        size={28}
                        onPress={() => this.saveArticle(article)}
                      />
                    </View>
                    <Text style={styles.titleStyle}>{article.title}</Text>
                    <Text style={styles.teaserStyle}>{article.teaser}</Text>
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

const mapStateToProps = state => {
  const { UserData } = state;

  return { UserData };
};

// export default Explore;

export default connect(
  mapStateToProps,
  { addToHistory }
)(Explore);
