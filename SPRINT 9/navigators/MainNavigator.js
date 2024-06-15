import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import WordsNavigation from "./WordsNavigation";
import LearningNavigation from "./LearningNavigation";
import Settings from "../screens/Settings";
import { SafeAreaView, StatusBar } from "react-native";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

function MainNavigator() {
    const isDark = useSelector((state) => state.theme.isDark);
    const theme = useSelector((state) => state.theme.colors);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.appBackground }}>
                <StatusBar
                    backgroundColor={theme.appBackground}
                    barStyle={isDark ? "light-content" : "dark-content"}
                />
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={{
                            headerTitleStyle: { fontWeight: "800" },
                            tabBarActiveTintColor: theme.primary900,
                            tabBarActiveBackgroundColor: theme.appBackground,
                            tabBarInactiveBackgroundColor: theme.appBackground,
                            headerStyle: {
                                backgroundColor: theme.appBackground,
                            },
                            headerTintColor: theme.primary900,
                            headerTitleAlign: "center",
                        }}
                    >
                        <Tab.Screen
                            name="Words"
                            options={{
                                headerShown: false,
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="list-outline" size={size} color={color}/>
                                ),
                            }}
                            component={WordsNavigation}
                        />
                        <Tab.Screen
                            name="Learning"
                            component={LearningNavigation}
                            options={{
                                headerShown: false,
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="book-outline" size={size} color={color}/>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Settings"
                            component={Settings}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="settings-outline" size={size} color={color}/>
                                ),
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </>
    );
}

export default MainNavigator;
