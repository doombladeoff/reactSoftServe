import {
    render,
    screen
} from "@testing-library/react-native";
import * as Notifications from 'expo-notifications';
import App from "../App"

jest.mock("expo-notifications");

Notifications.getPermissionsAsync.mockResolvedValue({ status: 'granted' });

test('Main title is on the screen', () => {
    render(<App />);
    const title = screen.getByText('Countdowns');

    expect(title).toBeOnTheScreen();
});
