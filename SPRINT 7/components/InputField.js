import { Text, TextInput } from "react-native";
import { styles } from "../styles/EditWordStyles";

export const InputField = ({ fieldName, value, onChangeText, textKey, multiline }) => {
    return (
        <>
            <Text style={styles.text}>{fieldName}:</Text>
            <TextInput value={value}
                       multiline={multiline ? true : false}
                       onChangeText={(text) => onChangeText(`${textKey}`, text)}
                       style={styles.textInput}
            />
        </>
    );
}