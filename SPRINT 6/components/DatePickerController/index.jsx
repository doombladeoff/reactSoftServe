import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/styles";
import { fieldNames } from "../../constant/fieldNames";

export const DatePickerController = ({
                                         control,
                                         name,
                                         testID,
                                         requiredMessage,
                                         validateValue,
                                         trigger,
                                         showDatePicker,
                                         setShowDatePicker
                                     }) => {
    const ERROR_MESSAGE = "The Check-Out Date must be later than the Check-In Date";
    const validateInOut = (value, name) => {
        if (name === fieldNames.CHECK_IN_DATE && (value > validateValue)) return ERROR_MESSAGE;
        if (name === fieldNames.CHECK_OUT_DATE && (value < validateValue)) return ERROR_MESSAGE
    }

    const handleSetState = (name, state) => {
        if (name === fieldNames.CHECK_IN_DATE) setShowDatePicker(prevState => ({ ...prevState, checkInDate: state }));
        if (name === fieldNames.CHECK_OUT_DATE) setShowDatePicker(prevState => ({ ...prevState, checkOutDate: state }));
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: { value: true, message: requiredMessage },
                validate: (value) => {
                    return validateInOut(value, name);
                }
            }}
            render={({ field: { onChange, value } }) => {
                return (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            handleSetState(name, true);
                        }}>
                            <Text style={styles.buttonText}>
                                {value ? value.toLocaleDateString() : "Select Date"}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                testID={testID}
                                value={value || new Date()}
                                mode="date"
                                display='spinner'
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || value;
                                    onChange(currentDate);
                                    handleSetState(name, false);
                                    trigger()
                                }}
                            />
                        )}
                    </>
                )
            }}
        />
    );
}