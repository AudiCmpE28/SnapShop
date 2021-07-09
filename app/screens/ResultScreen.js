import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  Linking,
  ActivityIndicator,
  ImageBackgroundBase,
} from "react-native";
import Card from "../components/Card";

import ItemLink from "../components/ItemLink";
import Screen from "../components/Screen";
import colors from "../config/colors";
import * as imgDB from '../../database/SQLiteDB';

function ResultScreen({ navigation, route }) {
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
  for(var i =0; i<data.length;i++)
    {
      console.log("name: %s",data[i].name)
      console.log("price: %s",data[i].price);
      console.log("store:%s",data[i].store);
      console.log("url:%s",data[i].url);
      imgDB.database.insert_ItemDetails(data[i].url,data[i].name,data[i].store,data[i].price,imageID); 
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
                // itemName={item.itemName}
                // webName={item.webName}
                // link={item.link}
                // price={item.price}
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
});

export default ResultScreen;
