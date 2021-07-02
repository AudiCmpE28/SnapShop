import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Card from "../components/Card";

import ItemLink from "../components/ItemLink";
import Screen from "../components/Screen";
import colors from "../config/colors";

const results = [
  {
    id: 1,
    itemName: "Item 1",
    webName: "Walmart",
    link: "Walmart.com/item_1",
    price: "14.99",
  },
  {
    id: 2,
    itemName: "Item 2",
    webName: "Target",
    link: "Target.com/item_2",
    price: "1999.99",
  },
  {
    id: 3,
    itemName: "Item 3",
    webName: "Costco",
    link: "Costco.com/item_3",
    price: "79.99",
  },
];

const internetItems = [
  {
    id: 1,
    name: "404",
    store: "ERROR",
    url: "error",
    price: "0.0",
  },
  {
    id: 2,
    name: "404",
    store: "ERROR",
    url: "error",
    price: "0.0",
  },
  {
    id: 3,
    name: "404",
    store: "ERROR",
    url: "error",
    price: "0.0",
  },
];


function ResultScreen({ navigation, route }) {
  // const { imageURL } = route.params; //dis one
  const [listItems, setItemList] = useState({});

  const imageURL = 'https://res.cloudinary.com/das4rbvo9/image/upload/v1625190596/h7fo2zjrmfgel0r3b1rq.jpg';
  const urlAPI = 'https://whispering-falls-08617.herokuapp.com/search?searchquery=' + imageURL;
  console.log(urlAPI);

  fetch(urlAPI, {
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(async response => {
      let dataObjects = await response.json();
      if (dataObjects) {
        // console.log(dataObjects);
        setItemList(dataObjects);

      }
    })
    .catch(err => {
      console.log(err);
    });



  return (
    <Screen style={styles.screen}>
      <View style={styles.card}>
        <Card
          title="Joe Mama"
          //description="Test description"
          image={{ uri: imageURL }}
        />
      </View>

      <FlatList
        data={internetItems}
        keyExtractor={(internetItems) => internetItems.id.toString()}
        // initialNumToRender={3}
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
            onPress={() => console.log("Clicked")}
          />
        )}
      />
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
});

export default ResultScreen;


