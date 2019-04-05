import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../Header/styles";
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

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
    try {
      let responseData = await fetch("http://pp.f418.eu/article/random");
      let response = await responseData.json();
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
      <View style={{ flex: 1, backgroundColor: '#EDEDED' }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <IndicatorViewPager
            style={{ flex: 1 }}
            indicator={this._renderDotIndicator()}
          >
            {
              this.state.articles.map((article) => (
                <View style={{ flex: 1, backgroundColor: '#EDEDED', paddingHorizontal: 20, paddingBottom: 65, paddingTop: 20}}>
                  <View style={{ backgroundColor : 'white', flex: 1, paddingBottom: 10 }}>
                    <Image
                      resizeMode="stretch"
                      style={styles.imageStyle}
                      source={require("../../../images/genfb.jpg")}
                    />
                    <Text style={{ marginLeft: 20, marginTop: 25, fontSize: 18, fontWeight: 'bold' }}>{article.title}</Text>
                    <Text style={{ flex: 1, margin: 20, fontSize: 15 }}>{article.teaser}{article.teaser}</Text>
                  </View>
                  <TouchableOpacity style={{ flex: 1, height: 50, width: 50, borderRadius: 25, borderColor: 'purple', backgroundColor: 'white', alignSelf: 'center', borderWidth: 2, position: 'absolute', bottom: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='autorenew' color='purple' size={28}/>
                  </TouchableOpacity>
                </View>
              ))
            }
          </IndicatorViewPager>
        </View>
      </View>
    );
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} style={{marginTop: 40}}/>;
  }
}

export default Explore;
