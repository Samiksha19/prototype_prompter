import React, { Component } from "react";
import {Text, View } from 'react-native';
import styles from "./styles";
import Header from '../../../components/Header/Header';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
      }
  
    render() {
        return(
            <View style={styles.container}>
            <Header
                title={'Home'}
                isDrawer={true}
                back={() => {
                this.props.navigation.openDrawer();
                }}/>
            <Text style={styles.welcomeTxt}>Home</Text>
            </View>
        )
    }
  }
