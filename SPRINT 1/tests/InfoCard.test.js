import { render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import InfoCard from "../components/InfoCard";

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

const flattenStyle = (style) => {
  if (!style) return {};
  const styleArray = Array.isArray(style) ? style : [style];
  return styleArray.reduce(
    (acc, currentStyle) => ({
      ...acc,
      ...currentStyle,
    }),
    {}
  );
};

test(`InfoCard renders correct text and correct number with correct color`, async () => {
  const testData = { color: "red", caption: "test", number: "17" };

  render(<InfoCard {...testData} />);

  const caption = screen.getByText(testData.caption);
  expect(caption).toBeOnTheScreen();
  expect(flattenStyle(caption.props.style).color).toBe(testData.color);

  const number = screen.getByText(testData.number);
  expect(number).toBeOnTheScreen();
  expect(flattenStyle(number.props.style).color).toBe(testData.color);
});

test(`InfoCard renders border with correct color and width`, async () => {
  const testData = { color: "green", caption: "study", number: "0" };

  render(<InfoCard {...testData} />);

  const container = screen.getByText(testData.number).parent.parent;
  const containerStyle = flattenStyle(container.props.style);
  expect(containerStyle.borderColor).toBe("green");
  expect(containerStyle.borderWidth).toEqual(StyleSheet.hairlineWidth);
});
