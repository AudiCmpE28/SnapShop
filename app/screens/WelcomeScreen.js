import * as React from "react";
import { Image, Text, StyleSheet, View } from "react-native";

import colors from "../config/colors";
import WelcomeIndicator from "../components/WelcomeIndicator";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 30,
            fontStyle: "italic",
            fontWeight: "bold",
            color: colors.white,
            textAlign: "left",
            marginLeft: 20,
            marginBottom: 20,
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
            color: colors.white,
            textAlign: "right",
            marginRight: 20,
            textTransform: "capitalize",
          }}
        >
          Shop on the spot.
        </Text>
        <View style={styles.loading}>
          <WelcomeIndicator />
        </View>
        <Text>
          {setTimeout(() => {
            navigation.navigate("HomeScreen");
          }, 2000)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.cartBlue,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    margin: 10,
  },
  logoContainer: {
    marginTop: 10,
    margin: 10,
  },
  logo: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    margin: 0,
  },
  loading: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    transform: [{ scale: 2 }],
    marginTop: "-10%",
  },
});

export default WelcomeScreen;
