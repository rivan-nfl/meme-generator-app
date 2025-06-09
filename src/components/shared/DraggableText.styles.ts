import { StyleSheet } from "react-native";

const DraggableTextStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInput: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingHorizontal: 4,
    },
});

export default DraggableTextStyles;