import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as imgDB from "../../database/SQLiteDB";

function ImageSelection({ navigation }) {
  const [image, setImage] = useState(null);
  const [imageSource, setIMGsource] = useState('No Source');

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
    let phoneGallery = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.7,
      base64: true,
    });
    const result = phoneGallery.base64;


    console.log("img source:", result);
    let base64Img = `data:image/jpg;base64,${result}`;
    let apiUrl = 'https://api.cloudinary.com/v1_1/dzr34w1dd/image/upload';
    let data = {
      file: base64Img,
      upload_preset: 'hskz2avq'
    };

    fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
      .then(async response => {
        let data = await response.json();
        if (data.secure_url) {
          let dataurl = data.url;
          const returnedID = await imgDB.database.insertUrl_RecentItems(dataurl);
          // console.log(data.secure_url);
          console.log('returnedID (ImageSelection Screen): %d', returnedID);

          setIMGsource(data.secure_url);
          navigation.navigate('ResultScreen', { imageURL: data.secure_url, imageID: returnedID });
        }
      })
      .catch(err => {
        // alert('Cannot upload');
        console.log(err);
      });

  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}

export default ImageSelection;
