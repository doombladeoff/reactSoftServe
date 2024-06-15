import { createDrawerNavigator } from "@react-navigation/drawer";
import Statistics from "../screens/Learning/Statistics";
import Play from "../screens/Learning/Play";
import { COLORS } from "../constants";

const Drawer = createDrawerNavigator();

function LearningNavigation() {
    return (
        <Drawer.Navigator screenOptions={{
            headerBackgroundContainerStyle: { backgroundColor: COLORS.primary200 },
            headerStyle: { backgroundColor: COLORS.primary200 },
            headerTintColor: COLORS.primary900,
            headerTitleAlign: "center",
            drawerStyle: { backgroundColor: COLORS.primary200 },
            drawerActiveBackgroundColor: COLORS.primary900,
            drawerActiveTintColor: COLORS.fontMain,
            drawerInactiveTintColor: COLORS.fontMain
        }} initialRouteName='Statistics'>
            <Drawer.Screen name='Statistics' component={Statistics}/>
            <Drawer.Screen name='Play' component={Play}/>
        </Drawer.Navigator>
    )
}

export default LearningNavigation;
