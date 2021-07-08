import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Button, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import HomeScreen from "./app/screens/HomeScreen";
import cameraScreen from "./app/screens/cameraScreen";
import ResultScreen from "./app/screens/ResultScreen";
import ImageSelection from "./app/screens/ImageSelection";

import AppText from "./app/components/AppText";
import HeadingText from "./app/components/HeadingText";
import RecentItemCard from "./app/components/RecentItemCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "./app/components/Screen";
import Icon from "./app/components/Icon";
import ItemLink from "./app/components/ItemLink";
import Card from "./app/components/Card";

//for practice screen only
import * as imgDB from "./database/SQLiteDB";



// stack of pages
const Stack = createStackNavigator();

function App() {
  imgDB.initDB();
  //test retrieving all items
  imgDB.getItemwithID(imgDB.db, -1);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen"> {/* initial Route name = <first screen to show> */}
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cameraScreen"
          component={cameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImageSelection"
          component={ImageSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

// // Used to test screens
// export default function App() {
//   return <HomeScreen />;
// }
