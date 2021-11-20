import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import React, { useState } from "react";

import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
//import colors from "../config/colors";

export default function loginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>

            <Image style={styles.image} source={require("../assets/snapLogo.png")} />


            <StatusBar style="auto" />
            {/* view to wrap each text input */}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    // set to true, so it can hide text, that user enters.
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            {/* TouchableOpacity allows to change the condition when pressed */}
            {/* allows us to reduce the opacity when we touch button "touchableOpacity" */}
            <TouchableOpacity>
                <Text style={styles.signUp}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <Text>
                {/* {setTimeout(() => { navigation.navigate("HomeScreen"); }, 20000)} */}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    //when we use stylesheet, we create an object
    // as CONTAINER
    container: {

        flex: 1,
        backgroundColor: "#336699",
        alignItems: "center",
        justifyContent: "center",
    },


    inputView: {
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "95%",

        height: undefined,
        right: -10,

        aspectRatio: 1.5,
        marginBottom: 100
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,
    },

    signUp: {
        height: 30,
        marginBottom: 100,
        color: "white"
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: -100,
        backgroundColor: "#FFFFFF",
    },
});
