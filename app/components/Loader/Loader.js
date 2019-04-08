//loader that get called on page open
import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import styles from "./styles";
import * as colors from "../../utils/colors";
//Pure, stateless component
const Loader = props => {
  if (props.visible == true) {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        presentationStyle="overFullScreen"
      >
        <View
          style={styles.viewStyle}
          pointerEvents={props.visible ? "none" : "auto"}
        >
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.white}
          />
        </View>
      </Modal>
    );
  } else {
    return null;
  }
};

export default Loader;
