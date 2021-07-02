import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform, Text, Image } from "react-native";
//import * as ImagePicker from 'expo-image-picker';

function ImageSelection({ navigation }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      // navigation.navigate('imgGalleryScreen', { imageName: result.uri });
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
      <Text>
        {!image &&
          setTimeout(() => {
            pickImage();
          }, 10)}
      </Text>
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      {image && navigation.navigate("imgGalleryScreen", { imageName: "image" })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  imageDisplay: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default ImageSelection;
