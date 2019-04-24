import React from "react";
import {
  View,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import * as colors from "../../../utils/colors";
import {
  addToFavs,
  deleteFromFavs
} from "../../../redux/actions/UserClick_Action";
import Swipeout from "react-native-swipeout";
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

  saveArticle(article) {
    let realmData = realm.objects("Favourites");
    let previousArticles = realmData[0] ? JSON.parse(realmData[0].data) : [];
    let check = false;
    for (const index of previousArticles) {
      if (article.title === index.title) {
        previousArticles = previousArticles.filter(item => item !== index);
        article.icon_color = colors.white;
        check = true;
      }
    }
    let newData;
    if (check) {
      realm.write(() => {
        realmData[0].data = JSON.stringify(previousArticles);
      });
      this.props.deleteFromFavs(previousArticles);
      alert("Article is removed from favorites");
      this.setState({ icon_color: colors.white });
    } else {
      article.icon_color = colors.red;
      newData = previousArticles.concat([article]);
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
      this.props.addToFavs(newData);
      alert("Article is added in favorites");
      this.setState({ icon_color: colors.red });
    }
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
            showsVerticalScrollIndicator={false}
            keyExtractor={(x, i) => i.toString()}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <Swipeout
                right={[
                  {
                    component: (
                      <View style={styles.removeStyle}>
                        <Icon name="delete" size={27} color={colors.white} />
                        <Text style={styles.removeTextStyle}>{"Remove"}</Text>
                      </View>
                    ),
                    backgroundColor: colors.white,
                    color: colors.purple,
                    underlayColor: colors.white,
                    onPress: () => {
                      Alert.alert(
                        "Alert",
                        "Article will be removed from favorites",
                        [
                          {
                            text: "OK",
                            onPress: () => {
                              this.saveArticle(item);
                            }
                          },
                          {
                            text: "Cancel",
                            onPress: () => {},
                            cancelable: true
                          }
                        ]
                      );
                    }
                  }
                ]}
                autoClose={true}
                key={index}
                style={styles.containerListStyle}
              >
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      this.props.navigation.navigate("ArticleFeed", {
                        param: item,
                        headerTitle: item.title,
                        icon_color: item.icon_color,
                        tab: "favorite"
                      })
                    }
                  >
                    <Text style={styles.titleListStyle}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              </Swipeout>
            )}
            ListFooterComponent={
              <View style={{ height: 0, marginBottom: 90 }} />
            }
          />
        ) : (
          <View style={styles.blankScreenStyle}>
            <View style={styles.iconContainerStyle}>
              <Icon
                name="favorite"
                size={50}
                style={styles.largeIconStyle}
                color={colors.gray}
              />
            </View>
            <Text style={styles.blankScreenHeaderTextStyle}>
              {"No Favorite to show"}
            </Text>
            <Text style={styles.detailTextStyle}>
              {"Your favorite article will be displayed here"}
            </Text>
            <Text
              style={[
                styles.detailTextStyle,
                { paddingVertical: 0, bottom: 5 }
              ]}
            >
              {"These are saved for offline access also."}
            </Text>
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
    addToFavs,
    deleteFromFavs
  }
)(Favorite);
