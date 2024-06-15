import "react-native-gesture-handler";
import MainNavigator from "./navigators/MainNavigator";
import { Provider } from "react-redux";
import store from "./store";
import { WordStatusUpdater } from "./components/WordStatusUpdater";

export default function App() {
    return (
        <Provider store={store}>
            <WordStatusUpdater/>
            <MainNavigator/>
        </Provider>
    );
}
