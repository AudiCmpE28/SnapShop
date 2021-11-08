import { StatusBar } from "expo-status-bar";
//import * as React from 'react';
import React, { useState } from "react";
// useState allows componets to change over time, such as email and pword
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import colors from "../config/colors";

export default function signupScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={require("../assets/logo.png")} /> */}

            <StatusBar style="auto" />
            {/* view to wrap each text input */}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username."
                    placeholderTextColor="#003f5c"
                    onChangeText={(username) => setUsername(username)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    // set to true, so it can hide text, that user enters.
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            {/* TouchableOpacity allows to change the condition when pressed */}
            {/* allows us to reduce the opacity when we touch button "touchableOpacity" */}
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <Text>
                {setTimeout(() => { navigation.navigate("HomeScreen"); }, 20000)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    //when we use stylesheet, we create an object
    // as CONTAINER
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        height: 20,
        width: "20",
        marginBottom: 40,
    },


    inputView: {
        backgroundColor: colors.white,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: colors.white,
    },
});