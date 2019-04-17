import React, { Component } from "react";
import { View, Text, Image, ScrollView, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import realm from "../../../database/realmDB";
import * as colors from "../../../utils/colors";
import {
  addToFavs,
  deleteFromFavs
} from "../../../redux/actions/UserClick_Action";
import styles from "./styles";
import { connect } from "react-redux";

class ArticleRender extends React.Component {
  constructor(props) {
    super(props);
    console.warn(this.props.navigation.getParam("icon_color", " "));
    this.state = {
      tab: "history",
      icon_color: this.props.navigation.getParam("icon_color", " ")
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ saveArticle: this.saveArticle });
    navigation.setParams({ ic_color: this.state.icon_color });
    let icon_color = this.props.navigation.getParam("icon_color", " ");
    this.setState({ icon_color: icon_color });
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerTitle: navigation.getParam("headerTitle", " "),
      headerRight: (
        <Icon
          style={styles.menuIcon}
          name="favorite"
          color={navigation.getParam("ic_color", " ")}
          //color={}
          size={27}
          onPress={navigation.getParam("saveArticle")}
        />
      )
    };
  };

  saveArticle = () => {
    const { navigation } = this.props;
    let article = navigation.getParam("param", " ");
    debugger;
    let realmData = realm.objects("Favourites");
    let prev_user_favs = realmData[0] ? JSON.parse(realmData[0].data) : [];
    debugger;
    let check = false;

    for (const index of prev_user_favs) {
      if (article.title === index.title) {
        prev_user_favs = prev_user_favs.filter(item => item !== index);
        article.icon_color = colors.white;
        check = true;
        debugger;
      }
    }
    let newData;
    if (check) {
      realm.write(() => {
        realmData[0].data = JSON.stringify(prev_user_favs);
      });
      this.props.deleteFromFavs(prev_user_favs);
      alert("Article is removed from favorites");
      debugger;
      this.setState({ ic_color: colors.white });
    } else {
      article.icon_color = colors.red;
      newData = prev_user_favs.concat([article]);
      if (Object.keys(realmData).length === 0) {
        realm.write(() => {
          realm.create("Favourites", {
            data: JSON.stringify(newData)
          });
        });
      } else {
        realm.write(() => {
          realmData[0].data = JSON.stringify(newData);
        });
      }
      this.props.addToFavs(newData);
      alert("Article is added in favorites");
      this.setState({ ic_color: colors.red });
      debugger;
    }
  };

  componentWillUnmount() {
    this.props.navigation.setParams({ saveArticle: null });
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

const mapStateToProps = state => {
  const { UserFav } = state;

  return { UserFav };
};

export default connect(
  mapStateToProps,
  {
    deleteFromFavs,
    addToFavs
  }
)(ArticleRender);
