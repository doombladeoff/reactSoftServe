import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";
import EditWord from "./screens/EditWord";

import { COLORS } from "./constants";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primary900
                }}
            >
                <Stack.Screen
                    name={'AllWords'}
                    component={AllWords}
                    options={{
                        title: ''
                    }}
                />
                <Stack.Screen
                    name={'AddWord'}
                    component={AddWord}
                    options={{
                        title: 'Adding word',
                        headerBackTitle: ' ',
                    }}
                />
                <Stack.Screen
                    name={'EditWord'}
                    component={EditWord}
                    options={({ route }) => ({
                        title: `Editing word "${route.params.wordData?.word}"`
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
