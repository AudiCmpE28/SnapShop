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

function RecentItemCard({ itemName, image, onPress, style }) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={[styles.container, style]}>
        {image && <Image style={styles.image} source={{ uri: image }} />}
        <View
          style={{ borderTopColor: colors.black, borderTopWidth: 2 }}
        ></View>
        {itemName && (
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{itemName}</Text>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: colors.black,
    backgroundColor: colors.white,
    overflow: "hidden",
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    flex: 5,
  },
  textContainer: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});

export default RecentItemCard;
