import React from 'react';
import { View, Text } from 'react-native';
import ReviewCard from './ReviewCard';
import { Review} from '../../../Types/saloon';
import { COLORS } from '../../../Constant/colors';

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 20 }}>
        Customer Reviews
      </Text>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </View>
  );
};

export default ReviewsSection;