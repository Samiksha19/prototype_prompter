import React from "react";
import { View, Text } from "react-native";
import Header from "../../Header/Header";

class History extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Header
          title={"History"}
          isDrawer={true}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text>History</Text>
        <Text>History</Text>
        <Text>History</Text>
        <Text>History</Text>
        <Text>History</Text>
      </View>
    );
  }
}

export default History;
