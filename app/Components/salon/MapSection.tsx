// components/salon/MapSection.tsx (No API Key Solution - Fixed)
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Salon } from "../../../Types/saloon";
import { COLORS } from "../../../Constant/colors";

interface MapSectionProps {
  salon: Salon;
}

export default function MapSection({ salon }: MapSectionProps) {
  const DEFAULT_ADDRESS =
    "1ème étage Bureau 1-2, Immeuble Tartella, Avenue Yasser Arafet, Sousse 4054";
  const displayAddress = salon.address || DEFAULT_ADDRESS;

  const lat = 35.839029;
  const lon = 10.59715;
  const [mapKey, setMapKey] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Android-specific region settings
  const initialRegion = Platform.select({
    ios: {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    android: {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005, // More zoomed in for Android
      longitudeDelta: 0.005,
    },
  });

  const openNavigation = () => {
    // Use Apple Maps on iOS, Google Maps on Android
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${lon}&q=${encodeURIComponent(displayAddress)}`,
      android: `geo:${lat},${lon}?q=${lat},${lon}(${encodeURIComponent(displayAddress)})`,
      default: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`,
    });

    Linking.openURL(url!).catch(() => {
      // Fallback to OpenStreetMap if native app fails
      Linking.openURL(`https://www.openstreetmap.org/#map=17/${lat}/${lon}`);
    });
  };

  // Force map re-render on Android (workaround for rendering issues)
  useEffect(() => {
    if (Platform.OS === "android") {
      const timer = setTimeout(() => {
        setMapKey((prev) => prev + 1);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Alternative tile providers if OSM doesn't work
  const tileProviders = [
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",
  ];

  // Try different tile servers if one fails
  const [currentTileProvider, setCurrentTileProvider] = useState(0);

  const switchTileProvider = () => {
    setCurrentTileProvider((prev) => (prev + 1) % tileProviders.length);
    setMapKey((prev) => prev + 1);
  };

  if (hasError && Platform.OS === "android") {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.mapFallback}>
          <Ionicons name="map-outline" size={50} color={COLORS.primary} />
          <Text style={styles.errorTitle}>Map Unavailable</Text>
          <Text style={styles.errorText}>
            Could not load map tiles. Please check your internet connection.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setHasError(false);
              setMapKey((prev) => prev + 1);
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.directionsButton}
            onPress={openNavigation}
          >
            <Ionicons name="navigate-outline" size={18} color="#FFFFFF" />
            <Text style={styles.directionsButtonText}>Open in Maps App</Text>
          </TouchableOpacity>
        </View>

        {/* Address Section (still shown) */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{displayAddress}</Text>
          <Text style={styles.locationText}>Sousse, Tunisia • 4054</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <TouchableOpacity
        onPress={openNavigation}
        activeOpacity={0.9}
        style={styles.mapTouchable}
      >
        <View style={styles.mapContainer}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Loading map...</Text>
            </View>
          )}

          <MapView
            key={`map-${mapKey}`} // Force re-render with key change
            style={styles.map}
            region={initialRegion}
            initialRegion={initialRegion}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            zoomControlEnabled={false}
            toolbarEnabled={false}
            showsScale={false}
            showsCompass={false}
            showsPointsOfInterest={false}
            showsBuildings={true}
            showsIndoors={false}
            cacheEnabled={Platform.OS === "android"} // Cache enabled for Android
            moveOnMarkerPress={false}
            onMapReady={() => {
              setIsLoading(false);
              if (Platform.OS === "android") {
                // Force a small delay for Android rendering
                setTimeout(() => {
                  setMapKey((prev) => prev + 1);
                }, 100000);
              }
            }}
            // REMOVED: onError prop as it doesn't exist in react-native-maps
            // Use onLayoutError or other available error handlers instead
          >
            {/* OpenStreetMap Tile Layer */}
            <UrlTile
              urlTemplate={tileProviders[currentTileProvider]}
              maximumZ={19}
              minimumZ={0}
              flipY={false}
              shouldReplaceMapContent={true}
              tileSize={Platform.OS === "android" ? 512 : 256}
              zIndex={-1}
            />

            {/* Custom Marker */}
            <Marker
              coordinate={{ latitude: lat, longitude: lon }}
              tracksViewChanges={false} // Better performance on Android
            >
              <View style={styles.customMarker}>
                <View style={styles.markerDot}>
                  <Ionicons name="location" size={16} color="#FFFFFF" />
                </View>
                <View style={styles.markerPulse} />
              </View>
            </Marker>
          </MapView>

          {/* Map Controls */}
          <View style={styles.mapControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={switchTileProvider}
            >
              <Ionicons name="refresh" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <View style={styles.mapHint}>
              <Ionicons name="open-outline" size={14} color={COLORS.primary} />
              <Text style={styles.hintText}>Tap for directions</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Address Section */}
      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
          <Ionicons name="location-outline" size={20} color={COLORS.primary} />
          <Text style={styles.addressTitle}>Address</Text>
        </View>
        <Text style={styles.addressText}>{displayAddress}</Text>

        <View style={styles.locationDetails}>
          <View style={styles.locationBadge}>
            <Ionicons name="pin" size={12} color="#666" />
            <Text style={styles.badgeText}>Sousse</Text>
          </View>
          <View style={styles.locationBadge}>
            <Ionicons name="flag" size={12} color="#666" />
            <Text style={styles.badgeText}>Tunisia</Text>
          </View>
          <View style={styles.locationBadge}>
            <Ionicons name="barcode" size={12} color="#666" />
            <Text style={styles.badgeText}>4054</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.directionsButton}
          onPress={openNavigation}
        >
          <Ionicons name="navigate-outline" size={20} color="#FFFFFF" />
          <Text style={styles.directionsButtonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mapTouchable: {
    flex: 1,
  },
  mapContainer: {
    width: "100%",
    height: 220,
    position: "relative",
    backgroundColor: "#E8E8E8", // Fallback background color
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  mapControls: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  controlButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  mapHint: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  hintText: {
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: "600",
  },
  customMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  markerPulse: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    opacity: 0.3,
  },
  addressContainer: {
    padding: 16,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  addressText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  locationDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#666",
  },
  directionsButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  directionsButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mapFallback: {
    height: 220,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 12,
    marginBottom: 6,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary + "20", // 20% opacity
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  retryButtonText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  locationText: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
