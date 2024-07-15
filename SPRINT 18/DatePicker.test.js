import { render, fireEvent, waitFor } from "@testing-library/react-native"; // Import `waitFor`
import App from "./App";

const mockDatePicker = jest.fn();
jest.mock("react-native-date-picker", () => {
  return (props) => {
    mockDatePicker(props);
    return props.open ? (
      <button testID="date-picker">Mock DatePicker</button>
    ) : null;
  };
});

describe("DatePicker.test", () => {
  it("should call react-native-date-picker with correct props", async () => {
    const { getByText, queryByText, getByTestId, getByPlaceholderText } =
      render(<App />);
    fireEvent.changeText(
      getByPlaceholderText("Enter task title"),
      "Task with Due Date"
    );
    fireEvent.press(getByText("Add Task"));
    fireEvent.press(queryByText("No Due Date"));
    const datePicker = getByTestId("date-picker");
    expect(datePicker).toBeDefined();
    expect(mockDatePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        modal: true,
        mode: "datetime",
        date: expect.any(Date),
      })
    );
  });
});
