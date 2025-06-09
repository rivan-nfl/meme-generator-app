import COLORS from "../../constants/colors";
import SPACING from "../../constants/spacing";
import { StyleSheet } from "react-native";

const MemeTemplateSelectorStyles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
    },
    templateText: {
        marginHorizontal: SPACING.marginSmall,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: SPACING.marginXSmall
    },
    templateImage: {
        width: 80,
        height: 80,
        marginHorizontal: SPACING.marginXSmall,
        borderRadius: 10,
    },
});

export default MemeTemplateSelectorStyles;