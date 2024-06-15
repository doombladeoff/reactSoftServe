import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { InputController } from "./components/InputController";
import { DatePickerController } from "./components/DatePickerController";
import { sendData } from "./services/sendDate";
import { styles } from "./styles/styles";
import { fieldNames } from "./constant/fieldNames";

export default function App() {
    const [isShowDatePicker, setShowDatePicker] = useState({
        checkInDate: false,
        checkOutDate: false
    });
    const form = useForm({
            defaultValues: {
                userName: '',
                email: '',
                checkInDate: new Date(),
                checkOutDate: '',
                roomType: "Standard",
            }
        }),
        {
            control,
            handleSubmit,
            formState: { errors },
            getValues,
            trigger,
        } = form

    const onError = (data) => {
        console.error(JSON.stringify(data, null, 2));
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.formHeader}>Booking form</Text>

                {/* Name input field */}
                <Text style={styles.formTitle}>Name</Text>
                <InputController
                    control={control}
                    name={fieldNames.USER_NAME}
                    testID='user-name-input'
                    requiredMessage='Name is required'
                    pattern={{
                        value: /^[A-Z][a-z]{2,}$/,
                        message: "Name must start with a capital letter and contain at least 3 characters"
                    }}
                />
                {errors.userName && <Text style={styles.errorText}>{errors.userName.message}</Text>}

                {/* Email input field */}
                <Text style={styles.formTitle}>email</Text>
                <InputController
                    control={control}
                    name={fieldNames.EMAIL}
                    testID='email-input'
                    requiredMessage='e-mail is required'
                    pattern={{
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email address. Please enter a valid email'
                    }}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                {/* Check-In Date field */}
                <Text style={styles.formTitle}>Check-In Date</Text>
                <DatePickerController
                    control={control}
                    name={fieldNames.CHECK_IN_DATE}
                    testID='date-time-picker'
                    requiredMessage='Check-In Date is required'
                    validateValue={getValues(fieldNames.CHECK_OUT_DATE)}
                    trigger={trigger}
                    showDatePicker={isShowDatePicker.checkInDate}
                    setShowDatePicker={setShowDatePicker}
                />

                {/* Check-Out Date field */}
                <Text style={styles.formTitle}>Check-Out Date</Text>
                <DatePickerController
                    control={control}
                    name={fieldNames.CHECK_OUT_DATE}
                    testID='date-time-picker'
                    requiredMessage='Check-Out Date is required'
                    validateValue={getValues(fieldNames.CHECK_IN_DATE)}
                    trigger={trigger}
                    showDatePicker={isShowDatePicker.checkOutDate}
                    setShowDatePicker={setShowDatePicker}
                />
                {errors.checkOutDate && <Text style={styles.errorText}>{errors.checkOutDate.message}</Text>}

                {/* Room Type field */}
                <Text style={styles.formTitle}>Choose the room type:</Text>
                <Controller
                    control={control}
                    name={fieldNames.ROOM_TYPE}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Picker
                                testID="room-type"
                                selectedValue={value}
                                onValueChange={(value) => {
                                    onChange(value);
                                    trigger();
                                }}
                            >
                                <Picker.Item label="Standard" value="standard"/>
                                <Picker.Item label="Luxury" value="luxury"/>
                                <Picker.Item label="Family" value="family"/>
                            </Picker>
                        )
                    }}
                />
                <TouchableOpacity
                    style={{ ...styles.button, marginTop: 50 }}
                    title="Submit"
                    onPress={handleSubmit((data) => sendData(data), onError)}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}
