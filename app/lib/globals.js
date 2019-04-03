/** Globally used check are declared here*/

import { Dimensions, Platform} from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

module.exports = {
    deviceHeight: deviceHeight,
    deviceWidth: deviceWidth,
    deviceType: (deviceHeight / deviceWidth) > 1.6 ? 'Phone' : 'Tablet',
    iphoneX: deviceHeight == 812 ? true : false,
    OS: Platform.OS === 'ios'? 'ios' : 'android'
};