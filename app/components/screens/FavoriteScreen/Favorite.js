import React from "react";
import {
  View,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import { addToFavs } from "../../../redux/actions/UserClick_Action";
import realm from "../../../database/realmDB";

class Favorite extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: []
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
    let data = realm.objects("Favourites")[0]
      ? JSON.parse(realm.objects("Favourites")[0].data)
      : [];
    this.setState({ favorites: data });
    this.props.addToFavs(data);
  }

  static getDerivedStateFromProps(props, state) {
    let data = props.UserFav ? props.UserFav.UserFav : [];

    return {
      favorites: data
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle="light-content" />

        {this.props.UserFav &&
        this.props.UserFav.UserFav &&
        this.props.UserFav.UserFav.length !== 0 ? (
          <FlatList
            data={this.state.favorites}
            keyExtractor={(x, i) => i.toString()}
            extraData={this.state}
            renderItem={({ item }) => (
              <View style={styles.containerListStyle}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    this.props.navigation.navigate("ArticleFeed", {
                      param: item
                    })
                  }
                >
                  <Text style={styles.titleListStyle}>{item.title}</Text>
                </TouchableOpacity>
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
  const { UserFav } = state;

  return { UserFav };
};

export default connect(
  mapStateToProps,
  {
    addToFavs
  }
)(Favorite);
