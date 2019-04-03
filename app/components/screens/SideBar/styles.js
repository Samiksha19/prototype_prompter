import {StyleSheet} from "react-native";
import * as FontSizes from '../../../utils/fontsSizes';
import * as colors from '../../../utils/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    subContainer: {
        marginTop: 20,
        height: 50,
        width: '100%',
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    menuTxt: {
        fontSize: FontSizes.medium,
        marginLeft:10,
        color: colors.black
    }
});