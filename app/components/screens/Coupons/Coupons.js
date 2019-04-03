import React, { Component } from "react";
import {Text, View } from 'react-native';
import styles from "./styles";
import Header from '../../../components/Header/Header';

export default class Coupons extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
      }
  
    render() {
        return(
            <View style={styles.container}>
            <Header
                title={'Coupons'}
                isDrawer={false}
                back={() => {this.props.navigation.goBack(null)}}/>
            <Text style={styles.welcomeTxt}>Coupons</Text>
            </View>
        )
    }
  }
