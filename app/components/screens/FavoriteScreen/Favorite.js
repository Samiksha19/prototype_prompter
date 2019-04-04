import React from "react";
import { View, Text, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../Header/styles";

class Favorite extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Icon
          style={styles.menuIcon}
          name="menu"
          onPress={() => navigation.toggleDrawer()}
          color="#fff"
          size={27}
        />
      ),
      headerRight: (
        <Icon
          style={styles.menuIcon}
          name="search"
          color="#fff"
          size={27}
          onPress={() => navigation.navigate("SearchFeed")}
        />
      )
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <StatusBar translucent={false} barStyle="light-content" />
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
