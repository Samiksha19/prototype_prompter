import React, { Component } from "react";
import { View, Text, Image, ScrollView, Platform } from "react-native";
import styles from "./styles";

class ArticleRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "history"
    };
  }

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
          <Text style={styles.descriptionTextStyle}>{article.teaser}</Text>
          <View style={styles.tableStyles}>
            <View style={[styles.propertiesStyle, { flex: 1 }]}>
              <Text
                style={[styles.headerTextStyle, { flex: 1, paddingBottom: 4 }]}
              >
                {"Duration: "}
              </Text>
              <Text style={[styles.descriptionTextStyle, { flex: 1 }]}>
                {article.properties.propDuration}
              </Text>
            </View>
            <View style={[styles.propertiesStyle, { flex: 1 }]}>
              <Text
                style={[styles.headerTextStyle, { flex: 1, paddingBottom: 4 }]}
              >
                {"Evaluation Time: "}
              </Text>
              <Text style={[styles.descriptionTextStyle, { flex: 1 }]}>
                {article.properties.propEvaluationType}
              </Text>
            </View>
            <View style={[styles.propertiesStyle, { flex: 1 }]}>
              <Text
                style={[styles.headerTextStyle, { flex: 1, paddingBottom: 4 }]}
              >
                {"Time Dependency: "}
              </Text>
              <Text style={[styles.descriptionTextStyle, { flex: 1 }]}>
                {article.properties.propTimeDependency}
              </Text>
            </View>
          </View>
          <Text style={styles.headerTextStyle}>{"Short instructions"}</Text>
          {article.steps.map((step, index) => (
            <Text
              key={index}
              style={[styles.descriptionTextStyle, { paddingBottom: 4 }]}
            >
              {index + 1 + ". "} {step}
            </Text>
          ))}
          <Text style={[styles.headerTextStyle, { paddingTop: 12 }]}>
            {"Description"}
          </Text>
          <Text style={styles.descriptionTextStyle}>{article.description}</Text>
          <Text style={styles.headerTextStyle}>{"References"}</Text>
          {article.references.kit !== undefined ? (
            <Text style={styles.descriptionTextStyle}>
              {article.references.kit}
            </Text>
          ) : null}
          {article.references.url1 !== undefined ? (
            <Text style={styles.descriptionTextStyle}>
              {article.references.url1}
            </Text>
          ) : null}
          {article.references.ref1 !== undefined ? (
            <Text style={styles.descriptionTextStyle}>
              {article.references.ref1}
            </Text>
          ) : null}
          {article.references.anotherNotYetUsedLabel !== undefined ? (
            <Text style={styles.descriptionTextStyle}>
              {article.references.anotherNotYetUsedLabel}
            </Text>
          ) : null}
          {article.references.randomLabel !== undefined ? (
            <Text style={styles.descriptionTextStyle}>
              {article.references.randomLabel}
            </Text>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

export default ArticleRender;
