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
    const [data, setData] = useState([]);
    const [checkpoint, setCheckpoint] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { imageURL, databaseID } = route.params;

    if (!checkpoint) {
        imgDB.database.getItemDetails(databaseID)
            .then(response => { setData(response); })
            .catch((err) => { console.log(err); })
            .finally(() => setCheckpoint(true));
    }

    console.log('results DB', data);

    // console.log('in result screen imageID: %d', databaseID);
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
                                itemName={item.itemName}
                                webName={item.storeName}
                                link={item.itemUrl}
                                price={item.price}
                                onPress={() => Linking.openURL(item.itemUrl)}

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
