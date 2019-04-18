import React, { Component } from "react";
import { View, Text, Image, ScrollView, Platform, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import RNMarkdownFormatter from "react-native-markdown-formatter";
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
    return {
      headerTitle: navigation.getParam("headerTitle", " "),
      headerRight: (
        <Icon
          style={styles.menuIcon}
          name="favorite"
          color={navigation.getParam("ic_color", " ") || colors.white}
          size={27}
          onPress={navigation.getParam("saveArticle")}
        />
      )
    };
  };

  saveArticle = () => {
    const { navigation } = this.props;
    let article = navigation.getParam("param", " ");
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

  componentWillUnmount() {
    const { navigation } = this.props;
    navigation.setParams({ saveArticle: null });
    navigation.setParams({ ic_color: null });
  }

  render() {
    const { navigation } = this.props;

    const article = navigation.getParam("param", " ");
    let textBlockComputedStyle = [];

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
            <View style={styles.descriptionViewStyle}>
              <RNMarkdownFormatter
                defaultStyles={[]} // or textBlockComputedStyle
                numberOfLines={0} // 1(no wrap text) or 0(wrap text)
                text={`${index + 1 + ". "}${step}`}
                regexArray={[
                  {
                    type: "hyperlink",
                    styles: [styles.hyperlinkText],
                    pattern: ["[]()"],
                    patternType: "asymmetric",
                    groups: 2
                  },
                  {
                    type: "italic",
                    styles: [],
                    pattern: ["*"],
                    patternType: "symmetric",
                    groups: 1
                  }
                ]}
              />
            </View>
          ))}
          <Text style={[styles.headerTextStyle, { paddingTop: 12 }]}>
            {"Description"}
          </Text>
          <View style={styles.descriptionViewStyle}>
            <RNMarkdownFormatter
              defaultStyles={textBlockComputedStyle} // or textBlockComputedStyle
              numberOfLines={0} // 1(no wrap text) or 0(wrap text)
              text={article.description}
              regexArray={[
                {
                  type: "",
                  styles: [],
                  pattern: ["\\$[\\s+](.*?)[\\n|\\r]"],
                  patternType: "custom",
                  groups: 1
                },
                {
                  type: "hyperlink",
                  styles: [styles.hyperlinkText],
                  pattern: ["[]()"],
                  patternType: "asymmetric",
                  groups: 2
                },
                {
                  type: "italic",
                  styles: [],
                  pattern: ["*"],
                  patternType: "symmetric",
                  groups: 1
                }
              ]}
            />
          </View>
          <Text style={styles.headerTextStyle}>{"References"}</Text>
          {Object.keys(article.references).map((item, index) => {
            return (
              <View style={styles.descriptionViewStyle} key={index}>
                <RNMarkdownFormatter
                  defaultStyles={[]}
                  numberOfLines={0}
                  text={`[${index + 1}]${" " + article.references[item]}`}
                  regexArray={[
                    {
                      type: "bullet",
                      styles: [styles.bullet],
                      pattern: ["\\$[\\s+](.*?)[\\n|\\r]"],
                      patternType: "custom",
                      groups: 1
                    },
                    {
                      type: "hyperlink",
                      styles: [styles.hyperlinkText],
                      pattern: ["[]()"],
                      patternType: "asymmetric",
                      groups: 2
                    },
                    {
                      type: "italic",
                      styles: [],
                      pattern: ["*"],
                      patternType: "symmetric",
                      groups: 1
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
