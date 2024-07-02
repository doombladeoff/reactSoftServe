import { Image } from "react-native";

export const ImageViewer = ({ placeholderImageSource, selectedImage, width, height }) => {
    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource
    return <Image source={imageSource} style={{ borderRadius: 5, width: width, height: height }}/>
}