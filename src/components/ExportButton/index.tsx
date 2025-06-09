import React from 'react';
import { Alert, Button, PermissionsAndroid, Platform, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';

interface ExportButtonProps {
    canvasRef: React.RefObject<View>;
}

const ExportButton = ({ canvasRef }: ExportButtonProps) => {
    const requestPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version < 33) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'App needs access to your storage to save memes',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const handleExport = async () => {
        if (!canvasRef.current) return;

        const hasPermission = await requestPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Cannot save meme without storage access');
            return;
        }

        try {
            const uri = await captureRef(canvasRef, {
                format: 'jpg',
                quality: 0.9,
            });

            const fileName = `meme-${Date.now()}.jpg`;
            const targetPath =
                Platform.OS === 'android'
                    ? `${RNFS.DownloadDirectoryPath}/${fileName}`
                    : `${RNFS.DocumentDirectoryPath}/${fileName}`;

            await RNFS.copyFile(uri, targetPath);

            Alert.alert(
                'Success',
                `Meme saved to ${Platform.OS === 'android' ? 'Downloads' : 'Documents'} as ${fileName}`,
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to export meme.');
        }
    };

    return <Button title="Export Meme" onPress={handleExport} />;
};

export default ExportButton;
