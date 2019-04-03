import React, { Component } from "react";
import { Text, View } from 'react-native';
import styles from "./styles";
import Header from '../../../components/Header/Header';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
      }
  
    render() {
        return(
            <View style={styles.container}>
            <Header
                title={'Search'}
                isDrawer={false}
                back={() => {this.props.navigation.goBack(null)}}/>
            <Text style={styles.welcomeTxt}>Search</Text>
            </View>
        )
    }
  }
