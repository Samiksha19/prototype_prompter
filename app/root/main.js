import React, { Component } from "react";
import { View, Text, TextInput, ScrollView, Image } from "react-native";
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
import { width } from "@constants";
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
        initialRouteName: "Explore"
      }
    );

    const CustomDrawerContentComponent = props => (
      <ScrollView>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          {/* <DrawerItems {...props} /> */}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image />
            <Text>Drawer</Text>
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
        contentComponent: CustomDrawerContentComponent
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
