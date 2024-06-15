import { View, FlatList, Image, Text } from "react-native";
import Item from "../../components/ListItem";
import { useSelector } from "react-redux";
import { AllWordsStyle } from "../../styles/AllWordsStyle";
import { CustomButton } from "../../components/CustomButton";

function AllWords({ navigation }) {
    const words = useSelector((state) => state.wordsLearning.words);

    const theme = useSelector((state) => state.theme.colors);
    const styles = AllWordsStyle(theme);

    return (
        <>
            <CustomButton
                buttonStyle={styles.addPressable}
                onPress={() => navigation.navigate("AddWord")}
                iconName="add-outline"
                iconSize={46}
                iconColor={theme.fontInverse}
            />
            <View style={{ flex: 2 }}>
                <FlatList
                    data={words}
                    renderItem={({ item }) => <Item item={item}/>}
                    keyExtractor={(item) => item.word}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.textEmpty}>No words yet</Text>
                        </View>
                    }
                    ListHeaderComponent={
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require("../../assets/study(option3).png")}
                            />
                        </View>
                    }
                />
            </View>
        </>
    );
}

export default AllWords;
