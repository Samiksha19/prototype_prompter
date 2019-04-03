import React from "react";
import { View, Text, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Header from "../../Header/Header";

class Favorite extends React.Component {
  static navigationOptions = {
    title: "Favorite",
    tabBarColor: "purple",
    tabBarIcon: () => {
      return (
        <Icon
          name="favorite-border"
          type="MaterialIcons"
          size={22}
          color="purple"
        />
      );
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header
          title={"Favorite"}
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

export default Favorite;
