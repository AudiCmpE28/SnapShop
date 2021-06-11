import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";

import colors from "../config/colors";

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/SSLogo.png")} />
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 30,
            fontStyle: "italic",
            fontWeight: "bold",
            color: "blue",
            textAlign: "left",
            margin: 20,
            textTransform: "capitalize",
          }}
        >
          Snap a shot,
        </Text>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 30,
            fontStyle: "italic",
            fontWeight: "bold",
            color: "#E9D105",
            textAlign: "right",
            marginRight: 20,
            marginBottom: 20,
            textTransform: "capitalize",
          }}
        >
          Shop on the spot
        </Text>
        <Image style={styles.cart} source={require("../assets/cart.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 320,
    height: 200,
    margin: 20,
  },
  logoContainer: {
    position: "absolute",
    top: "15%",
  },
  cart: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
});

export default WelcomeScreen;
