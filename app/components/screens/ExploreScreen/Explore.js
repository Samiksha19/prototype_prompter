import React from "react";
import { View, Text } from "react-native";
import Header from "../../Header/Header";
import { DrawerActions } from "react-navigation";

class Explore extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Header
          title={"Explore"}
          isDrawer={true}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text>ExploreScreen</Text>
        <Text>ExploreScreen</Text>
        <Text>ExploreScreen</Text>
        <Text>ExploreScreen</Text>
        <Text>ExploreScreen</Text>
      </View>
    );
  }
}

export default Explore;
