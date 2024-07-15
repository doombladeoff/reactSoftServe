const axios = require("axios");
const { fetchMeal } = require("../services/mealService");

jest.mock("axios");

describe('fetchMeal', () => {
    test("fetchMeal returns a meal object", async () => {
        const mockMeal = { name: "Pizza", ingredients: ["Cheese", "Tomato"] };
        const response = { data: { meals: [mockMeal] } };
        axios.get.mockResolvedValueOnce(response);

        const result = await fetchMeal();
        expect(result).toEqual(mockMeal);
    });

    test("fetchMeal calls once", async () => {
        axios.get.mockClear();
        const mockMeal = { name: "Potato", ingredients: ["Cheese", "Tomato"] };
        const response = { data: { meals: [mockMeal] } };
        axios.get.mockResolvedValueOnce(response);
        const axiosSpy = jest.spyOn(axios, "get");

        const result = await fetchMeal();
        expect(axiosSpy).toHaveBeenCalledTimes(1);
    });

    test("fetchMeal returns null and logs error when an error occurs", async () => {
        const errorMessage = "API call failed";
        axios.get.mockRejectedValueOnce(new Error(errorMessage));
        console.error = jest.fn(); // Mock console.error

        const result = await fetchMeal("Error");
        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});
