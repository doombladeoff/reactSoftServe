import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, SafeAreaView, Text } from "react-native";
import * as Location from "expo-location";
import { ModalAddress } from "./components/Modal";
import { MapViewer } from "./components/MapViewer";
import { Buttons } from "./components/Buttons";

const ZOOM_LEVEL = 15;
const ANIMATION_DURATION = 2000;

const ERROR_MESSAGE = {
    NOT_FOUND_ADDRESS: 'Address not found',
    NO_PERMISSION: 'Permission to access location was denied',
}

export default function App() {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [marker, setMarker] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState({ visible: false, errorText: '' });
    const mapRef = useRef(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return setIsModalVisible({ visible: true, errorText: ERROR_MESSAGE.NO_PERMISSION });
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            await centerMap(location.coords.latitude, location.coords.longitude);
        })();
    }, []);

    const addMarker = async () => {
        if (address.trim() === '') return;
        try {
            let findAddress = await Location.geocodeAsync(address);
            if (findAddress.length === 0) {
                return setIsModalVisible({ visible: true, errorText: ERROR_MESSAGE.NOT_FOUND_ADDRESS });
            }
            let { latitude, longitude } = findAddress[0];
            setMarker({ latitude, longitude });
            setCoordinates([
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                },
                {
                    latitude,
                    longitude
                }
            ]);

            await centerMap(latitude, longitude);
        } catch (error) {
            setIsModalVisible({ visible: true, errorText: ERROR_MESSAGE.NOT_FOUND_ADDRESS });
        }
    };

    const centerMap = (latitude, longitude) => {
        mapRef.current.animateCamera({
            center: {
                latitude: latitude,
                longitude: longitude
            },
            zoom: ZOOM_LEVEL,
        }, { duration: ANIMATION_DURATION });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text>MAP</Text>
                </View>
                <MapViewer
                    mapRef={mapRef}
                    marker={marker}
                    coordinates={coordinates}
                    location={location}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter the address"
                    value={address}
                    onChangeText={setAddress}
                />
                <View style={styles.buttonContainer}>
                    <Buttons
                        onPress={addMarker}
                        textButton={'Add marker'}
                    />
                    {marker ? <Buttons onPress={() => centerMap(marker.latitude, marker.longitude)}
                                       textButton={'Center the marker'}
                    /> : null}
                </View>
                {isModalVisible &&
                    <ModalAddress
                        isShow={isModalVisible}
                        onClose={() => {
                            setIsModalVisible({ visible: false, errorText: '' });
                        }}
                    />
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    input: {
        width: "100%",
        height: 40,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 20,
    },
})

