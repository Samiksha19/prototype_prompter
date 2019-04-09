import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  TextInput
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
import { width, ICON_SIZE } from "@constants";
import * as colors from "../utils/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
// import realm from "../realm";
// import { RealmProvider } from "react-native-realm";

import SplashScreen from "../components/screens/SplashScreen/Splash";
import ExploreScreen from "../components/screens/ExploreScreen/Explore";
import ArticleRenderScreen from "../components/screens/ArticleRenderScreen/ArticleRender";
import FavoriteScreen from "../components/screens/FavoriteScreen/Favorite";
import HistoryScreen from "../components/screens/HistoryScreen/History";
import SearchScreen from "../components/screens/Search/Search";

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
            headerTintColor: "#fff"
          }
        },
        ArticleFeed: {
          screen: ArticleRenderScreen,
          navigationOptions: {
            headerTitle: "Article",
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: "#fff"
          }
        },
        SearchFeed: {
          screen: SearchScreen,
          navigationOptions: {
            headerMode: "none"
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
            headerTitle: "Favorite",
            headerStyle: {
              backgroundColor: colors.purple
            },
            headerTintColor: "#fff"
          }
        },
        SearchFeed: {
          screen: SearchScreen,
          navigationOptions: {
            headerMode: "none"
          }
        }
      },
      {
        initialRouteName: "FavoriteFeed"
      }
    );

    const HistoryFeedScreen = createStackNavigator({
      HistoryFeed: {
        screen: HistoryScreen,
        navigationOptions: {
          headerTitle: "History",
          headerStyle: {
            backgroundColor: colors.purple
          },
          headerTintColor: "#fff"
        }
      },
      SearchFeed: {
        screen: SearchScreen,
        navigationOptions: {
          headerMode: "none"
        }
      }
    });

    const HomeWithTabs = createBottomTabNavigator(
      {
        Explore: {
          screen: ArticleFeedScreen,
          navigationOptions: {
            title: "Explore",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="public" size={ICON_SIZE} color={tintColor} />
            )
          }
        },
        Favorite: {
          screen: FavoriteFeedScreen,
          navigationOptions: {
            title: "Favorite",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="favorite" size={ICON_SIZE} color={tintColor} />
            )
          }
        },
        History: {
          screen: HistoryFeedScreen,
          navigationOptions: {
            title: "History",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="history" size={ICON_SIZE} color={tintColor} />
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
          <View
            style={{
              flex: 1,
              backgroundColor: colors.grey,
              marginBottom: 40
            }}
          >
            <Image
              source={require("../images/drawerImage.jpeg")}
              style={{
                width: width,
                height: 200,
                backgroundColor: colors.purple
              }}
            />

            <Text
              style={{
                flex: 1,
                fontSize: 14,
                fontWeight: "100",
                marginHorizontal: 8,
                marginTop: 8
              }}
            >
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
            </Text>
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
        drawerWidth: width - width / 3,
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
      //   <RealmProvider realm={realm}>
      <Stack />
      //   </RealmProvider>
    );
  }
}

export default Main;
