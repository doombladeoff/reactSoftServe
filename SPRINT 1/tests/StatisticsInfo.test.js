import { render, screen } from "@testing-library/react-native";
import StatisticsInfo from "../components/StatisticsInfo";
import words from "./testData";
import MyWords from "../data/words";
console.log(MyWords);

MyWords.splice(0, MyWords.length);
MyWords.push(...words);

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

jest.mock("../components/InfoCard", () => {
  const { Text } = require("react-native");
  return ({ color, caption, number }) => (
    <Text>{`${caption} ${color} ${number}`}</Text>
  );
});

test(`StatisticsInfo renders InfoCards with correct props`, async () => {
  render(<StatisticsInfo />);

  const toLearnCard = screen.getByText("To learn hotpink 3");
  expect(toLearnCard).toBeOnTheScreen();
  const inProcessCard = screen.getByText("In process lightgreen 2");
  expect(inProcessCard).toBeOnTheScreen();
  const LearnedCard = screen.getByText("Learned lightblue 2");
  expect(LearnedCard).toBeOnTheScreen();
});
