import React from "react";
import { View, FlatList, StatusBar, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import List from "../../List/List";

const Realm = require("realm");
class Favorite extends React.Component {
  state = {
    articles: []
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

  async componentDidMount() {
    Realm.open(
      {
        schema: [
          {
            name: "Article",
            properties: {
              description: "string",
              image: "string",
              label: "string",
              language: "string",
              steps: "data",
              tags: "data",
              teaser: "string",
              title: "string"
            }
          }
        ],
        schemaVersion: 1
      },
      schema
    ).then(realm => {
      let res = realm.objects("Article");
      let parsed_res = JSON.parse(res);
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <FlatList
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center"
          }}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          data={this.state.articles}
          keyExtractor={(x, i) => i.toString()}
          //ListEmptyComponent={this.renderText}
          extraData={this.state.articles}
          //renderItem={({ item }) => <List key={item.ProductID} obj={item} />}
          showsVerticalScrollIndicator={false}
          //ListHeaderComponent={this.renderHeader}
          //ListFooterComponent={this.renderFooter}
          //ItemSeparatorComponent={this.renderSeparator}
          //refreshing={this.state.refreshing}
          //onRefresh={this.handleRefresh}
          //onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
        />
      </View>
    );
  }
}

export default Favorite;
