import React, { useState } from 'react';
import { Image, View, LayoutChangeEvent, ImageSourcePropType } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableText from '../shared/DraggableText';
import DraggableImage from '../shared/DraggableImage';
import useCanvasStore, { CanvasItem } from '../../hooks/useCanvasStore';
import MemeCanvasStyles from './styles';

interface MemeCanvasProps {
    canvasRef: React.RefObject<View>;
}

const MemeCanvas = ({ canvasRef }: MemeCanvasProps) => {
    const { backgroundImage, items } = useCanvasStore();

    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setCanvasSize({ width, height });
    };

    const gesture = Gesture.Simultaneous(
        Gesture.Pan().onUpdate((e) => {
            translateX.value = e.translationX;
            translateY.value = e.translationY;
        }),
        Gesture.Pinch().onUpdate((e) => {
            scale.value = e.scale;
        })
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value) },
            { translateY: withSpring(translateY.value) },
            { scale: withSpring(scale.value) },
        ],
    }));

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GestureDetector gesture={gesture}>
                <Animated.View
                    ref={canvasRef}
                    style={[MemeCanvasStyles.canvas, animatedStyle]}
                    onLayout={onLayout}
                >
                    {backgroundImage && (
                        <Image
                            source={backgroundImage}
                            style={MemeCanvasStyles.backgroundImage}
                            resizeMode="contain"
                        />
                    )}
                    {items.map((item) =>
                        item.type === 'text' ? (
                            <DraggableText
                                key={item.id}
                                item={item as CanvasItem & { type: 'text'; content: string }}
                                canvasSize={canvasSize}
                            />
                        ) : (
                            <DraggableImage
                                key={item.id}
                                item={item as CanvasItem & { type: 'image'; content: ImageSourcePropType }}
                                canvasSize={canvasSize}
                            />
                        )
                    )}
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

export default MemeCanvas;
