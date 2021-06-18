import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';


import RecentItem from "../components/RecentItem";
import colors from "../config/colors";
import HeadingText from "../components/HeadingText";



function imgGalleryScreen({ navigation }) {
    const imageURI = useNavigation('image');

    console.log(imageURI);

    return (
        <SafeAreaView styles={styles.container}>
            <TouchableOpacity >
                <Text>Other Image</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Snap Again</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Analyze</Text>
            </TouchableOpacity>

            {/* <Image source={{ imageURI }} style={styles.imageDisplay} /> */}
        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    imageDisplay: {
        width: "70%",
        height: "40%",
        resizeMode: 'contain',
    },
})


export default imgGalleryScreen;