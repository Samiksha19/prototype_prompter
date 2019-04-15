import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import _ from "lodash";
import { connect } from "react-redux";
import { addToHistory } from "../../../redux/actions/UserClick_Action";

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      historyArticles: []
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

  componentDidMount() {
    let data = realm.objects("History")[0]
      ? JSON.parse(realm.objects("History")[0].data)
      : [];
    var grouped = _.mapValues(_.groupBy(data, "date"), clist =>
      clist.map(article => article)
    );
    let nested_data = [];
    Object.keys(grouped).map(v =>
      nested_data.push({ title: v, data: grouped[v] })
    );
    this.setState({
      historyArticles: nested_data
    });
    this.props.addToHistory(data);
  }

  static getDerivedStateFromProps(props, state) {
    let data = props.UserData ? props.UserData.UserData : [];
    var grouped = _.mapValues(_.groupBy(data, "date"), clist =>
      clist.map(article => article)
    );
    let nested_data = [];
    Object.keys(grouped).map(v =>
      nested_data.push({ title: v, data: grouped[v] })
    );
    return {
      historyArticles: nested_data
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.UserData &&
        this.props.UserData.UserData &&
        this.props.UserData.UserData.length !== 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={this.state.historyArticles}
            extraData={this.state}
            keyExtractor={(item, index) => item + index}
            renderItem={(article, index) => (
              <View key={index} style={styles.cardStyle}>
                <Text style={styles.titleStyle}>{article.item.title}</Text>
                {article.item.data.map((item, index) => (
                  <View style={styles.dataStyle} key={index}>
                    <Image
                      resizeMode="contain"
                      style={styles.imageStyle}
                      source={{ uri: item.image }}
                    />
                    <Text style={styles.titleTextStyle}>{item.title}</Text>
                  </View>
                ))}
              </View>
            )}
          />
        ) : (
          <View style={styles.blankScreenStyle}>
            <Text>{"No Articles Added"}</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { UserData } = state;

  return { UserData };
};

export default connect(
  mapStateToProps,
  { addToHistory }
)(History);
