import React from "react";
import { View, FlatList, StatusBar, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import FavoriteList from "../../FavoriteList/FavoriteList";
import * as colors from "../../../utils/colors";
import realm from "../../../database/realmDB";

const Realm = require("realm");
class Favorite extends React.Component {
  state = {
    favorites: []
  };

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
    this.setState(
      {
        favorites: JSON.parse(realm.objects("Favourites")[0].data)
      },
      () => {
        console.warn(this.state.favorites);
      }
    );
    debugger;
  }

  render() {
    return (
        <FlatList
        data={this.state.favorites}
        keyExtractor={(x, i) => i.toString()}
        extraData={this.state.favorites}
        renderItem={({ item }) => (
          <FavoriteList key={item.title} obj={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default Favorite;
