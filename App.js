import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Button, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import WelcomeScreen from "./app/screens/WelcomeScreen";
import HomeScreen from "./app/screens/HomeScreen";
import cameraScreen from "./app/screens/cameraScreen";
import ResultScreen from "./app/screens/ResultScreen";
import Viewshoot from "./app/extraScreens/cameraBackup";
import ImageSelection from "./app/screens/ImageSelection";
import imgGalleryScreen from "./app/screens/imgGalleryScreen";

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
import * as imgDB from './database/SQLiteDB';
// stack of pages
const Stack = createStackNavigator();

function App({ navigation }) {
  imgDB.initDB();
  //test retrieving all items
  imgDB.getItemwithID(imgDB.db, -1);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="cameraScreen" component={cameraScreen} options={{
          title: "Snap",
          navigationOptions: ({ navigate, navigation }) => ({
            headerRight: (
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}>
                <Text>Click</Text>
              </TouchableOpacity>
            )
          }),
          // headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          //   <Text>Home</Text>
          //   {/* <Icon style={{ paddingLeft: 10 }} name="arrow-left" size={26} color="black" /> */}
          // </TouchableOpacity>,
        }} />
        <Stack.Screen name="ImageSelection" component={ImageSelection} options={{ title: "Select" }} />
        <Stack.Screen name="imgGalleryScreen" component={imgGalleryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{
          // headerShown: false,
          title: "Results",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Text>Click</Text>
            </TouchableOpacity>
          ),
        }} />


        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// // Used to test screens
// export default function App() {
//   const [word, setWord] = React.useState('building');
//   const [associations, setAssociations] = React.useState(null);
//   const getAssociations = () => {
//     fetch('/api/wordsapi/' + word)
//       .then(result => result.json())
//       .then(body => setAssociations(body));
//   };

//   return (
//     <SafeAreaView className="app">
//       <Text>API testing</Text>
//       <TextInput value={word} onChange={e => setWord(e.target.value)} />
//       <TouchableOpacity onClick={getAssociations} />

//       {associations && (
//         Object.keys(associations).length === 0
//           ? <Text>No results</Text>
//           : <View>
//             {Object.entries(associations).map(([association]) => (
//               <View>
//                 {association}
//                 {' '}
//               </View>
//             ))}
//           </View>
//       )}

//     </SafeAreaView>
//   );
// }
