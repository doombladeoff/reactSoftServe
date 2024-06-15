import { useState } from "react";
import { View, Text, Switch } from "react-native";
import { COLORS, COLORS_LIGHT } from "../constants";
import { darkTheme, lightTheme } from "../styles/SettingsStyles";

function Settings() {
    const [isDarkTheme, setDarkTheme] = useState(true)

    return (
        <View style={[isDarkTheme ? darkTheme.container : lightTheme.container, {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }]}>
            <Text style={isDarkTheme ? darkTheme.textInverse : lightTheme.textInverse}>Choose color theme:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 30 }}>
                <Text style={isDarkTheme ? darkTheme.text : lightTheme.text}>Light</Text>
                <Switch
                    value={isDarkTheme}
                    trackColor={{ false: COLORS_LIGHT.grey300, true: COLORS.primary300 }}
                    thumbColor={isDarkTheme ? COLORS.primary900 : COLORS_LIGHT.grey600}
                    ios_backgroundColor={isDarkTheme ? COLORS_LIGHT.primary300 : COLORS.grey600}
                    onValueChange={() => setDarkTheme(!isDarkTheme)}
                />
                <Text style={isDarkTheme ? darkTheme.text : lightTheme.text}>Dark</Text>
            </View>
        </View>
    )
}

export default Settings;
