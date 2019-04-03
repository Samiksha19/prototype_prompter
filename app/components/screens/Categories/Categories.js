import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import Header from "../../../components/Header/Header";
//stateful component
export default class Categories extends Component {
  constructor(props) {
    //should not call setState() in the constructor()
    super(props);
    //     this.state = { counter: 0 };
    //this.handleClick = this.handleClick.bind(this);
  }

  //componentDidMount()//best place to instantiate network request, setState()

  //shouldComponentUpdate(nextProps, nextState, nextContext){
  //use for increasing performance of poor performing Components
  //do not cause any side effects (AJAX calls etc.)
  //do not call this.setState
  //}

  //componentDidUpdate(prevProps){
  //invoked after updating occurs.
  // Typical usage (don't forget to compare props):
  //if (this.props.counter !== prevProps.counter) {
  //called setState but with the above condition check to avoid infinite loop.
  //}
  //}

  //componentWillUnmount(){
  //componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
  //Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().
  //Avoid setState() in componentWillUnmount() because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.
  //}

  //componentDidCatch(errorString, errorInfo)

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={"Categories"}
          isDrawer={false}
          back={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <Text style={styles.welcomeTxt}>Categories</Text>
      </View>
    );
  }
}
