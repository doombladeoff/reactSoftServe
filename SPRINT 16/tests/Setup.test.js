import {
    render, waitFor
} from "@testing-library/react-native";
import * as Notifications from 'expo-notifications';
import App from "../App"

jest.mock("expo-notifications");

Notifications.getPermissionsAsync.mockResolvedValue({ status: 'granted' });
Notifications.setNotificationHandler.mockImplementation(() => {
});

test('Setup notifications invokes', async () => {
    render(<App/>);
    //expect(Notifications.setNotificationHandler).toHaveBeenCalledTimes(1);
    await waitFor(() => {
        expect(Notifications.setNotificationHandler).toHaveBeenCalledTimes(1);
    }, { timeout: 3000 });
});
