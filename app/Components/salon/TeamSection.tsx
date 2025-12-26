import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Colors matching your design
const COLORS = {
  textPrimary: '#1a1a1a',
  textSecondary: '#666666',
  textTertiary: '#999999',
  accent: '#8b5cf6',
  card: '#ffffff',
  border: '#e5e7eb',
  background: '#f8f9fa',
  secondary: '#f8f9fa',
  starFilled: '#fbbf24',
  starEmpty: '#d1d5db',
  white: '#ffffff',
  success: '#10b981',
  lightGray: '#f1f3f4',
};

// Types
interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  rating: number;
}

interface Review {
  id: number;
  client: string;
  rating: number;
  comment: string;
  date: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  clientsServed: number;
  rating: number;
  reviewCount: number;
  experience: string;
  specialties: string[];
  services: Service[];
  reviews: Review[];
}

// Team Data
const teamData: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Stylist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    clientsServed: 1247,
    rating: 4.9,
    reviewCount: 324,
    experience: '8 years',
    specialties: ['Haircut', 'Coloring', 'Styling'],
    services: [
      { id: 1, name: "Women's Haircut", price: 65, duration: 60, rating: 4.9 },
      { id: 2, name: 'Hair Coloring', price: 120, duration: 120, rating: 4.8 },
      { id: 3, name: 'Blowout & Styling', price: 45, duration: 45, rating: 5.0 },
      { id: 4, name: 'Balayage', price: 180, duration: 180, rating: 4.9 }
    ],
    reviews: [
      { id: 1, client: 'Emily R.', rating: 5, comment: 'Sarah is amazing! Best haircut I\'ve ever had.', date: '2 days ago' },
      { id: 2, client: 'Michael T.', rating: 5, comment: 'Very professional and talented.', date: '1 week ago' },
      { id: 3, client: 'Jennifer L.', rating: 4, comment: 'Great experience, will come back!', date: '2 weeks ago' }
    ]
  },
  {
    id: 2,
    name: 'Marcus Williams',
    role: 'Barber Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    clientsServed: 982,
    rating: 4.8,
    reviewCount: 267,
    experience: '6 years',
    specialties: ['Fade', 'Beard Trim', 'Classic Cut'],
    services: [
      { id: 1, name: "Men's Haircut", price: 45, duration: 45, rating: 4.8 },
      { id: 2, name: 'Fade Cut', price: 50, duration: 50, rating: 4.9 },
      { id: 3, name: 'Beard Trim & Shape', price: 30, duration: 30, rating: 4.7 },
      { id: 4, name: 'Hot Towel Shave', price: 40, duration: 40, rating: 5.0 }
    ],
    reviews: [
      { id: 1, client: 'David K.', rating: 5, comment: 'Marcus gives the cleanest fades in town!', date: '3 days ago' },
      { id: 2, client: 'James P.', rating: 5, comment: 'Always consistent and professional.', date: '1 week ago' },
      { id: 3, client: 'Robert M.', rating: 4, comment: 'Great barber, highly recommend.', date: '3 weeks ago' }
    ]
  },
  {
    id: 3,
    name: 'Isabella Martinez',
    role: 'Color Specialist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    clientsServed: 1543,
    rating: 5.0,
    reviewCount: 412,
    experience: '10 years',
    specialties: ['Balayage', 'Highlights', 'Color Correction'],
    services: [
      { id: 1, name: 'Full Highlights', price: 150, duration: 150, rating: 5.0 },
      { id: 2, name: 'Balayage', price: 200, duration: 180, rating: 5.0 },
      { id: 3, name: 'Color Correction', price: 250, duration: 240, rating: 4.9 },
      { id: 4, name: 'Root Touch-Up', price: 80, duration: 90, rating: 5.0 }
    ],
    reviews: [
      { id: 1, client: 'Sophie A.', rating: 5, comment: 'Isabella is a color genius! Absolutely love my balayage.', date: '1 day ago' },
      { id: 2, client: 'Amanda W.', rating: 5, comment: 'She saved my hair after a bad dye job. Forever grateful!', date: '5 days ago' },
      { id: 3, client: 'Lisa H.', rating: 5, comment: 'Best colorist I\'ve ever been to. Worth every penny!', date: '1 week ago' }
    ]
  },
  {
    id: 4,
    name: 'Alex Chen',
    role: 'Hair Stylist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    clientsServed: 756,
    rating: 4.7,
    reviewCount: 189,
    experience: '5 years',
    specialties: ['Modern Cuts', 'Perms', 'Treatments'],
    services: [
      { id: 1, name: "Men's Modern Cut", price: 55, duration: 50, rating: 4.8 },
      { id: 2, name: 'Women\'s Cut & Style', price: 75, duration: 75, rating: 4.7 },
      { id: 3, name: 'Keratin Treatment', price: 180, duration: 120, rating: 4.6 },
      { id: 4, name: 'Perm', price: 130, duration: 150, rating: 4.7 }
    ],
    reviews: [
      { id: 1, client: 'Chris B.', rating: 5, comment: 'Alex really understands modern styles. Love my new look!', date: '4 days ago' },
      { id: 2, client: 'Taylor S.', rating: 4, comment: 'Good service and nice results.', date: '2 weeks ago' },
      { id: 3, client: 'Jordan F.', rating: 5, comment: 'Very skilled and friendly. Highly recommend!', date: '3 weeks ago' }
    ]
  },
  {
    id: 5,
    name: 'Emma Wilson',
    role: 'Makeup Artist',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    clientsServed: 890,
    rating: 4.8,
    reviewCount: 210,
    experience: '7 years',
    specialties: ['Bridal', 'Event', 'Editorial'],
    services: [
      { id: 1, name: 'Bridal Makeup', price: 120, duration: 90, rating: 4.9 },
      { id: 2, name: 'Evening Makeup', price: 85, duration: 60, rating: 4.8 },
      { id: 3, name: 'Photo Shoot', price: 150, duration: 120, rating: 4.7 },
    ],
    reviews: [
      { id: 1, client: 'Jessica M.', rating: 5, comment: 'Emma made me look stunning for my wedding!', date: '1 week ago' },
      { id: 2, client: 'Olivia T.', rating: 4, comment: 'Professional and talented makeup artist.', date: '2 weeks ago' },
    ]
  },
  {
    id: 6,
    name: 'David Lee',
    role: 'Nail Technician',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=400',
    clientsServed: 650,
    rating: 4.9,
    reviewCount: 178,
    experience: '4 years',
    specialties: ['Gel Nails', 'Manicure', 'Nail Art'],
    services: [
      { id: 1, name: 'Gel Manicure', price: 45, duration: 60, rating: 4.9 },
      { id: 2, name: 'Nail Art', price: 60, duration: 75, rating: 4.8 },
      { id: 3, name: 'Spa Pedicure', price: 55, duration: 60, rating: 5.0 },
    ],
    reviews: [
      { id: 1, client: 'Michelle R.', rating: 5, comment: 'David is a nail artist genius!', date: '3 days ago' },
      { id: 2, client: 'Samantha K.', rating: 5, comment: 'Perfect nails every time.', date: '1 week ago' },
    ]
  }
];

// Profile Circle Component - UPDATED with smaller circle
const ProfileCircle = ({ member }: { member: TeamMember }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          width: width / 4, // Changed from /3 to /4 for smaller width
          marginRight: 12, // Reduced margin
        }}
        onPress={() => setSelectedMember(member)}
        activeOpacity={0.7}
      >
        <View style={{
          width: 70, // Reduced from 90 to 70
          height: 70, // Reduced from 90 to 70
          borderRadius: 35, // Half of width/height
          overflow: 'hidden',
          marginBottom: 8,
          borderWidth: 2, // Reduced from 3 to 2
          borderColor: COLORS.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Image
            source={{ uri: member.image }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 4,
        }}>
          <Text style={{ color: COLORS.starFilled, fontSize: 10, marginRight: 2 }}>★</Text>
          <Text style={{
            fontSize: 12,
            fontWeight: '600',
            color: COLORS.textPrimary,
          }}>
            {member.rating}
          </Text>
        </View>

        <Text style={{
          fontSize: 13,
          fontWeight: '600',
          color: COLORS.textPrimary,
          textAlign: 'center',
          marginBottom: 2,
          lineHeight: 16,
        }}>
          {member.name}
        </Text>

        <Text style={{
          fontSize: 11,
          color: COLORS.textSecondary,
          textAlign: 'center',
          fontWeight: '500',
          lineHeight: 14,
        }}>
          {member.role}
        </Text>
      </TouchableOpacity>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          isVisible={!!selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
};

// Modal Component
const MemberModal = ({ 
  member, 
  isVisible, 
  onClose 
}: { 
  member: TeamMember; 
  isVisible: boolean; 
  onClose: () => void;
}) => {
  const renderStars = (rating: number) => {
    return (
      <View style={{ flexDirection: 'row', gap: 2 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text
            key={star}
            style={{ 
              color: star <= rating ? COLORS.starFilled : COLORS.starEmpty,
              fontSize: 16,
            }}
          >
            ★
          </Text>
        ))}
      </View>
    );
  };

  const handleBookAppointment = () => {
    Alert.alert(
      'Book Appointment',
      `Would you like to book an appointment with ${member.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book Now',
          onPress: () => {
            Alert.alert('Success', `Appointment booked with ${member.name}!`);
            onClose();
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ 
            width: '100%',
            maxWidth: 600,
            maxHeight: '90%',
            backgroundColor: COLORS.background,
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          <View style={{ 
            backgroundColor: COLORS.card,
            padding: 18,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.textPrimary }}>
              Employee Profile
            </Text>
            <TouchableOpacity 
              onPress={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: COLORS.lightGray,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.border,
              }}
            >
              <Text style={{ fontSize: 20, color: COLORS.textSecondary }}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>
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
                alignItems: 'center',
              }}>
                <View style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  overflow: 'hidden',
                  marginBottom: 16,
                  borderWidth: 3,
                  borderColor: COLORS.border,
                }}>
                  <Image
                    source={{ uri: member.image }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                
                <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 }}>
                  {member.name}
                </Text>
                <Text style={{ fontSize: 15, color: COLORS.textSecondary, marginBottom: 16, fontWeight: '500' }}>
                  {member.role} • {member.experience}
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                  {member.specialties.map((specialty, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: COLORS.accent + '15',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: COLORS.accent + '30',
                      }}
                    >
                      <Text style={{ fontSize: 12, color: COLORS.accent, fontWeight: '500' }}>
                        {specialty}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={{ 
                  flexDirection: 'row', 
                  width: '100%',
                  paddingTop: 20,
                  borderTopWidth: 1,
                  borderTopColor: COLORS.border,
                }}>
                  <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Text style={{ fontSize: 20, color: COLORS.accent, marginRight: 6 }}>★</Text>
                      <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.textPrimary }}>
                        {member.rating}
                      </Text>
                    </View>
                    {renderStars(member.rating)}
                    <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 8, fontWeight: '500' }}>
                      {member.reviewCount} reviews
                    </Text>
                  </View>

                  <View style={{ width: 1, height: 60, backgroundColor: COLORS.border }} />

                  <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Text style={{ fontSize: 20, color: COLORS.success, marginRight: 6 }}>👥</Text>
                      <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.textPrimary }}>
                        {member.clientsServed}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' }}>
                      Clients Served
                    </Text>
                  </View>
                </View>
              </View>

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
                <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 }}>
                  Services Offered
                </Text>
                {member.services.map((service, index) => (
                  <View
                    key={service.id}
                    style={{
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderBottomWidth: index === member.services.length - 1 ? 0 : 1,
                      borderBottomColor: COLORS.border,
                    }}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, flex: 1 }}>
                        {service.name}
                      </Text>
                      <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.accent, marginLeft: 12 }}>
                        ${service.price}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginRight: 4 }}>🕐</Text>
                      <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginRight: 16, fontWeight: '500' }}>
                        {service.duration} min
                      </Text>
                      <Text style={{ fontSize: 14, color: COLORS.starFilled, marginRight: 4 }}>★</Text>
                      <Text style={{ fontSize: 14, color: COLORS.textSecondary, fontWeight: '500' }}>
                        {service.rating}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

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
                <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 }}>
                  Recent Reviews
                </Text>
                {member.reviews.map((review, index) => (
                  <View
                    key={review.id}
                    style={{
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderBottomWidth: index === member.reviews.length - 1 ? 0 : 1,
                      borderBottomColor: COLORS.border,
                    }}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: COLORS.textPrimary }}>
                        {review.client}
                      </Text>
                      <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' }}>
                        {review.date}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 8 }}>
                      {renderStars(review.rating)}
                    </View>
                    <Text style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 20 }}>
                      {review.comment}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={{ 
            backgroundColor: COLORS.card,
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
          }}>
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: COLORS.accent,
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
              }}
              onPress={handleBookAppointment}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.white }}>
                Book Appointment with {member.name}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

// Main TeamSection Component - FIXED to render all team members
const TeamSection = () => {
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
      <Text style={{ 
        fontSize: 18, 
        fontWeight: '700', 
        color: COLORS.textPrimary,
        marginBottom: 16,
      }}>
        Our Team
      </Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 20,
        }}
      >
        {/* Render each team member */}
        {teamData.map((member) => (
          <ProfileCircle 
            key={member.id}
            member={member}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeamSection;