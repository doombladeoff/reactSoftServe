import { Dimensions, Modal, Pressable, SafeAreaView, StatusBar, Text, View, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';

export const ModalAddress = ({ isShow, onClose }) => {
    return (
        <Modal
            animationType="slide"
            visible={isShow.visible}
            transparent={true}
        >
            <SafeAreaView style={styles.safeContainer}>
                <View
                    style={styles.container}>
                    <Text style={{ fontWeight: 'bold', fontSize: 34 }}>
                        {isShow?.errorText}
                    </Text>
                    <Entypo name="emoji-sad" size={34} color="black"/>
                    <Pressable onPress={onClose}
                               style={styles.button}>
                        <Text style={{ textAlign: 'center' }}>
                            Close
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        marginTop: StatusBar.currentHeight + (Dimensions.get('screen').height / 1.5),
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 35,
    },
    container: {
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingTop: 40
    },
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})