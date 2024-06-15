import { createDrawerNavigator } from "@react-navigation/drawer";
import Statistics from "../screens/Learning/Statistics";
import Play from "../screens/Learning/Play";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

function LearningNavigation() {

    const theme = useSelector((state) => state.theme.colors);

    return (
        <Drawer.Navigator
            screenOptions={{
                headerTitleStyle: { fontWeight: "800" },
                headerTintColor: theme.primary900,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: theme.appBackground,
                },
                drawerStyle: {
                    backgroundColor: theme.primary200,
                    width: 140,
                    height: 130,
                    borderBottomRightRadius: 20,
                },
                drawerInactiveTintColor: theme.fontMain,
                drawerActiveTintColor: theme.primary100,
                drawerActiveBackgroundColor: theme.primary300,
                drawerType: "front",
                contentStyle: { backgroundColor: theme.appBackground },
            }}
        >
            <Drawer.Screen name="Statistics" component={Statistics}/>
            <Drawer.Screen name="Play" component={Play}/>
        </Drawer.Navigator>
    );
}

export default LearningNavigation;
