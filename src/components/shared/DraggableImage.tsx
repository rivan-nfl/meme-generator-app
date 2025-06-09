import React from 'react';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    runOnJS,
    withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useCanvasStore from '../../hooks/useCanvasStore';

interface DraggableImageProps {
    item: {
        id: string;
        type: 'image';
        content: ImageSourcePropType;
        position: { x: number; y: number };
    };
    canvasSize: { width: number; height: number };
}

const DraggableImage = ({ item, canvasSize }: DraggableImageProps) => {
    const translateX = useSharedValue(item.position.x);
    const translateY = useSharedValue(item.position.y);
    const updateItem = useCanvasStore((state) => state.updateItem);
    const setSelectedItemId = useCanvasStore((state) => state.setSelectedItemId);

    const SNAP_THRESHOLD = 20;

    const panGesture = useAnimatedGestureHandler({
        onStart: () => {
            runOnJS(setSelectedItemId)(item.id);
        },
        onActive: (event) => {
            translateX.value = item.position.x + event.translationX;
            translateY.value = item.position.y + event.translationY;
        },
        onEnd: () => {
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
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: withSpring(translateX.value) },
                { translateY: withSpring(translateY.value) },
            ],
        };
    });

    return (
        <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View style={[{ position: 'absolute' }, animatedStyle]}>
                <Image source={item.content} style={{ width: 100, height: 100 } as ImageStyle} />
            </Animated.View>
        </PanGestureHandler>
    );
};

export default DraggableImage;
