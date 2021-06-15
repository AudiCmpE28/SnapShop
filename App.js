import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import HomeScreen from "./app/screens/HomeScreen";
import cameraScreen from "./app/screens/cameraScreen";
import ResultScreen from "./app/screens/ResultScreen";
import Viewshoot from "./app/extraScreens/cameraBackup";

import AppText from "./app/components/AppText";
import HeadingText from "./app/components/HeadingText";
import RecentItem from "./app/components/RecentItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "./app/components/Screen";
import Icon from "./app/components/Icon";
import ItemLink from "./app/components/ItemLink";
import Card from "./app/components/Card";

//for practice screen only
import PracticeScreen from "./app/extraScreens/PracticeScreen";

//stack of pages
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="cameraScreen"
          component={cameraScreen}
          options={{ title: "Snap Picture" }}
        />
        {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="cameraScreen" component={cameraScreen} options={{ title: "Snap Picture" }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// // Used to test screens
// export default function App() {
//   return <cameraScreen />;
// }
