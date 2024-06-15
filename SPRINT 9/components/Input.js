import { Text, TextInput } from "react-native";

export const Input = ({
                          label,
                          value,
                          onChangeText,
                          labelStyle,
                          inputStyle,
                          multiLine,
                          textAlignVertical,
                          numberOfLines,
                          placeholderTextColor
                      }) => {
    return (
        <>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                value={value}
                multiline={multiLine}
                textAlignVertical={textAlignVertical}
                numberOfLines={numberOfLines}
                placeholder={'type here..'}
                placeholderTextColor={placeholderTextColor}
                onChangeText={onChangeText}
                style={inputStyle}
            />
        </>
    )
};