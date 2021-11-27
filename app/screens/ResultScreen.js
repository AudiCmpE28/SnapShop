import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View, Linking } from "react-native";
import Card from "../components/Card";

import ItemLink from "../components/ItemLink";
import colors from "../config/colors";
import * as imgDB from "../../database/SQLiteDB";
import LoadingCart from "../components/LoadingCart";

function results(item) {
    if (item.length < 2) return "Unidentified String";
    else {
        var results = " "; //empty string
        for (var i = 0; i < item.length; i++) {
            results += " " + item[i]; //add space and word to string
        }

        return results.trim(); //return the string formed
    }
}

function ResultScreen({ navigation, route }) {
    const { User_ID, imageURL, imageID } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    var arrayOfItemsNames = [];
    var setName = false;
    var itemsName = "Unidentified Item";

    const urlAPI =
        "https://whispering-falls-08617.herokuapp.com/search?searchquery=" +
        imageURL;
    // console.log("imageURL: %s", imageURL);

    const EmptyListDisplay = () => {
        return (
            <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>
                    An unexpected error occurred with the server, please try again later!
                </Text>
            </View>
        );
    };

    useEffect(() => {
        fetch(urlAPI, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => {
                const current = new Date();
                const date = current.toLocaleString();
                console.log("Result Log End: ");
                console.log(date);
                setLoading(false)
            });
    }, []);

    for (var i = 0; i < data.length; i++) {
        // console.log("name: %s", data[i].name);
        // console.log("price: %s", data[i].price);
        // console.log("store:%s", data[i].store);
        // console.log("url:%s", data[i].url);

        imgDB.database.insert_ItemDetails(
            data[i].url,
            data[i].name,
            data[i].store,
            data[i].price,
            imageID
        );
        arrayOfItemsNames[i] = data[i].name; //store names into an array
    }

    if (!setName && !isLoading) {
        // strings to uppercase
        var shortest, result;
        // var str = arrayOfItemsNames.slice(0, 2);
        // str = str.map((x) => x.toUpperCase());
        str = arrayOfItemsNames.slice(0, 2).map((x) => x.toUpperCase()); // Potential shortcut

        //sort the array to get the shortest element
        str.sort((a, b) => a.length - b.length);
        //take the first element/string and convert into array of words
        if (typeof str[0] == "undefined") {
            result = "Unidentified Item";
        } else {
            shortest = str[0].split(" ");
            //iterate over entire strings and check whether it has an entry of short array
            result = shortest.filter((item) => str.every((x) => x.includes(item)));
        }

        itemsName = results(result);
        imgDB.database.update_imgName(imageID, itemsName); //updates title name (iz algorithm)
        setName = true;
    }

    // imgDB.database.update_imgName(imageID, "Placeholder"); //updates title name (iz algorithm)
    // console.log('in result screen imageID: %d', imageID);

    return (
        <>
            <View style={styles.card}>
                <Card
                    title="Hardcoded Title"
                    description="Click a box below to open the link for purchase."
                    image={require("../assets/coke.png")}
                />
            </View>

            <FlatList
                data={data}
                //keyExtractor={(results) => results.id.toString()}
                initialNumToRender={3}
                renderItem={({ item }) => (
                    <ItemLink
                        // itemName={item.itemName}
                        // webName={item.webName}
                        // link={item.link}
                        // price={item.price}
                        itemName={item.name}
                        webName={item.store}
                        link={item.url}
                        price={item.price}
                        // onPress={() => console.log("Clicked")}
                        onPress={() => Linking.openURL(item.url)}
                    />
                )}
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.primary,
        flex: 1,
    },
    card: {
        margin: 10,
        backgroundColor: colors.primary,
    },
});

export default ResultScreen;
