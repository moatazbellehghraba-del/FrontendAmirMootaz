import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Review} from '../../../Types/saloon';
import { COLORS } from '../../../Constant/colors';
interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={14}
        color={COLORS.accent}
      />
    ));
  };

  return (
    <View style={{
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
        <Image
          source={{ uri: review.userImage }}
          style={{ width: 44, height: 44, borderRadius: 22, marginRight: 12 }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <Text style={{ fontWeight: '600', fontSize: 15, color: COLORS.textPrimary }}>
              {review.userName}
            </Text>
            <Text style={{ fontSize: 12, color: COLORS.textTertiary }}>{review.date}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderStars(review.rating)}
          </View>
        </View>
      </View>
      <Text style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 20 }}>{review.comment}</Text>
    </View>
  );
}