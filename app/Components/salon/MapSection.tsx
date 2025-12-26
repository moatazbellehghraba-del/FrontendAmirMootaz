import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
} from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Salon } from "../../../Types/saloon";
import { COLORS } from "../../../Constant/colors";

interface MapSectionProps {
  salon: Salon;
}

const { width } = Dimensions.get("window");

/* ===========================
   Distance Helpers
=========================== */

// Haversine formula (meters)
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const formatDistance = (meters: number): string =>
  meters < 1000
    ? `${Math.round(meters)} m away`
    : `≈ ${(meters / 1000).toFixed(1)} km away`;

/* ===========================
   Component
=========================== */

export default function MapSection({ salon }: MapSectionProps) {
  const DEFAULT_ADDRESS =
    "1ème étage Bureau 1-2, Immeuble Tartella, Avenue Yasser Arafet, Sousse 4054";

  const displayAddress = salon.address || DEFAULT_ADDRESS;
  const lat = salon.coordinates.latitude || 35.839029;
  const lon = salon.coordinates.longitude || 10.59715;

  const [distanceText, setDistanceText] = useState("Calculating distance...");
  const [loadingLocation, setLoadingLocation] = useState(true);

  /* ===========================
     Get User Location
  =========================== */

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setDistanceText("Location permission denied");
        setLoadingLocation(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const distance = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          lat,
          lon
        );

        setDistanceText(formatDistance(distance));
      } catch {
        setDistanceText("Unable to get location");
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, [lat, lon]);

  /* ===========================
     Open Native Navigation
  =========================== */

  const openNavigation = () => {
    const url =
      Platform.OS === "android"
        ? `geo:${lat},${lon}?q=${lat},${lon}(${encodeURIComponent(
            displayAddress
          )})`
        : `https://maps.apple.com/?ll=${lat},${lon}`;

    Linking.openURL(url);
  };

  /* ===========================
     Render
  =========================== */

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={openNavigation}>
        <MapView
          style={styles.map}
          region={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.003, // 👈 closer zoom
            longitudeDelta: 0.003,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          mapType="none"
        >
          <UrlTile
            urlTemplate="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png"
            tileSize={512} // 👈 HD tiles
            maximumZ={20}
            zIndex={-1}
          />

          <Marker
            coordinate={{ latitude: lat, longitude: lon }}
            pinColor={COLORS.primary}
          />
        </MapView>

        {/* Tap hint */}
        <View style={styles.hintContainer}>
          <Ionicons name="navigate-outline" size={14} color={COLORS.primary} />
          <Text style={styles.hintText}>Tap for directions</Text>
        </View>
      </TouchableOpacity>

      {/* Address + Distance */}
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{displayAddress}</Text>
        <Text style={styles.subText}>Sousse, Tunisia • 4054</Text>

        <View style={styles.distanceRow}>
          <Ionicons name="location-outline" size={16} color={COLORS.primary} />
          <Text style={styles.distanceText}>
            {loadingLocation ? (
              <>
                <ActivityIndicator size="small" color={COLORS.primary} />
                {"  "}Calculating...
              </>
            ) : (
              distanceText
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ===========================
   Styles
=========================== */

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  map: {
    width: "100%",
    height: 220,
  },
  hintContainer: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  hintText: {
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: "600",
  },
  addressContainer: {
    padding: 16,
  },
  addressText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "500",
    lineHeight: 22,
  },
  subText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  distanceText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 6,
    fontWeight: "600",
  },
});
