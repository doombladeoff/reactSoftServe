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
Notifications.scheduleNotificationAsync.mockResolvedValue('notificationId');

test('Notification sends correctly', async () => {
    jest.useFakeTimers();
    render(<App />);

    const titleInput = screen.getByTestId('input');
    const timePicker = screen.UNSAFE_getByType(DateTimePicker);

    expect(titleInput).toBeOnTheScreen();
    expect(timePicker).toBeDefined();

    const user = userEvent.setup();
    await user.type(titleInput, "Good Day!");

    // Fire the onChange Event
    act(() => {
        fireEvent(
            timePicker,
            'onChange',
            ...createDateTimeSetEvtParams(getNextMinuteCurrentTime()),
        );
    })

    const addBtn = screen.getByTestId('addBtn');
    expect(addBtn).toBeOnTheScreen();

    await user.press(addBtn);
    act(jest.runAllTimers);

    expect(Notifications.scheduleNotificationAsync).toHaveBeenCalled();
    const scheduleResult = Notifications.scheduleNotificationAsync.mock.results[0].value;
    await expect(scheduleResult).resolves.toEqual('notificationId');
});
