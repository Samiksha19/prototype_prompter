import React, { Component } from "react";
import { View, Text, Image, ScrollView, Platform } from "react-native";
import * as colors from "../../../utils/colors";
import styles from "./styles";

class SearchedArticleRender extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerTitle: navigation.getParam("headerTitle", " ")
    };
  };

  render() {
    const { navigation } = this.props;
    const article = navigation.getParam("param", " ");

    return (
      <View style={styles.containerStyle}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <Text style={[styles.headerTextStyle, { paddingTop: 10 }]}>
            {article.title}
          </Text>
          <View style={styles.imageViewStyle}>
            <Image
              resizeMode={Platform.OS === "ios" ? "center" : "contain"}
              source={{ uri: article.image }}
              style={[styles.imageStyle, { marginBottom: 15 }]}
            />
          </View>
          <Text
            selectable={true}
            style={[
              styles.teaserStyle,
              { paddingBottom: 10, color: colors.black }
            ]}
          >
            {article.teaser}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default SearchedArticleRender;
