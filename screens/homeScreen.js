import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function homeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={rows.firstRow}>
                <Text style={rows.firstText}>Recent Snaps</Text>
            </View>
            <View style={rows.secondRow}>
                <Text style={rows.secondText}>Favorite Shops</Text>
            </View>
            <View style={styles.bottom_image}>
                <TouchableOpacity onPress={() => navigation.navigate('cameraScreen')}>
                    <Image style={styles.imageHome} source={require('./assets/images/cart_cam.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

//Rows styling
const rows = StyleSheet.create({
    firstText: {
        fontSize: 35,
        color: '#fff',
        marginTop: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    },
    firstRow: {

    },
    secondText: {
        fontSize: 35,
        marginTop: 120,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    },
    secondRow: {

    },
});

//Format STYLE
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#23C6C6',
        alignItems: 'center',
    },
    imageHome: {
        width: 200,
        height: 200,
        left: 41,
    },
    bottom_image: {
        marginTop: 200,
        width: 300,
        height: 500,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    textWelcome: {
        fontSize: 24,
        color: "pink",
        fontWeight: "bold",
        top: 220,
    },
});

export default homeScreen;