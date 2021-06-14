import React, { useState, useEffect, Component, useRef } from 'react';
import { captureRef } from 'react-native-view-shot';
import { SafeAreaView, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { RNCamera } from 'react-native-camera';



function cameraScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    // takePicture = async () => {
    //     if (this.camera) {
    //         const options = { quality: 0.5, base64: true };
    //         const data = await this.camera.takePictureAsync(options);
    //         console.log(data.uri);
    //     }
    // };




    return (
        <View style={cameraStyle.container}>
            <Camera style={cameraStyle.camera} type={type}>
                <View style={cameraStyle.buttonContainer}>
                    <TouchableOpacity
                        style={cameraStyle.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={cameraStyle.text}> Flip </Text>
                    </TouchableOpacity>

                    {/* <Text style={cameraStyle.capture} onPress={this.takePicture}>CAPTURE</Text> */}
                </View>
            </Camera>
        </View>
    );
}

const cameraStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "white",
    },
    capture: {
        fontSize: 20,
        color: "blue",
        alignSelf: "center",
    },
});

export default cameraScreen;
