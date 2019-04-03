/**Drawer left menu */
import React, {Component} from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import styles from './styles';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this
      .props
      .navigation);
  }
  render() {
     return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.subContainer} onPress={()=>{}}>
          <Text style={styles.menuTxt}>Home</Text>
        </TouchableOpacity>
      </View>

    );
  }
}



export default (SideBar);
