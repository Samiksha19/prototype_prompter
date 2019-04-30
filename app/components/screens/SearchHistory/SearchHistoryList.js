import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as colors from "../../../utils/colors";
import styles from "./styles";

class SearchHistoryList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.data.length > 0 ? (
          <ScrollView>
            <Text style={styles.searchTopTextStyle}>
              {"Previously Searched Keywords"}
            </Text>
            {this.props.data.map((ele, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => this.props.onPress(ele.key, ele.arr)}
                  activeOpacity={0.7}
                  style={[
                    styles.elementStyle,
                    {
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                      flexGrow: 1
                    }
                  ]}
                >
                  <View style={styles.columnStyle}>
                    <Text style={styles.listTextStyle}>{ele.key}</Text>
                    <View style={styles.rowStyle}>
                      {ele.arr && ele.arr.length !== 0 && (
                        <View
                          style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "flex-start"
                          }}
                        >
                          {}
                          <Text style={{ fontSize: 12, color: colors.black }}>
                            Applied filter keywords are:{" "}
                          </Text>

                          {ele.arr.map((text, index) => (
                            <Text
                              key={index}
                              style={styles.smalltext}
                            >{`${text}, `}</Text>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={{ flex: 0 }}>
                    <Icon
                      name="history"
                      style={{
                        marginRight: 5
                      }}
                      size={27}
                      color={colors.gray}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.viewBorderStyle} />
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.blankScreenStyle}>
            <View style={styles.iconContainerStyle}>
              <Icon
                name="search"
                size={50}
                style={styles.largeIconStyle}
                color={colors.gray}
              />
            </View>
            <Text style={styles.blankScreenHeaderTextStyle}>
              {"You have not used the search yet."}
            </Text>
            <Text style={styles.detailTextStyle}>
              {"Please enter some keywords to search."}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default SearchHistoryList;
