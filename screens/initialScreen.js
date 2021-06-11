import * as React from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Image } from 'react-native';


function initialScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.imageHome} source={require("./assets/images/logo.png")} />
            <Text style={styles.textWelcome}>Snap a Shot, Shop on Spot</Text>
            <View style={[styles.container2, styles.horizontal]}>
                <ActivityIndicator size="large" color="blue" />
            </View>
            <Text>{setTimeout(() => { navigation.navigate('homeScreen'); }, 5000)}</Text>
        </View>
    );
}

//css styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    imageHome: {
        top: 120,
        width: 300,
        height: 200,
    },
    textWelcome: {
        fontSize: 24,
        color: "dodgerblue",
        fontWeight: "bold",
        top: 190,
        paddingBottom: 60,
    },
    container2: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
});


export default initialScreen;