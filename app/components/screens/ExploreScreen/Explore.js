import React from "react";
import { View, Text, StatusBar } from "react-native";
import Header from "../../Header/Header";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../../utils/colors";

class Explore extends React.Component {
  static navigationOptions = {
    title: "Browse",
    tabBarColor: "purple",
    tabBarIcon: () => {
      return (
        //Icon.getImageSource()
        <Icon
          name="web"
          type="MaterialCommunityIcons"
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
          title={"Explore"}
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

export default Explore;
