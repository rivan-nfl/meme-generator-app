import React from 'react';
import { Button } from 'react-native';
import useCanvasStore from '../../hooks/useCanvasStore';

const ResetButton = () => {
    const { setItems, setBackgroundImage } = useCanvasStore();

    const handleReset = () => {
        setItems([]);
        setBackgroundImage(null);
    };

    return <Button color={'red'} title="Reset" onPress={handleReset} />;
};

export default ResetButton;
