import React, { useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import useCanvasStore from '../../hooks/useCanvasStore';
import DraggableTextStyles from './DraggableText.styles';

interface DraggableTextProps {
    item: {
        id: string;
        type: 'text';
        content: string;
        position: { x: number; y: number };
        color?: string;
    };
    canvasSize: {
        width: number;
        height: number;
    };
}

const DraggableText = ({ item, canvasSize }: DraggableTextProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.content);
    const [color, setColor] = useState(item.color || '#000');
    const translateX = useSharedValue(item.position.x);
    const translateY = useSharedValue(item.position.y);
    const updateItem = useCanvasStore((state) => state.updateItem);
    const duplicateItem = useCanvasStore((state) => state.duplicateItem);
    const setSelectedItemId = useCanvasStore((state) => state.setSelectedItemId);

    const SNAP_THRESHOLD = 20;

    const gesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX + item.position.x;
            translateY.value = e.translationY + item.position.y;
        })
        .onEnd(() => {
            let x = translateX.value;
            let y = translateY.value;

            const centerX = canvasSize.width / 2;
            const centerY = canvasSize.height / 2;

            if (Math.abs(x - centerX) < SNAP_THRESHOLD) {
                x = centerX;
            }
            if (Math.abs(y - centerY) < SNAP_THRESHOLD) {
                y = centerY;
            }

            translateX.value = x;
            translateY.value = y;

            runOnJS(updateItem)(item.id, {
                position: { x, y },
            });
            runOnJS(setSelectedItemId)(item.id);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value) },
            { translateY: withSpring(translateY.value) },
        ],
    }));

    const handleTextColorChange = () => {
        const nextColor = color === '#000' ? '#f00' : color === '#f00' ? '#00f' : '#000';
        setColor(nextColor);
        updateItem(item.id, { color: nextColor });
    };

    const handleDoubleTap = () => {
        duplicateItem(item.id);
    };

    const doubleTapGesture = Gesture.Tap().numberOfTaps(2).onStart(() => runOnJS(handleDoubleTap)());

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[DraggableTextStyles.container, animatedStyle]}>
                <GestureDetector gesture={doubleTapGesture}>
                    <View>
                        {isEditing ? (
                            <TextInput
                                style={[DraggableTextStyles.textInput, { color }]}
                                value={text}
                                autoFocus
                                onBlur={() => {
                                    setIsEditing(false);
                                    updateItem(item.id, { content: text });
                                }}
                                onChangeText={setText}
                            />
                        ) : (
                            <Pressable
                                onLongPress={() => setIsEditing(true)}
                                onPress={() => {
                                    handleTextColorChange();
                                    setSelectedItemId(item.id);
                                }}
                            >
                                <Text style={[DraggableTextStyles.text, { color }]}>{text}</Text>
                            </Pressable>
                        )}
                    </View>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
};

export default DraggableText;
