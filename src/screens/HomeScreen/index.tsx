import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import HomeScreenStyles from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <ScrollView contentContainerStyle={HomeScreenStyles.container}>
            <Text style={HomeScreenStyles.title}>Welcome to Meme Generator!</Text>
            <Text style={HomeScreenStyles.title}>📌 How to Use the Meme Generator</Text>

            <Text style={HomeScreenStyles.note}>• Choose your template if you want to use one.</Text>
            <Text style={HomeScreenStyles.note}>• To add text, tap the "Add Text" button.</Text>
            <Text style={HomeScreenStyles.note}>• To change the text color, tap the text once.</Text>
            <Text style={HomeScreenStyles.note}>• To edit the text content, long press on the text.</Text>
            <Text style={HomeScreenStyles.note}>• To duplicate a text or image, double tap it.</Text>
            <Text style={HomeScreenStyles.note}>• To move elements, drag them to the desired position.</Text>
            <Text style={HomeScreenStyles.note}>• To zoom and pan the canvas, use two fingers.</Text>
            <Text style={HomeScreenStyles.note}>• To reset the canvas, press the "Reset" button.</Text>
            <Text style={HomeScreenStyles.note}>• To export your meme, press the "Export" button.</Text>

            <View style={HomeScreenStyles.buttonWrapper}>
                <Button title="Start Creating Meme" onPress={() => navigation.navigate('Canvas')} />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;