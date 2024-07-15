import { act, render, userEvent, screen, waitFor, fireEvent } from "@testing-library/react-native";
import App from "../App";
import axios from "axios";

jest.mock('axios');

const user = userEvent.setup();

const mockMeal = {
    strMeal: 'Teriyaki Chicken Casserole',
    strMealThumb: 'link',
    strInstructions: 'instructions',
};

describe('App', () => {
    beforeEach(() => {
        axios.get.mockClear();
    });

    test('render the input and button', () => {
        const { getByPlaceholderText, getByText } = render(<App/>);

        expect(getByPlaceholderText('Enter a meal name')).toBeOnTheScreen();
        expect(getByText('Get Meal')).toBeOnTheScreen();
    });

    test('displays "No meal was found" initially', () => {
        const { getByText } = render(<App/>);

        expect(getByText('No meal was found')).toBeTruthy();
    });

    test('fetches and displays the meal on button press', async () => {
        const response = { data: { meals: [mockMeal] } };
        axios.get.mockResolvedValueOnce(response);

        const { getByPlaceholderText, getByText, debug } = render(<App/>);

        const input = getByPlaceholderText('Enter a meal name');
        await user.type(input, 'Teriyaki');
        jest.useFakeTimers(400);

        const btn = getByText('Get Meal');
        act(() => {
            user.press(btn);
        });
        jest.useFakeTimers(2000);

        await waitFor(() => {
            //debug();
            const img = screen.getByTestId('mealImage');

            expect(getByText(mockMeal.strMeal)).toBeOnTheScreen();
            expect(img.props.source.uri).toBe(mockMeal.strMealThumb);
            expect(getByText(mockMeal.strInstructions)).toBeOnTheScreen();
        });
    });

    test('clears the input after fetching the meal', async () => {
        const response = { data: { meals: [mockMeal] } };
        axios.get.mockResolvedValueOnce(response);

        const { getByPlaceholderText, getByText } = render(<App/>);

        const input = getByPlaceholderText('Enter a meal name');
        const btn = getByText('Get Meal');

        act(async () => {
            await user.type(input, 'Teriyaki');
            jest.useFakeTimers(400);
            await user.press(btn);
        });
        jest.useFakeTimers(2000);


        await waitFor(() => {
            expect(input.props.value).toBe('');
        });
    });

    test('displays "No meal was found" when no meal is fetched', async () => {
        const response = { data: { meals: null } };
        axios.get.mockResolvedValueOnce(response);


        const { getByPlaceholderText, getByText } = render(<App/>);

        const input = getByPlaceholderText('Enter a meal name');
        await user.type(input, 'Teriyaki');
        jest.useFakeTimers(400);

        const btn = getByText('Get Meal');
        act(() => {
            user.press(btn);
        });
        jest.useFakeTimers(2000);


        await waitFor(() => expect(getByText('No meal was found')).toBeTruthy());
    });
});