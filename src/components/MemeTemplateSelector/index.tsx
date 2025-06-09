import useCanvasStore from '../../hooks/useCanvasStore';
import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import MemeTemplateSelectorStyles from './styles';

const templates = [
    require('../../assets/templates/meme1.jpg'),
    require('../../assets/templates/meme2.jpg'),
    require('../../assets/templates/meme3.jpg'),
];

const MemeTemplateSelector = () => {
    const { setBackgroundImage } = useCanvasStore();

    return (
        <View style={MemeTemplateSelectorStyles.container}>
            <Text style={MemeTemplateSelectorStyles.templateText}>Templates</Text>
            <FlatList
                horizontal
                data={templates}
                renderItem={({ item }) => (
                    <Pressable onPress={() => setBackgroundImage(item)}>
                        <Image source={item} style={MemeTemplateSelectorStyles.templateImage} />
                    </Pressable>
                )}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default MemeTemplateSelector;