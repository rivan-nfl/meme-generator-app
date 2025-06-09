import COLORS from "../../constants/colors";
import { StyleSheet } from "react-native";

const MemeCanvasStyles = StyleSheet.create({
    canvas: {
        flex: 1,
        backgroundColor: COLORS.lightDark,
        borderWidth: 1,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
});

export default MemeCanvasStyles;