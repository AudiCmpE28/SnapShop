import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from "react-native";

import AppText from "./AppText";
import HeadingText from "./HeadingText";
import colors from "../config/colors";

function RecentItem({ itemName, image, onPress, style }) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={[styles.container, style]}>
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>{itemName}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.itemBG,
    borderRadius: 25,
    padding: 10,
    margin: 10,
    borderWidth: 5,
    borderColor: colors.black,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  textContainer: {
    justifyContent: "center",
  },
  itemName: {
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});

export default RecentItem;
