/* 
This is the new homeScreen combining Simon's elements with my lists.
*/

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import RecentItem from "../components/RecentItem";
import colors from "../config/colors";
import HeadingText from "../components/HeadingText";

const itemList = [
  {
    id: 1,
    itemName: "Item 1",
    image: require("../assets/coke.png"),
  },
  {
    id: 2,
    itemName: "Item 2",
    image: require("../assets/coke.png"),
  },
  {
    id: 3,
    itemName: "Item 3",
    image: require("../assets/coke.png"),
  },
];

function HubScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.capturesContainer}>
        <View style={styles.heading}>
          <HeadingText>Recent Captures</HeadingText>
        </View>

        <View style={styles.list}>
          <FlatList
            data={itemList}
            keyExtractor={(items) => items.id.toString()}
            renderItem={({ item }) => (
              <RecentItem
                style={styles.listBG}
                itemName={item.itemName}
                image={item.image}
                onPress={() => console.log("Message selected", item)}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => console.log("Click")}>
          <Image
            style={styles.camCartImage}
            source={require("../assets/cart_cam.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

//Format STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  capturesContainer: {
    paddingTop: "10%",
  },
  heading: {
    paddingLeft: 20,
  },
  list: {
    //paddingTop: 10,
    margin: 10,
  },
  listBG: {
    backgroundColor: colors.primary,
  },

  imageContainer: {
    width: "70%",
    height: "50%",
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: colors.cartBlue,
    alignSelf: "center",
  },
  camCartImage: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default HubScreen;
