import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

export const MapViewer = ({ mapRef, marker, coordinates, location }) => {
    return (
        <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={{
                latitude: location ? location.coords.latitude : 37.78825,
                longitude: location ? location.coords.longitude : -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {marker ? <Marker coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}/> : null}
            {coordinates.length === 2 && <Polyline coordinates={coordinates}/>}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: "100%",
    },
})