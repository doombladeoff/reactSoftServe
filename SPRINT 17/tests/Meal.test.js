import { render, screen } from "@testing-library/react-native";
import Meal from "../components/MealDisplay";

const mockMeal = {
    strMeal: 'Teriyaki Chicken Casserole',
    strMealThumb: 'link',
    strInstructions: 'instructions',
};

describe('Meal display', () => {
    test('displays the meal', () => {
        const { getByText, getAllByRole } = render(<Meal meal={mockMeal}/>);
        const image = screen.getByTestId('mealImage');

        expect(getByText(mockMeal.strMeal)).toBeOnTheScreen();
        expect(getByText(mockMeal.strInstructions)).toBeOnTheScreen();
        expect(image).toBeOnTheScreen();
        expect(image.props.source.uri).toBe(mockMeal.strMealThumb);
    })
});