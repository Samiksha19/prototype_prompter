import React, { Component } from "react";
import { View, Text, Image, ScrollView, Platform, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FaIcon from 'react-native-vector-icons/SimpleLineIcons'
import RNMarkdownFormatter from "../../RNMarkdownFormatter";
import realm from "../../../database/realmDB";
import * as colors from "../../../utils/colors";
import {
  addToFavs,
  deleteFromFavs
} from "../../../redux/actions/UserClick_Action";
import styles from "./styles";
import { connect } from "react-redux";

class ArticleRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "history",
      icon_color: this.props.navigation.getParam("icon_color", " ")
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ saveArticle: this.saveArticle });
    navigation.setParams({ ic_color: this.state.icon_color });
    let tab = navigation.getParam("tab", " ");
    this.setState({ tab });
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    let article = navigation.getParam("param", " ");
    let headerComponent = article.icon_color && article.icon_color == colors.red ? <Icon
      name="favorite"
      style={styles.menuIcon}
      color={colors.white}
      size={27}
      onPress={navigation.getParam("saveArticle")}
      /> : <FaIcon
        name="heart"
        style={styles.menuIcon}
        color={colors.white}
        size={27}
        onPress={navigation.getParam("saveArticle")}
      />
    return {
      headerTitle: navigation.getParam("headerTitle", " "),
      headerRight: (
        headerComponent
      )
    };
  };

  saveArticle = () => {
    const { navigation } = this.props;
    let article = navigation.getParam("param", " ");

    console.log(article);

    let realmData = realm.objects("Favourites");
    let prev_user_favs = realmData[0] ? JSON.parse(realmData[0].data) : [];
    let check = false;

    for (const index of prev_user_favs) {
      if (article.title === index.title) {
        prev_user_favs = prev_user_favs.filter(item => item !== index);
        article.icon_color = colors.white;
        check = true;
      }
    }
    let newData;
    if (check) {
      realm.write(() => {
        realmData[0].data = JSON.stringify(prev_user_favs);
      });
      this.props.deleteFromFavs(prev_user_favs);
      Alert.alert("Alert", "Article has been deleted from favorites", [
        {
          text: "OK",
          onPress: () => {
            if (this.state.tab === "favorite") {
              this.props.navigation.goBack();
            }
          }
        }
      ]);
      this.props.navigation.setParams({ ic_color: colors.white });
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
      alert("Article has been added in favorites");
      this.props.navigation.setParams({ ic_color: colors.red });
    }
  };

  renderInstructionsStep = ({ step, index }) => {
    console.warn("in");
    let index1 = step.indexOf("*");
    if (index1 === -1) {
      return (
        <View key={index} style={styles.descriptionViewStyle}>
          <RNMarkdownFormatter
            defaultStyles={[styles.teaserStyle]}
            numberOfLines={0}
            selectable={true}
            text={`${index + 1 + ". "}${step}`}
            regexArray={[
              {
                type: "hyperlink",
                styles: [styles.hyperlinkText],
                pattern: ["[]()"],
                patternType: "asymmetric",
                groups: 2
              }
            ]}
          />
        </View>
      );
    } else {
      let index2 = step.indexOf("*", index1);
      let str1 = step.slice(0, index1);
      let str2 = step.slice(index1, index2);
      let str3 = step.slice(index2);
      console.warn(index1, index2);
      console.warn(str1, str2, str3);
    }
  };

  componentWillUnmount() {
    const { navigation } = this.props;
    navigation.setParams({ saveArticle: null });
    navigation.setParams({ ic_color: null });
  }

  renderDescription(description) {
    //let str = description;
    //let arr = str.split("");
    //debugger;
    if (false) {
      return (
        <View style={styles.descriptionViewStyle}>
          <Text>ss</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.descriptionViewStyle}>
          <RNMarkdownFormatter
            defaultStyles={[styles.teaserStyle]}
            selectable={true}
            numberOfLines={0}
            text={description || ""}
            regexArray={[
              {
                type: "hyperlink",
                styles: [styles.hyperlinkText],
                pattern: ["[]()"],
                patternType: "asymmetric",
                groups: 2
              }
            ]}
          />
        </View>
      );
    }
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
          <Text
            selectable={true}
            style={[
              styles.teaserStyle,
              { paddingBottom: 10, color: colors.black }
            ]}
          >
            {article.teaser}
          </Text>
          <View style={styles.tableStyles}>
            <View style={[styles.propertiesStyle, { flex: 1 }]}>
              <Text
                style={[styles.headerTextStyle, { flex: 1, paddingBottom: 6 }]}
              >
                {"Duration: "}
              </Text>
              <Text
                selectable={true}
                style={[styles.descriptionTextStyle, { color: colors.black }]}
              >
                {article.properties.propDuration || ""}
              </Text>
            </View>
            <View style={[styles.propertiesStyle, { flex: 1 }]}>
              <Text
                style={[styles.headerTextStyle, { flex: 1, paddingBottom: 6 }]}
              >
                {"Evaluation Time: "}
              </Text>
              <Text
                selectable={true}
                style={[styles.descriptionTextStyle, { color: colors.black }]}
              >
                {article.properties.propEvaluationType || ""}
              </Text>
            </View>
            <View style={[styles.propertiesStyle, { flex: 1 }]}>
              <Text
                style={[styles.headerTextStyle, { flex: 1, paddingBottom: 4 }]}
              >
                {"Time Dependency: "}
              </Text>
              <Text
                selectable={true}
                style={[styles.descriptionTextStyle, { color: colors.black }]}
              >
                {article.properties.propTimeDependency || ""}
              </Text>
            </View>
            <View style={[styles.propertiesStyle, { flex: 1 }]}>
              <Text
                style={[styles.headerTextStyle, { flex: 1, paddingBottom: 4 }]}
              >
                {"User Participation: "}
              </Text>
              <Text
                selectable={true}
                style={[styles.descriptionTextStyle, { color: colors.black }]}
              >
                {article.properties.propUserParticipation || ""}
              </Text>
            </View>
          </View>
          <Text style={styles.headerTextStyle}>{"Short instructions"}</Text>
          {article.steps.map((step, index) => (
            <View key={index} style={styles.descriptionViewStyle}>
              <RNMarkdownFormatter
                defaultStyles={[styles.teaserStyle]}
                numberOfLines={0}
                selectable={true}
                text={`${index + 1 + ". "}${step}`}
                regexArray={[
                  {
                    type: "italic",
                    styles: [],
                    pattern: ["*"],
                    patternType: "symmetric",
                    groups: 1
                  },
                  {
                    type: "hyperlink",
                    styles: [styles.hyperlinkText],
                    pattern: ["[]()"],
                    patternType: "asymmetric",
                    groups: 2
                  }
                ]}
              />
            </View>
          ))}
          <Text style={[styles.headerTextStyle, { paddingTop: 12 }]}>
            {"Description"}
          </Text>
          {this.renderDescription(article.description)}
          <Text style={styles.headerTextStyle}>{"References"}</Text>
          {Object.keys(article.references).map((item, index) => {
            return (
              <View style={styles.descriptionViewStyle} key={index}>
                <RNMarkdownFormatter
                  defaultStyles={[styles.teaserStyle]}
                  numberOfLines={0}
                  selectable={true}
                  text={`[${index + 1}]${" " + article.references[item]}`}
                  regexArray={[
                    {
                      type: "italic",
                      styles: [],
                      pattern: ["*"],
                      patternType: "symmetric",
                      groups: 1
                    },
                    {
                      type: "hyperlink",
                      styles: [styles.hyperlinkText],
                      pattern: ["[]()"],
                      patternType: "asymmetric",
                      groups: 2
                    }
                  ]}
                />
              </View>
            );
          })}
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
