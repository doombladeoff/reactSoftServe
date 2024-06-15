import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllWords from "../screens/Words/AllWords";
import AddWord from "../screens/Words/AddWord";
import EditWord from "../screens/Words/EditWord";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

function WordsNavigation() {

    const theme = useSelector((state) => state.theme.colors);

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { fontWeight: "800" },
                headerTransparent: true,
                headerTintColor: theme.primary900,
                headerTitleAlign: "center",
                contentStyle: { backgroundColor: theme.appBackground },
            }}
        >
            <Stack.Screen
                name="AllWords"
                options={{
                    headerShown: false,
                }}
                component={AllWords}
            />
            <Stack.Screen
                name="AddWord"
                options={{
                    title: "Add Word",
                }}
                component={AddWord}
            />
            <Stack.Screen
                name="EditWord"
                options={({ route }) => {
                    const word = route.params.wordData.word;
                    return {
                        title: `Editing word "${word}"`,
                    };
                }}
                component={EditWord}
            />
        </Stack.Navigator>
    );
}

export default WordsNavigation;
