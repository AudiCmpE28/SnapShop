import * as React from 'react';
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

function ResultScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.card}>
        <Card
          title="Coke Can"
          //description="Test description"
          image={require("../assets/coke.png")}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={(results) => results.id.toString()}
        renderItem={({ item }) => (
          <ItemLink
            itemName={item.itemName}
            webName={item.webName}
            link={item.link}
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
