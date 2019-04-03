import React from "react";
import { View, Text, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "../../Header/Header";

class History extends React.Component {
  static navigationOptions = {
    title: "List",
    tabBarColor: "purple",
    tabBarIcon: () => {
      return (
        <Icon name="view-list" type="MaterialIcons" size={22} color="purple" />
      );
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header
          title={"History"}
          isDrawer={true}
          onPress={() => navigation.toggleDrawer()}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#000" }}>Under Development</Text>
        </View>
      </View>
    );
  }
}

export default History;
