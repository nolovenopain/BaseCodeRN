import { Dimensions, StatusBar } from "react-native";
import deviceInfoModule from "react-native-device-info";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const statusHeight = (StatusBar.currentHeight || 24) + (deviceInfoModule.hasNotch() ? 20 : 0)
const  drawerWidth = width * .7,

export default {
    width,
    height,
    statusHeight,
    drawerWidth
}