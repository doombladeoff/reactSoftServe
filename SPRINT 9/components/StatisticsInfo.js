import { View, StyleSheet } from "react-native";
import InfoCard from "./InfoCard";
import { useSelector } from "react-redux";

function StatisticsInfo() {
    const words = useSelector(state => state.wordsLearning.words);

    const learned = words.filter(word => word.status === 2).length;
    const inProcess = words.filter(word => word.status === 1).length;
    const toLearn = words.filter(word => word.status === 0).length;
    return (
        <View style={styles.container}>
            <InfoCard
                caption={"To learn"}
                number={toLearn}
                color={true ? "hotpink" : "mediumvioletred"}
            />
            <InfoCard
                caption={"In process"}
                number={inProcess}
                color={true ? "lightgreen" : "green"}
            />
            <InfoCard
                caption={"Learned"}
                number={learned}
                color={true ? "lightblue" : "mediumblue"}
            />
        </View>
    );
}

export default StatisticsInfo;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: "20%",
    },
});
