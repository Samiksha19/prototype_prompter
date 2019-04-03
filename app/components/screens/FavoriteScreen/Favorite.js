import React from "react";
import { View, Text } from "react-native";
import Header from "../../Header/Header";

class Favorite extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Header
          title={"Favorite"}
          isDrawer={true}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text>Favorite</Text>
        <Text>Favorite</Text>
        <Text>Favorite</Text>
        <Text>Favorite</Text>
        <Text>Favorite</Text>
      </View>
    );
  }
}

export default Favorite;
