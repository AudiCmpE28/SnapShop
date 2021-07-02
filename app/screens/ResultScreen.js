import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";
import Card from "../components/Card";

import ItemLink from "../components/ItemLink";
import Screen from "../components/Screen";
import colors from "../config/colors";


function ResultScreen({ navigation, route }) {
  const { imageURL } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const urlAPI = 'https://whispering-falls-08617.herokuapp.com/search?searchquery=' + imageURL;

  useEffect(() => {
    fetch(urlAPI)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(data);

  return (
    <Screen style={styles.screen}>
      {isLoading ? (
        <Text> Loading... </Text>
      ) : (
        <>
          <View style={styles.card}>
            <Card
              title="Hardcoded Title"
              //description="Test description"
              image={{ uri: imageURL }}
            />
          </View>

          <FlatList
            data={data}
            //keyExtractor={(results) => results.id.toString()}
            initialNumToRender={3}
            renderItem={({ item }) => (
              <ItemLink
                itemName={item.name}
                webName={item.store}
                link={item.url}
                price={item.price}
                onPress={() => console.log("Clicked")}
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
});

export default ResultScreen;