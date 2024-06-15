import { render, screen } from "@testing-library/react-native";

import App from "../App";

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

jest.mock("../components/StatisticsInfo", () => {
  const { Text } = require("react-native");
  return () => <Text>StatisticsInfo</Text>;
});
jest.mock("../components/ImagePile", () => {
  const { Text } = require("react-native");
  return () => <Text>ImagePile</Text>;
});

test(`App renders StatisticsInfo and ImagePile components`, async () => {
  render(<App />);

  const statisticsInfo = screen.getByText("StatisticsInfo");
  expect(statisticsInfo).toBeOnTheScreen();
  const imagePile = screen.getByText("ImagePile");
  expect(imagePile).toBeOnTheScreen();
});
