import { Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CustomButton = ({
                                 onPress,
                                 buttonText,
                                 buttonStyle,
                                 textStyle,
                                 iconName,
                                 iconSize,
                                 iconColor,
                                 children
                             }) => {
    return (
        <Pressable
            onPress={onPress}
            style={buttonStyle}
        >
            {iconName && <Ionicons name={iconName} size={iconSize} color={iconColor}/>}
            {buttonText && <Text style={textStyle}>{buttonText}</Text>}
            {children}
        </Pressable>
    );
};