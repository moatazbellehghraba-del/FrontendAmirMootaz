import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Dimensions } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Salon } from '../../../Types/saloon';
import { COLORS } from '../../../Constant/colors';

interface MapSectionProps {
  salon: Salon;
}

const { width } = Dimensions.get('window');

export default function MapSection({ salon }: MapSectionProps) {
  const DEFAULT_ADDRESS = "1ème étage Bureau 1-2, Immeuble Tartella, Avenue Yasser Arafet, Sousse 4054";
  const displayAddress = salon.address || DEFAULT_ADDRESS;
  
  // Your exact coordinates
  const lat = 35.839029;
  const lon = 10.597150;

  const openNavigation = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`);
  };

  return (
    <View style={{
      backgroundColor: COLORS.card,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
    }}>
      {/* Interactive Map Preview */}
      <TouchableOpacity onPress={openNavigation}>
        <MapView
          style={{ width: '100%', height: 220 }}
          region={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.01, // Adjust for desired initial zoom (smaller = more zoomed in)
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false} // Disable scrolling for static-like preview
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
        >
          {/* Free OSM tiles - high resolution, no key needed */}
          <UrlTile
            urlTemplate="https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
            zIndex={1}
            maximumZ={19} // High zoom support
          />
          
          {/* Centered Marker */}
          <Marker
            coordinate={{ latitude: lat, longitude: lon }}
            pinColor={COLORS.primary} // Or use a custom image for better look
          />
        </MapView>
        
        {/* Navigation Hint */}
        <View style={styles.hintContainer}>
          <Ionicons name="open-outline" size={14} color={COLORS.primary} />
          <Text style={styles.hintText}>
            Tap to open
          </Text>
        </View>
      </TouchableOpacity>
      
      {/* Address */}
      <View style={{ padding: 16 }}>
        <Text style={{ 
          fontSize: 16, 
          color: COLORS.textPrimary,
          lineHeight: 22,
          fontWeight: '500'
        }}>
          {displayAddress}
        </Text>
        <Text style={{ 
          fontSize: 14, 
          color: COLORS.textSecondary,
          marginTop: 4
        }}>
          Sousse, Tunisia • 4054
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hintContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintText: {
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
});