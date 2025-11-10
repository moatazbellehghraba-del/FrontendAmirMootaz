import React, { useState, useRef } from 'react';
import { ScrollView, View, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '../Components/salon/Header';
import StickyNavBar from '../Components/salon/StickyNavBar';
import ImageGallery from '../Components/salon/ImageGallery';
import SalonInfoHeader from '../Components/salon/SalonInfoHeader';
import ServicesSection from '../Components/salon/ServicesSection';
import TeamSection from '../Components/salon/TeamSection';
import ReviewsSection from '../Components/salon/ReviewsSection';
import AboutSection from '../Components/salon/AboutSection';
import BookButton from '../Components/salon/BookButton';

import { COLORS } from '../../Constant/colors';
const { width } = Dimensions.get('window');

// Move salon data directly here to avoid import issues
const salonData = {
  id: '1',
  name: 'Glamour Hair Studio',
  images: [
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop',
  ],
  rating: 4.9,
  reviews: 284,
  address: '123 Beauty Street, Downtown Tunis',
  distance: '1.2 km from your location',
  description: 'Premium hair salon specializing in modern cuts, coloring, and styling services with experienced professionals. We provide exceptional service in a luxurious and comfortable environment.',
  openingHours: [
    { day: 'Monday', hours: '9:00 AM - 8:00 PM', isClosed: false },
    { day: 'Tuesday', hours: '9:00 AM - 8:00 PM', isClosed: false },
    { day: 'Wednesday', hours: '9:00 AM - 8:00 PM', isClosed: false },
    { day: 'Thursday', hours: '9:00 AM - 8:00 PM', isClosed: false },
    { day: 'Friday', hours: '9:00 AM - 9:00 PM', isClosed: false },
    { day: 'Saturday', hours: '10:00 AM - 6:00 PM', isClosed: false },
    { day: 'Sunday', hours: 'Closed', isClosed: true },
  ],
  priceRange: '$$$',
  services: [
    {
      id: '1',
      name: 'Signature Haircut',
      duration: '45 min',
      price: '65 TND',
      category: 'Haircut',
      description: 'Professional haircut with expert styling and consultation'
    },
    {
      id: '2',
      name: 'Premium Coloring',
      duration: '2 hours',
      price: '180 TND',
      category: 'Color',
      description: 'Full hair coloring with premium professional products and toning'
    },
    {
      id: '3',
      name: 'Keratin Treatment',
      duration: '1.5 hours',
      price: '220 TND',
      category: 'Treatment',
      description: 'Advanced smoothing treatment for frizzy and unmanageable hair'
    },
    {
      id: '4',
      name: 'Blow Dry & Style',
      duration: '30 min',
      price: '45 TND',
      category: 'Styling',
      description: 'Professional blow dry and styling for any occasion'
    },
  ],
  team: [
    {
      id: '1',
      name: 'Sophie Martin',
      role: 'Senior Stylist',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      experience: '8 years',
      rating: 4.9
    },
    {
      id: '2',
      name: 'Alex Johnson',
      role: 'Color Specialist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      experience: '6 years',
      rating: 4.8
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      role: 'Beauty Therapist',
      image: 'https://images.unsplash.com/photo-1551831006-3c6bd6d39388?w=150&h=150&fit=crop&crop=face',
      experience: '5 years',
      rating: 4.9
    },
  ],
  reviewsList: [
    {
      id: '1',
      userName: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely amazing experience! The stylist really understood what I wanted and delivered beyond expectations. The salon has a great atmosphere and the team is very professional.',
      date: '2 days ago',
      userImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      userName: 'Emma Wilson',
      rating: 5,
      comment: 'Best salon in town! The keratin treatment transformed my hair. Will definitely come back. The staff is friendly and the place is very clean.',
      date: '1 week ago',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      userName: 'Michael Brown',
      rating: 4,
      comment: 'Great haircut and friendly service. The stylist took time to understand what I wanted. Would recommend for anyone looking for quality hair services.',
      date: '2 weeks ago',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
  ],
  amenities: ['Wheelchair Accessible', 'Free Parking', 'Pet Friendly', 'WiFi Available', 'Credit Cards Accepted', 'Air Conditioned'],
  coordinates: {
    latitude: 36.8065,
    longitude: 10.1815
  }
};

export default function SalonScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeSection, setActiveSection] = useState('services');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        
        if (offsetY < 400) setActiveSection('services');
        else if (offsetY < 800) setActiveSection('team');
        else if (offsetY < 1200) setActiveSection('reviews');
        else setActiveSection('about');
      },
      useNativeDriver: false,
    }
  );

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    let offset = 0;
    
    switch(sectionId) {
      case 'services':
        offset = 320;
        break;
      case 'team':
        offset = 800;
        break;
      case 'reviews':
        offset = 1200;
        break;
      case 'about':
        offset = 1600;
        break;
    }
    
    scrollViewRef.current?.scrollTo({ y: offset, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header scrollY={scrollY} />
      <StickyNavBar 
        scrollY={scrollY}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      
      <ScrollView 
        ref={scrollViewRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <ImageGallery 
          images={salonData.images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
        <SalonInfoHeader salon={salonData} />
        
        <View style={{ padding: 20 }}>
          <ServicesSection 
            services={salonData.services}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />

          <TeamSection team={salonData.team} />

          <ReviewsSection reviews={salonData.reviewsList} />

          <AboutSection salon={salonData} />
        </View>
      </ScrollView>

      <BookButton 
        selectedService={selectedService}
        salon={salonData}
      />
    </SafeAreaView>
  );
}