/* 
This is the new homeScreen combining Simon's elements with my lists.
*/

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import RecentItemCard from "../components/RecentItemCard";
import colors from "../config/colors";
import HeadingText from "../components/HeadingText";
import Screen from "../components/Screen";

const itemList = [
  {
    id: 1,
    itemName: "Item 1",
    image: require("../assets/vas.png"),
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

// const IMAGE_OPTIONS = [
//   { id: 1, itemName: "Phone Camera", onPress: () => navigation.navigate('cameraScreen'), },
//   { id: 2, itemName: "Image Gallery", onPress: () => navigation.navigate('googleImage'), },
// ];

function HomeScreen({ navigation }) {
  const EmptyListDisplay = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>The list is currently empty!</Text>
      </View>
    );
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.capturesContainer}>
        <View>
          <HeadingText style={styles.heading}>Recent Captures</HeadingText>
        </View>

        <View style={styles.list}>
          <FlatList
            ListEmptyComponent={EmptyListDisplay}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={itemList}
            keyExtractor={(items) => items.id.toString()}
            renderItem={({ item }) => (
              <RecentItemCard
                style={styles.listBG}
                itemName={item.itemName}
                image={item.image}
                onPress={() => console.log("Message selected", item)}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.captureInstrContainer}>
        <Text style={styles.captureInstrText}>
          Click on an item to search it again.
        </Text>
      </View>

      <View style={styles.snapInstrContainer}>
        <Text style={styles.snapInstrTapText}>Tap cart to snap an item</Text>
        <Text style={styles.snapInstrHoldText}>
          Hold cart to upload a photo
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <HeadingText style={styles.imageText}>Snap it!</HeadingText>

        <TouchableOpacity
          onPress={() => navigation.navigate("cameraScreen")}
          onLongPress={() => navigation.navigate("ImageSelection")}
        >
          <Image
            style={styles.camCartImage}
            source={require("../assets/cart_cam.png")}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

//Format STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cartBlue,
    justifyContent: "space-between",
  },
  capturesContainer: {
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  heading: {
    textAlign: "center",
    color: colors.white,
  },
  list: {
    //paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  emptyListContainer: {
    height: 200,
    width: 200,
    backgroundColor: colors.white,

    borderWidth: 2,
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    padding: 10,
    margin: 10,
  },
  emptyListText: {
    flexShrink: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    textTransform: "capitalize",
    fontSize: 30,
  },

  captureInstrContainer: {
    flexDirection: "row",
    height: 30,
    width: undefined,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 3,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  captureInstrText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    color: colors.black,
  },

  snapInstrContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  snapInstrTapText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 12,
    color: colors.black,

    height: 30,
    width: undefined,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 3,
    margin: 5,
    marginLeft: 20,
  },
  snapInstrHoldText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 12,
    color: colors.black,

    height: 30,
    width: undefined,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 3,
    margin: 5,
    marginRight: 20,
  },

  imageContainer: {
    width: "70%",
    height: "40%",
    backgroundColor: colors.white,

    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    bottom: "0%",
    padding: "10%",

    borderTopWidth: 2,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.black,
  },
  camCartImage: {
    width: 250,
    height: 250,
  },
});

export default HomeScreen;
