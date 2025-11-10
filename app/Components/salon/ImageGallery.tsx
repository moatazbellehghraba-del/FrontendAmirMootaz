import React, { useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { COLORS } from '../../../Constant/colors';

const { width } = Dimensions.get('window');

interface ImageGalleryProps {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

export default function ImageGallery({ images, currentImageIndex, setCurrentImageIndex }: ImageGalleryProps) {
  const flatListRef = useRef<FlatList>(null);

  const onImageScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / width);
    setCurrentImageIndex(index);
  };

  return (
    <View style={{ position: 'relative', height: 300 }}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onImageScroll}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width, height: 300 }}>
            <Image
              source={{ uri: item }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        )}
      />
      
      <View style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
      }}>
        <Text style={{ color: COLORS.secondary, fontSize: 12, fontWeight: '600' }}>
          {currentImageIndex + 1} / {images.length}
        </Text>
      </View>
    </View>
  );
}