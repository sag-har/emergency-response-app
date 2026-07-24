import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// ===================================================================
// LIVE TRACKING MAP (Week 4)
//
// Renders two distinct markers:
//   - the user's submitted emergency location (red pin)
//   - the oncoming ambulance's current mocked position (blue pin,
//     fetched from GET /api/emergency/:id/location)
// Falls back to a friendly placeholder if either coordinate hasn't
// loaded yet, instead of rendering a blank/broken map.
// ===================================================================
export default function LiveTrackingMap({ userLocation, ambulanceLocation, loading }) {
  if (loading || !userLocation || !ambulanceLocation) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderEmoji}>🗺️</Text>
        <Text style={styles.placeholderText}>Loading live map…</Text>
      </View>
    );
  }

  const midLat = (userLocation.latitude + ambulanceLocation.latitude) / 2;
  const midLng = (userLocation.longitude + ambulanceLocation.longitude) / 2;
  const latDelta = Math.max(Math.abs(userLocation.latitude - ambulanceLocation.latitude) * 2.5, 0.02);
  const lngDelta = Math.max(Math.abs(userLocation.longitude - ambulanceLocation.longitude) * 2.5, 0.02);

  return (
    <View style={styles.card}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: midLat,
          longitude: midLng,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        }}
      >
        <Marker
          coordinate={userLocation}
          title="Your Location"
          description="Where the emergency was reported"
          pinColor="#DC2626"
        />
        <Marker
          coordinate={ambulanceLocation}
          title="Ambulance"
          description="Responder en route"
          pinColor="#2563EB"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 260,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  map: {
    flex: 1,
  },
  placeholder: {
    height: 260,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  placeholderEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  placeholderText: {
    color: "#64748B",
  },
});