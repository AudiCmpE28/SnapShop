// Old experimental home screen

import * as React from 'react';
import { Text, StyleSheet, View, FlatList } from "react-native";

import RecentItem from "../components/RecentItem";
import colors from "../config/colors";

import HeadingText from "../components/HeadingText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  // {
  //   id: 3,
  //   itemName: "Item 3",
  //   image: require("../assets/coke.png"),
  // },
];

function PracticeScreen({ navigation }) {
  return (
    <View style={styles.background}>
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
                itemName={item.itemName}
                image={item.image}
                onPress={() => console.log("Message selected", item)}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.camContainer}>
        <Text style={styles.text}>Snap it!</Text>
        <MaterialCommunityIcons name="camera" size={200} color={colors.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  capturesContainer: {
    paddingTop: "10%",
  },
  heading: {
    paddingLeft: 20,
  },
  list: {
    //paddingTop: 10,
    borderWidth: 5,
    borderColor: colors.black,
    borderRadius: 30,
    backgroundColor: "#E7B311",
    margin: 10,
  },
  camContainer: {
    width: "60%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    borderWidth: 5,
    borderColor: "orange",
    borderRadius: 30,
    position: "absolute",
    bottom: "0%",
  },
  text: {
    fontSize: 33,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "orange",
  },
});
export default PracticeScreen;
