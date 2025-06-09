import COLORS from "../../constants/colors";
import SPACING from "../../constants/spacing";
import { StyleSheet } from "react-native";

const HomeScreenStyles = StyleSheet.create({
    container: {
        padding: SPACING.paddingMedium,
        paddingTop: SPACING.paddingLarge,
        backgroundColor: COLORS.white,
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: SPACING.marginXMedium,
    },
    note: {
        fontSize: 16,
        marginBottom: SPACING.marginSmall,
    },
    buttonWrapper: {
        marginTop: SPACING.marginLarge,
    },
});

export default HomeScreenStyles;