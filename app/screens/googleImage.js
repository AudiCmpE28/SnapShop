import imageSearch from "react-native-google-image-search";


imageSearch("cats", 0, 5).then(images => {
    return images.map(image => console.log(image.link));
});