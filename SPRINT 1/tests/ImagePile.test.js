import { render, screen } from "@testing-library/react-native";
import ImagePile from "../components/ImagePile";

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

jest.mock("react-native", () => {
  const actualReactNative = jest.requireActual("react-native");
  return Object.setPrototypeOf(
    {
      Image: ({ style }) => (
        <actualReactNative.Text style={{ position: style.position }}>
          image
        </actualReactNative.Text>
      ),
    },
    actualReactNative
  );
});

test(`ImagePile, images can be placed according to requirement`, async () => {
  render(<ImagePile />);

  const images = screen.getAllByText("image");
  expect(images).toHaveLength(5)
  expect(images.some(image => image.props.style.position === "absolute")).toBeTruthy()
});
