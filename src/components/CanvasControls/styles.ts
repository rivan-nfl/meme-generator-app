import COLORS from "../../constants/colors";
import SPACING from "../../constants/spacing";
import { StyleSheet } from "react-native";

const CanvasControlStyles = StyleSheet.create({
    container: {
        padding: SPACING.paddingSmall,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default CanvasControlStyles;