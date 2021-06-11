import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import HomeScreen from "./app/screens/HomeScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import HubScreen from "./app/screens/HubScreen";
import AppText from "./app/components/AppText";
import HeadingText from "./app/components/HeadingText";
import RecentItem from "./app/components/RecentItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "./app/components/Screen";
import Icon from "./app/components/Icon";
import ItemLink from "./app/components/ItemLink";
import ResultScreen from "./app/screens/ResultScreen";
import Card from "./app/components/Card";

/*

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="initialScreen" component={initialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="homeScreen" component={homeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="cameraScreen" component={cameraScreen} options={{ title: "Snap Picture" }} />
        <Stack.Screen name="resultsScreen" component={resultsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/

export default function App() {
  return <HubScreen />;
}
