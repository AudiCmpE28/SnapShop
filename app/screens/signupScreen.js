import { StatusBar } from "expo-status-bar";
//import * as React from 'react';
import React, { useState } from "react";
import { render } from "react-dom";
// useState allows componets to change over time, such as email and pword
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
// import colors from "../config/colors";
import * as imgDB from "../../database/SQLiteDB";




export default function signupScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    validateField = () => {


        // if (email != "@") {
        //   alert("Incorrect email")
        //   return false
        // }
        if (username == "") {
            alert("Fill Username")
            return false
        }
        else if (password == "") {

            alert("Fill in password")
            return false
        }

        return true

    }

    makingCall = () => {

        if (this.validateField()) {
            imgDB.database.registerUser(username, email, password)
            let User_db_ID = imgDB.database.getuser(username, password)
            //not finished
            //*navigation.navigate("homeScreen") ex:database ID 

            navigation.navigate("HomeScreen", { User_ID: User_db_ID });
            //*

        }

    }



    return (
        <View style={styles.container}>

            {/* <Image style={styles.image} source={require("../assets/logo.png")} /> */}

            <StatusBar style="auto" />
            {/* view to wrap each text input */}

            <View style={styles.header}>
                <Text style={styles.italic}>Snap Shop</Text>
            </View>




            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    onChangeText={(username) => setUsername(username)}
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




            <TouchableOpacity style={styles.loginBtn}
                onPress={() => this.makingCall()}>
                <Text style={styles.loginText}>CREATE ACCOUNT </Text>

            </TouchableOpacity>
            <Text>
                {/* {setTimeout(() => { navigation.navigate("HomeScreen"); }, 20000)} */}
            </Text>
        </View >

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

    header: {
        //fontWeight: 'bold',
        //color: "#FFFFFF",
        fontStyle: 'italic',
        height: 30,
        //fontSize: 
        //width: 30

    },

    image: {
        height: 20,
        width: "20",
        marginBottom: 40,
    },


    inputView: {
        backgroundColor: "#FFFFFF",
        borderRadius: 0,
        width: "80%",
        height: 45,
        marginBottom: 20,

        alignItems: "flex-start",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        //borderBottomWidth: 1,
        //height: 42,
        //width: "90%"
    },

    loginBtn: {
        width: "80%",
        borderRadius: 0,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FFFFFF",

    },

});
