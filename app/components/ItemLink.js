import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

import colors from "../config/colors";

function ItemLink({ itemName, webName, link, price, onPress }) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.storeText}>{webName}: </Text>
            {itemName && <Text style={styles.linkText}>{itemName}</Text>}
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Price:
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: "600",
              fontStyle: "italic",
            }}
          >
            {price}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    margin: 10,
    flexDirection: "row",
    borderWidth: 5,
    borderColor: colors.black,
    borderRadius: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  headingContainer: {
    flexDirection: "column",
  },
  storeText: {
    fontSize: 21,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    fontSize: 19,
    textDecorationLine: "underline",
    color: "blue",
  },
  textContainer: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    flex: 0.75,
  },
  priceContainer: {
    backgroundColor: colors.moneyGreen,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    flex: 0.25,
  },
});

export default ItemLink;
