import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Platform
} from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from "react-navigation";
//import { Provider } from "react-redux";
//import store from "../redux/configureStore";
//import Drawer from "../components/navigator/Drawer";
import { width, STATUSBAR_HEIGHT } from "@constants";
import * as colors from "../utils/colors";
import SplashScreen from "../components/screens/SplashScreen/Splash";
import ExploreScreen from "../components/screens/ExploreScreen/Explore";
import FavoriteScreen from "../components/screens/FavoriteScreen/Favorite";
import HistoryScreen from "../components/screens/HistoryScreen/History";
/** allowfontscaling is to avoid fontscaling when device fonts are changed */
//Text.defaultProps.allowFontScaling = false;
//TextInput.defaultProps.allowFontScaling = false;

class Main extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {};
  //   }

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
    const HomeWithTabs = createBottomTabNavigator(
      {
        Explore: ExploreScreen,
        Favorite: FavoriteScreen,
        History: HistoryScreen
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
          inactiveTintColor: colors.gray
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
              //resizeMode="contain"
              source={require("../images/default.jpg")}
              style={{
                width: width,
                height: 200,
                backgroundColor: colors.purple
              }}
            />

            <Text
              style={{
                flex: 1,
                fontSize: 13,
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
        HomeNavigation: HomeWithTabs
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
      // <Provider store={store} >
      <Stack />
      // </Provider>
    );
  }
}
//screen added in stack navigator
// const Stack = createStackNavigator(
//   {
//     Drawer: {
//       screen: Drawer,
//       title: Drawer,
//       navigationOptions: {
//         header: null
//       }
//     }
//   },
//   { initialRouteName: "Drawer" }
// );

export default Main;
