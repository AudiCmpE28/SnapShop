import React, { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  View,
  Text,
  Linking,
  ActivityIndicator,
  ImageBackgroundBase,
  TouchableOpacity,
} from "react-native";
import Card from "../components/Card";

import ItemLink from "../components/ItemLink";
import colors from "../config/colors";
import * as imgDB from "../../database/SQLiteDB";
import LoadingCart from "../components/LoadingCart";

function ResultScreen({ navigation, route }) {
  const { imageURL, imageID } = route.params;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const urlAPI =
    "https://whispering-falls-08617.herokuapp.com/search?searchquery=" +
    imageURL;
  console.log("imageURL: %s", imageURL);

  useEffect(() => {
    fetch(urlAPI)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    console.log("name: %s", data[i].name);
    console.log("price: %s", data[i].price);
    console.log("store:%s", data[i].store);
    console.log("url:%s", data[i].url);
    imgDB.database.insert_ItemDetails(
      data[i].url,
      data[i].name,
      data[i].store,
      data[i].price,
      imageID
    );
  }
  console.log("in result screen imageID: %d", imageID);
  //Pass the data into the database
  //@TODO figure out where and how to add ->imgDB.database.insert_ItemDetails(item.url,item.name,item.store,item.price,imageID);

  return (
    <>
      {isLoading ? (
        <View style={styles.LoadingContainer}>
          <LoadingCart />
          <View style={styles.LoadTextContainer}>
            <Text style={styles.LoadText}>
              Loading... This may take a while.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Title of Item</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              style={styles.screenshot}
              source={require("../assets/calc.png")}
            />
          </View>

          <View style={styles.InstrContainer}>
            <Text style={styles.InstrText}>Click on a box to open the URL</Text>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={data}
              keyExtractor={(results) => results.name.toString()}
              // initialNumToRender={3}
              renderItem={({ item }) => (
                <ItemLink
                  itemName={item.name}
                  webName={item.store}
                  link={item.url}
                  price={item.price}
                  // onPress={() => console.log("Clicked")}
                  // Commented out for testing screen layout
                  onPress={() => Linking.openURL(item.url)}
                />
              )}
            />
          </View>

          <TouchableOpacity
            style={{ bottom: 0 }}
            onPress={() => console.log("Clicked")}
          >
            <View style={styles.homeButtonContainer}>
              <Text style={styles.homeText}>Return to Home</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cartBlue,
    alignItems: "center",
  },
  nameContainer: {
    height: 30,
    width: "94%",
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  nameText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    color: colors.black,
  },
  imageContainer: {
    width: "94%",
    height: "35%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 4,
    borderTopWidth: 0,
    borderColor: colors.black,
    overflow: "hidden",
  },
  screenshot: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
  listContainer: {
    width: "94%",
    height: "35%",

    flexGrow: 1,
  },
  InstrContainer: {
    flexDirection: "row",
    height: 30,
    width: "94%",
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  InstrText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    color: colors.black,
  },
  LoadingContainer: {
    flex: 1,
    backgroundColor: colors.cartBlue,
    alignItems: "center",
  },
  LoadTextContainer: {
    position: "absolute",
    height: 30,
    width: "94%",
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 5,
    marginTop: "5%",
    marginBottom: "5%",
    bottom: "10%",
  },
  LoadText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    color: colors.black,
  },
  homeText: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    color: colors.black,
  },
  homeButtonContainer: {
    height: 30,
    width: 200,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 3,
    margin: 10,
  },
});

export default ResultScreen;
