import { View, Switch, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/themeSlice";
import { SettingsStyle } from "../styles/SettingsStyles";

function Settings() {
    const switchValue = useSelector((state) => state.theme.isDark);
    const theme = useSelector((state) => state.theme.colors);
    const styles = SettingsStyle(theme);
    const dispatch = useDispatch();

    const toggleSwitch = () => {
        dispatch(themeActions.toggle());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.caption}>Choose color theme:</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.caption}>Light</Text>
                <Switch
                    trackColor={{
                        false: theme.grey300,
                        true: theme.primary300,
                    }}
                    thumbColor={theme.primary900}
                    ios_backgroundColor={theme.primary200}
                    style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                    value={switchValue}
                    onValueChange={toggleSwitch}
                />
                <Text style={styles.caption}>Dark</Text>
            </View>
        </View>
    );
}

export default Settings;
