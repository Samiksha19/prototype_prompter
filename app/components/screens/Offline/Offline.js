import React, { PureComponent } from "react";
import { View, Text, NetInfo, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as colors from "../../../utils/colors";
import styles from "./styles";

class Offline extends PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type === "none") {
        this.setState({ isConnected: false });
      }
    });

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };
  render() {
    if (!this.state.isConnected) {
      return (
        <View style={styles.containerStyle}>
          <Image
            source={require("../../../images/CheckConnection.png")}
            style={styles.offline_imageStyle}
          />
          <Text style={styles.offline_textStyle}>
            {
              "Problems connecting to the server. Please check your connection or try again"
            }
          </Text>
          <View style={styles.refreshViewStyle}>
            <Text style={styles.refresh}>Retry</Text>
            <Icon
              name="refresh"
              color={colors.white}
              size={28}
              onPress={() => {
                this.props.retryApiCall();
              }}
            />
          </View>
        </View>
      );
    }
    return null;
  }
}

export default Offline;
