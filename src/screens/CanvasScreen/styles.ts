import COLORS from "../../constants/colors";
import SPACING from "../../constants/spacing";
import { StyleSheet } from "react-native";

const CanvasScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.grey,
    },
    canvasWrapper: {
        flex: 1,
        overflow: 'hidden',
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: SPACING.paddingSmall,
        backgroundColor: COLORS.white,
    },
});

export default CanvasScreenStyles;