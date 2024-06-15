import { Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { styles } from "../../styles/styles";

export const InputController = ({ control, name, testID, requiredMessage, pattern }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: { value: true, message: requiredMessage },
                pattern,
            }}
            render={({ field: { onChange, value } }) => {
                return (
                    <TextInput
                        testID={testID}
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                    />
                )
            }}
        />
    )
}