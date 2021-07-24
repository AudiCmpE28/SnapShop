import React, { useEffect, useState } from "react";
import {
  Image, FlatList, StyleSheet, View, Text, Linking,
  ActivityIndicator, ImageBackgroundBase, TouchableOpacity,
} from "react-native";

import ItemLink from "../components/ItemLink";
import colors from "../config/colors";
import * as imgDB from "../../database/SQLiteDB";
import LoadingCart from "../components/LoadingCart";

function ResultScreen({ navigation, route }) {
  const { imageURL, imageID } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [itemsName, setNameOfItem] = useState("Unkown Name");
  var arrayOfItemsNames = [];
  var count = 0;


  const urlAPI = "https://whispering-falls-08617.herokuapp.com/search?searchquery=" + imageURL;
  // console.log("imageURL: %s", imageURL);

  useEffect(() => {
    fetch(urlAPI)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
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
  // console.log(arrayOfItemsNames);

  if (!isLoading && arrayOfItemsNames) {
    // strings to uppercase
    const str = arrayOfItemsNames.map(arrayOfItemsNames => arrayOfItemsNames.toUpperCase());

    //sort the array to get the shortest element
    str.sort((a, b) => a.length - b.length);

    //take the first element/string and convert into array of words
    const shortest = str[0].split(" ")

    //iterate over entire strings and check whether it has an entry of short array
    const result = shortest.filter(item => str.every(x => x.includes(item)))

    function results(item) {
      var results = " "; //empty string
      for (var i = 0; i < item.length; i++) {
        results += ' ' + item[i]; //add space and word to string
      }
      return results.trim(); //return the string formed
    }

    setNameOfItem(results(result));
    imgDB.database.update_imgName(imageID, results(result)); //updates title name (iz algorithm) 
    count++;
  }

  // imgDB.database.update_imgName(imageID, "Placeholder"); //updates title name (iz algorithm)
  // console.log('in result screen imageID: %d', imageID);

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
            {/* Below is where you would put the imageName (after determining it from algorithm) */}
            <Text style={styles.nameText}> {itemsName} </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              style={styles.screenshot}
              source={{ uri: imageURL }}
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
            onPress={() => navigation.navigate("HomeScreen")}
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
