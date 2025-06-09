import React, { useRef } from 'react';
import { View } from 'react-native';
import MemeCanvas from '@components/MemeCanvas';
import MemeTemplateSelector from '@components/MemeTemplateSelector';
import CanvasControls from '@components/CanvasControls';
import ExportButton from '@components/ExportButton';
import ResetButton from '@components/ResetButton';
import CanvasScreenStyles from './styles';

const CanvasScreen = () => {
    const canvasRef = useRef<View>(null);

    return (
        <View style={CanvasScreenStyles.container}>
            <View style={CanvasScreenStyles.canvasWrapper}>
                <MemeCanvas canvasRef={canvasRef as React.RefObject<View>} />
            </View>
            <CanvasControls />
            <MemeTemplateSelector />
            <View style={CanvasScreenStyles.bottomControls}>
                <ResetButton />
                <ExportButton canvasRef={canvasRef as React.RefObject<View>} />
            </View>
        </View>
    );
};

export default CanvasScreen;