import React from "react";
import { View, FlatList, StatusBar, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import FavoriteList from "../../FavoriteList/FavoriteList";
import * as colors from "../../../utils/colors";
import realm from "../../../database/realmDB";

const Realm = require("realm");

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
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.grey, paddingBottom: 5 }}>
        <StatusBar translucent={false} barStyle="light-content" />
        {this.state.favorites.length !== 0 ? (
          <FlatList
            data={this.state.favorites}
            keyExtractor={(x, i) => i.toString()}
            extraData={this.state.favorites}
            renderItem={({ item }) => (
              <FavoriteList key={item.title} obj={item} />
            )}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No Articels Added</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Favorite;
