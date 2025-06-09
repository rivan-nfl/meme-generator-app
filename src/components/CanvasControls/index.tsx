import useCanvasStore, { CanvasItem } from '../../hooks/useCanvasStore';
import React from 'react';
import { View, Button } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import CanvasControlStyles from './styles';

const sampleImage = require('../../assets/templates/meme1.jpg');

const CanvasControls = () => {
    const { items, setItems, selectedItemId, setSelectedItemId, removeItem } = useCanvasStore();

    const uuid = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    const addText = () => {
        const newItem: CanvasItem = {
            id: uuid(),
            type: 'text',
            content: 'New Text',
            position: { x: 50, y: 50 },
        };
        setItems([...items, newItem]);
    };

    const addImage = () => {
        const newItem: CanvasItem = {
            id: uuid(),
            type: 'image',
            content: sampleImage as ImageSourcePropType,
            position: { x: 50, y: 150 },
        };
        setItems([...items, newItem]);
    };

    const duplicateLast = () => {
        if (items.length === 0) return;
        const lastItem = items[items.length - 1];
        const newItem = {
            ...lastItem,
            id: uuid(),
            position: {
                x: lastItem.position.x + 20,
                y: lastItem.position.y + 20,
            },
        };
        setItems([...items, newItem]);
    };

    const removeSelected = () => {
        if (selectedItemId) {
            removeItem(selectedItemId);
            setSelectedItemId(null);
        }
    };

    return (
        <View style={CanvasControlStyles.container}>
            <Button title="Add Text" onPress={addText} />
            <Button title="Add Image" onPress={addImage} />
            <Button title="Duplicate" onPress={duplicateLast} />
            <Button title="Remove" onPress={removeSelected} />
        </View>
    );
};

export default CanvasControls;