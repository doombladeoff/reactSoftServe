import renderer from "react-test-renderer"
import { render, fireEvent } from "@testing-library/react-native";
import { View, TextInput } from 'react-native';
import App from "./App"

describe("App", () => {

    test("has 2 childs", () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree.children.length).toBe(2);
    });

    test("check that the note container is empty before entering notes", () => {
        const { getByTestId } = render(<App />);

        expect(getByTestId("notesContainer").children.length).toBe(0);
    });

    test("check onChangeText", () => {           
        const onChangeTextMock = jest.fn();
        const { getByPlaceholderText } = render(
            <View>
                <TextInput placeholder="Enter your note" onChangeText={onChangeTextMock} />
            </View>
        );
        fireEvent.changeText(getByPlaceholderText("Enter your note"), "some text");
        expect(onChangeTextMock).toHaveBeenCalled(); 
    });

    test("check that the input text field is cleared after the button is pressed", () => {
        const { getByPlaceholderText, getByText } = render(<App />);

        fireEvent.changeText(getByPlaceholderText("Enter your note"), "new item");
        fireEvent.press(getByText('Add note'));

        expect(getByPlaceholderText("Enter your note")).toHaveDisplayValue("");
    });

    test("check that it is not possible to add an empty note first", () => {
        const { getByText, getByTestId } = render(<App />);

        fireEvent.press(getByText('Add note'));

        expect(getByTestId("notesContainer").children.length).toBe(0);
    });

    test("check that it is not possible to add an empty note after an added note", () => {

        const { getByPlaceholderText, getByText, getByTestId } = render(<App />);

        fireEvent.changeText(getByPlaceholderText("Enter your note"), "New note text");
        fireEvent.press(getByText('Add note'));        
        fireEvent.press(getByText('Add note'));
        
        expect(getByTestId("notesContainer").children.length).toBe(1);
    });

    test("check the rendering of the note when it was entered", () => {
        const { getByPlaceholderText, getByText, getAllByText, getByTestId } = render(<App />);

        fireEvent.changeText(getByPlaceholderText("Enter your note"), "note 1");
        fireEvent.press(getByText('Add note'));

        expect(getAllByText("note 1")).toHaveLength(1);
        expect(getByTestId("notesContainer").children.length).toBe(1);
    });

    test("check rendering of several added notes", () => {
        const { getByPlaceholderText, getByText, getAllByText, getByTestId } = render(<App />);

        fireEvent.changeText(getByPlaceholderText("Enter your note"), "Item 1");
        fireEvent.press(getByText('Add note'));

        fireEvent.changeText(getByPlaceholderText("Enter your note"), "Item 2");
        fireEvent.press(getByText('Add note'));

        expect(getAllByText("Item 1")).toHaveLength(1);
        expect(getAllByText("Item 2")).toHaveLength(1);
        expect(getByTestId("notesContainer").children.length).toBe(2);
    });

    test("check note styles", () => {
        const BACKGROUND_COLOR = '#ffffff';
        const NOTE_COLOR = '#ffffff';

        const { getByPlaceholderText, getByText, getByTestId } = render(<App />);
        
        fireEvent.changeText(getByPlaceholderText("Enter your note"), "New note text");
        fireEvent.press(getByText('Add note'));
        
        expect(getByTestId("pressableElem")).toHaveStyle({ backgroundColor: BACKGROUND_COLOR });
        expect(getByTestId("noteElem")).toHaveStyle({ color: NOTE_COLOR });
    });

});