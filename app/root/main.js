import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  TextInput,
  WebView,
  Linking
} from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
  createStackNavigator
} from "react-navigation";
import globals from "../lib/globals";
import * as colors from "../utils/colors";
import { Provider } from "react-redux";
import store from "../redux/configureStore";
import Icon from "react-native-vector-icons/MaterialIcons";

import SplashScreen from "../components/screens/SplashScreen/Splash";
import ExploreScreen from "../components/screens/ExploreScreen/Explore";
import ArticleRenderScreen from "../components/screens/ArticleRenderScreen/ArticleRender";
import SearchedArticleRender from "../components/screens/SearchedArticle/SearchedArticleRender";
import FavoriteScreen from "../components/screens/FavoriteScreen/Favorite";
import HistoryScreen from "../components/screens/HistoryScreen/History";
import SearchScreen from "../components/screens/Search/Search";
import styles from "./mainDrawerStyles";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;

class Main extends Component {
  renderStatusBar() {
    if (Platform.OS === "android") {
      return <StatusBar translucent={false} backgroundColor={colors.purple} />;
    }

    return (
      <StatusBar
        barStyle="light-content"
        translucent={false}
        backgroundColor={colors.purple}
      />
    );
  }

  render() {
    const ArticleFeedScreen = createStackNavigator(
      {
        Article: {
          screen: ExploreScreen,
          navigationOptions: {
            headerTitle: "Explore",
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: colors.white
          }
        },
        ArticleFeed: {
          screen: ArticleRenderScreen,
          navigationOptions: {
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: colors.white
          }
        },
        SearchFeed: {
          screen: SearchScreen,
          navigationOptions: {
            headerMode: "none"
          }
        },
        SearchedFeed: {
          screen: SearchedArticleRender,
          navigationOptions: {
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: colors.white
          }
        }
      },
      {
        initialRouteName: "Article"
      }
    );

    const FavoriteFeedScreen = createStackNavigator(
      {
        FavoriteFeed: {
          screen: FavoriteScreen,
          navigationOptions: {
            headerTitle: "Favorites",
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: colors.white
          }
        },
        ArticleFeed: {
          screen: ArticleRenderScreen,
          navigationOptions: {
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: colors.white
          }
        },
        SearchFeed: {
          screen: SearchScreen,
          navigationOptions: {
            headerMode: "none"
          }
        },
        SearchedFeed: {
          screen: SearchedArticleRender,
          navigationOptions: {
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: colors.white
          }
        }
      },
      {
        initialRouteName: "FavoriteFeed"
      }
    );

    const HistoryFeedScreen = createStackNavigator(
      {
        HistoryFeed: {
          screen: HistoryScreen,
          navigationOptions: {
            headerTitle: "History",
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: colors.white
          }
        },
        ArticleFeed: {
          screen: ArticleRenderScreen,
          navigationOptions: {
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: colors.white
          }
        },
        SearchFeed: {
          screen: SearchScreen,
          navigationOptions: {
            headerMode: "none"
          }
        },
        SearchedFeed: {
          screen: SearchedArticleRender,
          navigationOptions: {
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: colors.white
          }
        }
      },
      {
        initialRouteName: "HistoryFeed"
      }
    );

    const HomeWithTabs = createBottomTabNavigator(
      {
        Explore: {
          screen: ArticleFeedScreen,
          navigationOptions: {
            title: "Explore",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="public" size={27} color={tintColor} />
            )
          }
        },
        Favorites: {
          screen: FavoriteFeedScreen,
          navigationOptions: {
            title: "Favorites",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="favorite" size={27} color={tintColor} />
            )
          }
        },
        History: {
          screen: HistoryFeedScreen,
          navigationOptions: {
            title: "History",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="history" size={27} color={tintColor} />
            )
          }
        }
      },
      {
        navigationOptions: {
          tabBarVisible: true
        },
        lazy: true,
        initialRouteName: "Explore",
        backBehavior: "initialRoute",
        tabBarOptions: {
          activeTintColor: colors.purple,
          inactiveTintColor: colors.gray,
          allowFontScaling: false
        }
      }
    );

    const CustomDrawerContentComponent = props => (
      <ScrollView style={{ backgroundColor: colors.grey }}>
        <StatusBar
          barStyle="light-content"
          translucent={false}
          backgroundColor={"red"}
        />
        {this.renderStatusBar()}

        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          {/* <DrawerItems {...props} /> */}
          <View style={styles.drawerBackground}>
            <View style={styles.imageBackground}>
              <Image
                resizeMode={Platform.OS === "ios" ? "center" : "contain"}
                source={{ uri: "http://www.f418.eu/share/f418.png" }}
                style={styles.drawerImageStyle}
              />
            </View>

            <Text style={styles.drawerText}>
              {
                "We aim to make the prototyping step of the Design Thinking process more accessible to everybody."
              }
            </Text>
            <Text style={styles.drawerText}>
              {
                "This app offers both inexperienced and professional design thinkers information to learn about different rapid prototyping methods."
              }
            </Text>
            <Text style={styles.drawerText}>
              {
                "It helps you decide on which method is most suitable to their challenge."
              }
            </Text>
            <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', marginTop: 7, paddingLeft: 5}}>
              <Icon name="copyright" size={20} color={colors.black}/>
              <Text style={[styles.drawerText, {marginTop: 0}]}>
                Florian Greil, April 2019
              </Text>
            </View>
            <Text style={{ paddingLeft: 10, marginTop: 5, color: colors.purple }} onPress={() => {
              Linking.canOpenURL('http://linkedin.com/in/fgreil')
                .then(supported => {
                  if (!supported) {
                    console.log("Can't handle url: " + 'http://linkedin.com/in/fgreil');
                    return null;
                  } else {
                    return Linking.openURL('http://linkedin.com/in/fgreil');
                  }
        })
        .catch(err => console.error("An error occurred", err));
            }}>{'http://linkedin.com/in/fgreil'}</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    );

    const AppNavigation = createDrawerNavigator(
      {
        HomeNavigation: createStackNavigator(
          {
            BottomTab: HomeWithTabs
          },
          {
            initialRouteName: "BottomTab",
            headerMode: "none"
          }
        )
      },
      {
        drawerWidth: globals.deviceWidth - globals.deviceWidth / 3,
        drawerPosition: "left",
        initialRouteName: "HomeNavigation",
        contentComponent: CustomDrawerContentComponent,
        headerMode: "none"
      }
    );

    const Stack = createAppContainer(
      createSwitchNavigator(
        {
          Splash: SplashScreen,
          App: AppNavigation
        },
        {
          initialRouteName: "Splash"
        }
      )
    );

    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}

export default Main;
