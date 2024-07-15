import {
    render,
    screen,
    userEvent,
    act,
    fireEvent,
} from "@testing-library/react-native";
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import App from "../App"
import { getNextMinuteCurrentTime } from "../utils.js/time";

jest.mock("expo-notifications");

const createDateTimeSetEvtParams = (date) => {
    return [
        {
            type: 'set',
            nativeEvent: {
                timestamp: date.getTime(),
            },
        },
        date,
    ];
};

Notifications.getPermissionsAsync.mockResolvedValue({ status: 'granted' });
Notifications.cancelScheduledNotificationAsync.mockResolvedValue();

test('Notification removes correctly', async () => {
    jest.useFakeTimers();
    render(<App />);

    const titleInput = screen.getByTestId('input');
    const timePicker = screen.UNSAFE_getByType(DateTimePicker);
    const addBtn = screen.getByTestId('addBtn');

    const user = userEvent.setup();
    await user.type(titleInput, "Good Day!");
    act(() => {
        fireEvent(
            timePicker,
            'onChange',
            ...createDateTimeSetEvtParams(getNextMinuteCurrentTime()),
        );
    })

    await user.press(addBtn);

    const removeBtn = screen.getByTestId('removeBtn');
    await user.press(removeBtn);

    expect(Notifications.cancelScheduledNotificationAsync).toHaveBeenCalled();
});
