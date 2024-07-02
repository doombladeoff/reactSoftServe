import { Text } from "react-native";
import Animated, * as RestAnimated from "react-native-reanimated";
import * as ReDashModule from "react-native-redash";
jest.mock("react-native-reanimated");
jest.mock("react-native-redash");
import { render, screen, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import App from "./App";

function setupFunctions(progress) {
  Animated.createAnimatedComponent.mockImplementationOnce(
    () =>
      ({ animatedProps }) =>
        <Text>{JSON.stringify(animatedProps)}</Text>
  );
  RestAnimated.useAnimatedProps.mockImplementationOnce((argFunc) => argFunc());
  RestAnimated.useSharedValue.mockImplementationOnce(() => ({
    value: progress,
  }));
  RestAnimated.useDerivedValue.mockImplementationOnce(
    (argFunc) => argFunc()
  );
  RestAnimated.withTiming.mockImplementationOnce(() => 0.3);
  ReDashModule.ReText.mockImplementationOnce(({ text }) => <Text>{text}</Text>);
}
afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

test("when rpogress is 0 it is used correctly", async () => {
  const progress = 0;
  setupFunctions(progress);
  render(<App />);

  expect(RestAnimated.useSharedValue).toHaveBeenCalledWith(0);
  expect(RestAnimated.useAnimatedProps).toHaveBeenCalled();
  expect(RestAnimated.useDerivedValue).toHaveBeenCalled();
  expect(RestAnimated.withTiming).not.toHaveBeenCalled();
  const progressText = screen.getByText("0");
  const animatedPropsValue = screen.getByText(
    `{"strokeDasharray":[${0},${1000}]}`
  );
  expect(progressText).toBeOnTheScreen();
  expect(animatedPropsValue).toBeOnTheScreen();

  fireEvent.press(screen.getByText("Run"));
  expect(RestAnimated.withTiming).toHaveBeenCalledWith(1, { duration: 2000 });
});

test("when rpogress is 0.3 it is used correctly", async () => {
  const progress = 0.3;
  setupFunctions(progress);
  render(<App />);

  expect(RestAnimated.useSharedValue).toHaveBeenCalledWith(0);
  expect(RestAnimated.useAnimatedProps).toHaveBeenCalled();
  expect(RestAnimated.useDerivedValue).toHaveBeenCalled();
  expect(RestAnimated.withTiming).not.toHaveBeenCalled();
  const progressText = screen.getByText("30");
  const animatedPropsValue = screen.getByText(
    `{"strokeDasharray":[${progress * 1000},${(1 - progress) * 1000}]}`
  );
  expect(progressText).toBeOnTheScreen();
  expect(animatedPropsValue).toBeOnTheScreen();

  fireEvent.press(screen.getByText("Run"));
  expect(RestAnimated.withTiming).toHaveBeenCalledWith(0, { duration: 2000 });
});

test("when rpogress is 1 it is used correctly", async () => {
  const progress = 1;
  setupFunctions(progress);
  render(<App />);

  expect(RestAnimated.useSharedValue).toHaveBeenCalledWith(0);
  expect(RestAnimated.useAnimatedProps).toHaveBeenCalled();
  expect(RestAnimated.useDerivedValue).toHaveBeenCalled();
  expect(RestAnimated.withTiming).not.toHaveBeenCalled();
  const progressText = screen.getByText("100");
  const animatedPropsValue = screen.getByText(
    `{"strokeDasharray":[${1000},${0}]}`
  );
  expect(progressText).toBeOnTheScreen();
  expect(animatedPropsValue).toBeOnTheScreen();

  fireEvent.press(screen.getByText("Run"));
  expect(RestAnimated.withTiming).toHaveBeenCalledWith(0, { duration: 2000 });
});
test("when rpogress is 1 it is used correctly", async () => {
  setupFunctions(0);
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
