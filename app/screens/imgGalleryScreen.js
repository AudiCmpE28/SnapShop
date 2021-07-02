import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { useNavigation, } from '@react-navigation/native';


import RecentItem from "../components/RecentItem";
import colors from "../config/colors";
import HeadingText from "../components/HeadingText";



function imgGalleryScreen({ navigation, route }) {
    const { imageURL } = route.params;
    console.log(imageURL);
    const urlAPI = 'https://whispering-falls-08617.herokuapp.com/search?searchquery=' + imageURL;
    console.log(urlAPI);

    fetch(urlAPI, {
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(async response => {
            let data = await response.json();
            if (data) {
                console.log(data);
            }
        })
        .catch(err => {
            console.log(err);
        });


    return (
        <View styles={styles.container}>
            <TouchableOpacity>
                <Text>Other Image</Text>
            </TouchableOpacity>

            <Image source={{ uri: imageURL }} style={{ width: 200, height: 200 }} />
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },

});


export default imgGalleryScreen;