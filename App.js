import * as React from 'react';
import { Pressable, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import initialScreen from './screens/initialScreen';
import homeScreen from './screens/homeScreen';
import cameraScreen from './screens/cameraScreen';
import resultsScreen from './screens/resultsScreen';



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


