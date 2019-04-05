import React from "react";
import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../Header/styles";
import * as colors from "../../../utils/colors";
import callApi from "../../../lib/apicaller";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";

class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loader: true
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

  async componentDidMount() {
    let end_point = "random";
    let method = "GET";
    try {
      let response = await callApi(end_point, method);
      this.setState({
        articles: response,
        loader: false
      });
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#EDEDED" }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <IndicatorViewPager
          style={{ flex: 1 }}
          indicator={this._renderDotIndicator()}
        >
          {this.state.articles.map(article => (
            <View style={styles.mainCarouselStyle}>
              <TouchableOpacity
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
                  resizeMode="stretch"
                  style={styles.imageStyle}
                  source={require("../../../images/genfb.jpg")}
                />
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
                <Icon name="autorenew" color={colors.purple} size={28} />
              </TouchableOpacity>
            </View>
          ))}
        </IndicatorViewPager>
      </View>
    );
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
