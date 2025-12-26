import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../Constant/colors';

// Type definitions
interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface ReviewSectionProps {
  salonId?: string;
}

// Initial reviews data
const initialReviews: Review[] = [
  {
    id: '1',
    userName: 'Alex Johnson',
    rating: 4.5,
    date: '2024-01-15',
    comment: 'Great place! The location is perfect and very convenient. The staff was very professional and friendly.',
    helpful: 12,
  },
  {
    id: '2',
    userName: 'Maria Garcia',
    rating: 5,
    date: '2024-01-10',
    comment: 'Absolutely loved it! Would definitely come back again. Best service in town!Absolutely loved it! Would definitely come back again. Best service in town!Absolutely loved it! Would definitely come back again. Best service in town!Absolutely loved it! Would definitely come back again. Best service in town!Absolutely loved it! Would definitely come back again. Best service in town!Absolutely loved it! Would definitely come back again. Best service in town!Absolutely loved it! Would definitely come back again. Best service in town!Absolutely loved it! Would definitely come back again. Best service in town!',
    helpful: 8,
  },
  {
    id: '3',
    userName: 'David Smith',
    rating: 3,
    date: '2024-01-05',
    comment: 'Good but could be better. The area was a bit noisy during my visit.',
    helpful: 3,
  },
  {
    id: '4',
    userName: 'Sarah Wilson',
    rating: 4,
    date: '2024-01-03',
    comment: 'Nice location with good amenities nearby. Will recommend to friends.',
    helpful: 5,
  },
  {
    id: '5',
    userName: 'Michael Chen',
    rating: 4.5,
    date: '2024-01-01',
    comment: 'Excellent service and great environment. Very satisfied with the experience.',
    helpful: 7,
  },
];

// Star Rating Component
interface StarRatingProps {
  color?: string;
  rating: number;
  size?: number;
  editable?: boolean;
  onRate?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  color="#FFD700",
  rating, 
  size = 20, 
  editable = false, 
  onRate 
}) => {
  const handlePress = (selectedRating: number) => {
    if (editable && onRate) {
      onRate(selectedRating);
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handlePress(star)}
          disabled={!editable}
          activeOpacity={editable ? 0.7 : 1}
        >
          <Ionicons
            name={star <= rating ? 'star' : star - 0.5 <= rating ? 'star-half' : 'star-outline'}
            size={size}
            color="#FFD700"
            style={{ marginHorizontal: 1 }}
          />
        </TouchableOpacity>
      ))}
      <Text style={{ 
        fontSize: size * 0.7, 
        color: COLORS.textSecondary,
        marginLeft: 6,
        fontWeight: '500'
      }}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
};

// Review Card Component
interface ReviewCardProps {
  review: Review;
  style?: any;
  showFullComment?: boolean;
  onReadMore?: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  style, 
  showFullComment = false,
  onReadMore 
}) => {
  const MAX_CHARS = 150;
  const shouldTruncate = !showFullComment && review.comment.length > MAX_CHARS;
  const displayComment = shouldTruncate 
    ? review.comment.substring(0, MAX_CHARS)
    : review.comment;

  return (
    <View style={[{
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
      height: showFullComment ? 'auto' : 180,
    }, style]}>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: 12,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ 
              color: '#FFFFFF', 
              fontWeight: 'bold', 
              fontSize: 18 
            }}>
              {review.userName.charAt(0)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text 
              style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: COLORS.textPrimary,
                marginBottom: 2,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {review.userName}
            </Text>
            <Text style={{ 
              fontSize: 12, 
              color: COLORS.textTertiary 
            }}>
              {review.date}
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 8 }}>
          <StarRating rating={review.rating} size={16} color='#FFD700' />
        </View>
      </View>
      
      <View style={{ marginBottom: 12 }}>
        <Text style={{ 
          fontSize: 14, 
          color: COLORS.textPrimary,
          lineHeight: 20,
        }}>
          {displayComment}
          {shouldTruncate && (
            <>
              <Text>... </Text>
              <Text 
                onPress={onReadMore}
                style={{ 
                  color: COLORS.primary,
                  fontWeight: '600',
                }}
              >
                Read More
              </Text>
            </>
          )}
        </Text>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity style={{ 
          flexDirection: 'row', 
          alignItems: 'center',
          gap: 4,
        }}>
          <Ionicons name="thumbs-up-outline" size={16} color={COLORS.textSecondary} />
          <Text style={{ 
            fontSize: 14, 
            color: COLORS.textSecondary 
          }}>
            Helpful ({review.helpful})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main Review Section Component
export default function ReviewSection({ salonId }: ReviewSectionProps) {
  const [allReviews, setAllReviews] = useState<Review[]>(initialReviews);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [showAddReview, setShowAddReview] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<{
    rating: number;
    comment: string;
  }>({
    rating: 0,
    comment: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Calculate average rating
  const averageRating = allReviews.length > 0
    ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length
    : 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: allReviews.filter(r => Math.round(r.rating) === stars).length,
    percentage: (allReviews.filter(r => Math.round(r.rating) === stars).length / allReviews.length) * 100
  }));

  // Handle adding new review
  const handleAddReview = () => {
    if (newReview.rating > 0 && newReview.comment.trim()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const newReviewObj: Review = {
          id: Date.now().toString(),
          userName: 'You',
          rating: newReview.rating,
          date: new Date().toISOString().split('T')[0],
          comment: newReview.comment.trim(),
          helpful: 0,
        };

        setAllReviews([newReviewObj, ...allReviews]);
        setNewReview({ rating: 0, comment: '' });
        setShowAddReview(false);
        setLoading(false);
      }, 500);
    }
  };

  // Handle rating change
  const handleRate = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  // Handle read more click
  const handleReadMore = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setShowAllReviews(true);
  };

  return (
    <View style={{
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    }}>
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: '700', 
          color: COLORS.textPrimary 
        }}>
          Reviews
        </Text>
        
        <TouchableOpacity
          onPress={() => setShowAddReview(true)}
          style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            backgroundColor: COLORS.primary + '15',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
            gap: 6,
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={18} color={COLORS.primary} />
          <Text style={{ 
            fontSize: 14, 
            fontWeight: '600', 
            color: COLORS.primary 
          }}>
            Add Review
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rating Summary */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 24,
        gap: 24,
      }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ 
            fontSize: 36, 
            fontWeight: '700', 
            color: COLORS.textPrimary 
          }}>
            {averageRating.toFixed(1)}
          </Text>
          <StarRating rating={averageRating} size={20} color='#FFD700' />
          <Text style={{ 
            fontSize: 14, 
            color: COLORS.textTertiary,
            marginTop: 4,
          }}>
            {allReviews.length} reviews
          </Text>
        </View>

        {/* Rating Distribution */}
        <View style={{ flex: 1, gap: 6 }}>
          {ratingDistribution.map((item) => (
            <View key={item.stars} style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              gap: 8,
            }}>
              <Text style={{ 
                fontSize: 14, 
                color: COLORS.textSecondary,
                width: 16,
              }}>
                {item.stars}
              </Text>
              <Ionicons name="star" size={14} color="#FFD700" />
              <View style={{ 
                flex: 1, 
                height: 6, 
                backgroundColor: COLORS.border,
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <View style={{ 
                  width: `${item.percentage}%`, 
                  height: '100%', 
                  backgroundColor: "#FFD700",
                  borderRadius: 3,
                }} />
              </View>
              <Text style={{ 
                fontSize: 12, 
                color: COLORS.textTertiary,
                width: 24,
                textAlign: 'right',
              }}>
                {item.count}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Reviews */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -20, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {allReviews.slice(0, 3).map((review, index) => (
          <View key={review.id} style={{ 
            marginRight: 12, 
            width: 280,
          }}>
            <ReviewCard 
              review={review} 
              showFullComment={false}
              onReadMore={() => handleReadMore(review.id)}
            />
          </View>
        ))}
      </ScrollView>

      {/* See All Button */}
      {allReviews.length > 3 && (
        <TouchableOpacity
          onPress={() => {
            setSelectedReviewId(null);
            setShowAllReviews(true);
          }}
          style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            marginTop: 20,
            paddingVertical: 12,
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
          }}
          activeOpacity={0.7}
        >
          <Text style={{ 
            fontSize: 15, 
            fontWeight: '600', 
            color: COLORS.primary 
          }}>
            See All Reviews
          </Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      )}

      {/* All Reviews Modal */}
      <Modal
        animationType="slide"
        visible={showAllReviews}
        onRequestClose={() => {
          setShowAllReviews(false);
          setSelectedReviewId(null);
        }}
        transparent={true}
      >
        <SafeAreaView style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}>
          <View style={{ 
            flex: 1, 
            marginTop: 60,
            backgroundColor: COLORS.card,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.border,
            }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '700', 
                color: COLORS.textPrimary 
              }}>
                All Reviews
              </Text>
              <TouchableOpacity onPress={() => {
                setShowAllReviews(false);
                setSelectedReviewId(null);
              }}>
                <Ionicons name="close" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={allReviews}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ReviewCard 
                  review={item} 
                  showFullComment={true}
                  style={{ 
                    marginHorizontal: 20, 
                    marginTop: 16,
                    backgroundColor: selectedReviewId === item.id ? COLORS.primary + '10' : COLORS.card,
                  }}
                />
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              initialScrollIndex={selectedReviewId ? allReviews.findIndex(r => r.id === selectedReviewId) : 0}
              onScrollToIndexFailed={() => {}}
            />
          </View>
        </SafeAreaView>
      </Modal>

      {/* Add Review Modal */}
      <Modal
        animationType="slide"
        visible={showAddReview}
        onRequestClose={() => setShowAddReview(false)}
        transparent={true}
      >
        <SafeAreaView style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}>
          <View style={{ 
            flex: 1, 
            justifyContent: 'flex-end',
          }}>
            <View style={{ 
              backgroundColor: COLORS.card,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              maxHeight: '80%',
            }}>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 20,
              }}>
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: '700', 
                  color: COLORS.textPrimary 
                }}>
                  Add Your Review
                </Text>
                <TouchableOpacity onPress={() => setShowAddReview(false)}>
                  <Ionicons name="close" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: COLORS.textPrimary,
                  marginBottom: 12,
                }}>
                  Your Rating:
                </Text>
                <StarRating 
                  rating={newReview.rating} 
                  size={32} 
                  editable={true} 
                  onRate={handleRate}
                />
              </View>

              <TextInput
                style={{ 
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 16,
                  color: COLORS.textPrimary,
                  minHeight: 120,
                  textAlignVertical: 'top',
                  marginBottom: 20,
                }}
                value={newReview.comment}
                onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
                placeholder="Share your experience..."
                placeholderTextColor={COLORS.textTertiary}
                multiline
                numberOfLines={4}
              />

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity
                  onPress={() => setShowAddReview(false)}
                  style={{ 
                    flex: 1,
                    paddingVertical: 16,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    borderRadius: 12,
                    alignItems: 'center',
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: '600', 
                    color: COLORS.textPrimary 
                  }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={handleAddReview}
                  disabled={loading || newReview.rating === 0 || newReview.comment.trim() === ''}
                  style={{ 
                    flex: 1,
                    paddingVertical: 16,
                    backgroundColor: loading || newReview.rating === 0 || newReview.comment.trim() === '' 
                      ? COLORS.border 
                      : COLORS.primary,
                    borderRadius: 12,
                    alignItems: 'center',
                    opacity: loading || newReview.rating === 0 || newReview.comment.trim() === '' ? 0.6 : 1,
                  }}
                  activeOpacity={0.7}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={{ 
                      fontSize: 16, 
                      fontWeight: '600', 
                      color: '#FFFFFF' 
                    }}>
                      Submit Review
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}