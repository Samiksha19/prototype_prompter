// /**Tab navigator and screens used in tab are added here */
// import React, { Component } from "react";
// import { createTabNavigator } from "react-navigation";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Categories from "../screens/Categories/Categories";
// import Search from "../screens/Search/Search";
// import Coupons from "../screens/Coupons/Coupons";
// import Home from "../screens/Home/Home";

// const TabNav = createTabNavigator(
//   {
//     Search: Search
//   },
//   {
//     tabBarPosition: "bottom",
//     animationEnabled: false,
//     lazy: false,
//     overflow: "hidden",
//     tabBarOptions: {
//       initialRouteName: "Search",
//       showIcon: true,
//       inactiveTintColor: "#000",
//       activeTintColor: "#000",
//       labelStyle: {
//         fontSize: 11
//       },
//       style: {
//         backgroundColor: "white"
//       }
//     }
//   }
// );

// // const TabNav = createTabNavigator({
// //   Home: {
// //         screen: Home,
// //         navigationOptions: {
// //           title : 'Home',
// //           tabBarLabel:"Home",
// //           tabBarIcon: ({ tintColor }) => <Icon name="home" size={20} color='#000' />
// //         },

// //       },
// //       Search: {
// //         screen: Search,
// //         navigationOptions: {
// //           tabBarLabel: "Search",
// //           tabBarIcon: ({ tintColor }) => <Icon name="search" size={20} color='#000' />
// //       },
// //       },
// //       Categories: {
// //           screen: Categories,
// //           navigationOptions: {
// //               tabBarLabel: "Categories",
// //               tabBarIcon: ({ tintColor }) => <Icon name="th-large" size={20} color='#000' />
// //           },
// //         },
// //         Coupons: {
// //           screen: Coupons,
// //           navigationOptions: {
// //               tabBarLabel:"Coupons",
// //               tabBarIcon: ({ tintColor }) => <Icon name="tags"  size={20} color='#000' />
// //           },
// //         },
// //     }, {
// //       tabBarPosition: 'bottom',
// //       animationEnabled: false,
// //       lazy: false,
// //       overflow: 'hidden',
// //       tabBarOptions: {
// //       initialRouteName: 'Home',
// //       showIcon: true,
// //       inactiveTintColor : '#000',
// //         activeTintColor: '#000',
// //         labelStyle: {
// //           fontSize: 11,
// //         },
// //         style: {
// //           backgroundColor: 'white',
// //         },
// //       },
// //     });

// export default TabNav;
