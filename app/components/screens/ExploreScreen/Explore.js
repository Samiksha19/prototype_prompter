import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../Header/styles";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;

class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      arr: null,
      loader: true
    };
  }

  async componentDidMount() {
    try {
      let responseData = await fetch("http://pp.f418.eu/article/random");
      let response = await responseData.json();
      this.setState({
        arr: response,
        loader: false
      });
    } catch (err) {
      alert(err);
    }
  }

  _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.cardStyle}>
        <Image
          resizeMode="stretch"
          style={styles.imageStyle}
          source={require("../../../images/genfb.jpg")}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            wordWrap: "break-word"
          }}
        >
          <Text numberOfLines={2} style={{ fontSize: 17, marginVertical: 20 }}>
            {item.title}
          </Text>
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 8,
              fontSize: 15
            }}
          >
            {item.teaser}
          </Text>
        </View>
      </View>
    );
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

  renderContent() {
    if (this.state.loader) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    }

    return (
      <Carousel
        data={this.state.arr}
        renderItem={this._renderItem}
        windowSize={1}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        layout={"tinder"}
        layoutCardOffset={18}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              marginHorizontal: 12,
              marginVertical: 18,
              borderRadius: 12,
              elevation: 1,
              zIndex: 99
            }}
          >
            {this.renderContent()}
          </View>
        </View>
      </View>
    );
  }
}

export default Explore;
