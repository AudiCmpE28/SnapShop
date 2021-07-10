import React, { useEffect, useState } from "react";
import {
    Image,
    FlatList,
    StyleSheet,
    View,
    Linking,
    ActivityIndicator,
    ImageBackgroundBase,
    TouchableOpacity,
} from "react-native";
import Card from "../components/Card";

import ItemLink from "../components/ItemLink";
import Screen from "../components/Screen";
import colors from "../config/colors";
import * as imgDB from '../../database/SQLiteDB';

function ResultScreenDB({ navigation, route }) {
    const { imageURL, imageID } = route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const urlAPI = "https://whispering-falls-08617.herokuapp.com/search?searchquery=" + imageURL;
    // console.log('imageURL: %s', imageURL);

    useEffect(() => {
        fetch(urlAPI)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        console.log("name: %s", data[i].name)
        console.log("price: %s", data[i].price);
        console.log("store:%s", data[i].store);
        console.log("url:%s", data[i].url);
        imgDB.database.insert_ItemDetails(data[i].url, data[i].name, data[i].store, data[i].price, imageID);
    }
    console.log('in result screen imageID: %d', imageID);
    //Pass the data into the database 
    //@TODO figure out where and how to add ->imgDB.database.insert_ItemDetails(item.url,item.name,item.store,item.price,imageID); 


    return (
        <Screen style={styles.screen}>
            {isLoading ? (
                // <Text> Loading... </Text>
                <View style={[styles.loading, styles.loading_horizontal]}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            ) : (
                <>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <Image style={styles.homeButton} source={require("../assets/cart_cam.png")} />
                    </TouchableOpacity>

                    <View style={styles.card}>
                        <Card
                            title="Hardcoded Title"
                            description="Click a box below to open the link for purchase."
                            image={{ uri: imageURL }}
                        />
                    </View>

                    <FlatList
                        data={data}
                        // keyExtractor={(results) => results.id.toString()}
                        initialNumToRender={3}
                        renderItem={({ item }) => (
                            <ItemLink
                                itemName={item.name}
                                webName={item.store}
                                link={item.url}
                                price={item.price}
                                onPress={() => Linking.openURL(item.url)}

                            />
                        )}
                    />
                </>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.primary,
    },
    card: {
        margin: 10,
        backgroundColor: colors.primary,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        marginTop: 120,
    },
    loading_horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
    homeButton: {
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
});

export default ResultScreenDB;
