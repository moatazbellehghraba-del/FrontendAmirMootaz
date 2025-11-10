// MessagesListScreen.tsx - Messenger Style
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Types
interface Conversation {
  id: string;
  salonName: string;
  salonImage: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  category: string;
  isVerified: boolean;
}

export default function MessagesListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      salonName: 'Glamour Hair Studio',
      salonImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=150&h=150&fit=crop',
      lastMessage: 'Your appointment is confirmed for tomorrow at 2:00 PM! See you soon ✂️',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      isOnline: true,
      category: 'Hair Salon',
      isVerified: true,
    },
    {
      id: '2',
      salonName: 'Elite Barber Shop',
      salonImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=150&h=150&fit=crop',
      lastMessage: 'We have a special offer this week - 20% off all services!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 0,
      isOnline: false,
      category: 'Barber',
      isVerified: true,
    },
    {
      id: '3',
      salonName: 'Nail Art Studio',
      salonImage: 'https://images.unsplash.com/photo-1607778833979-4c13c14a8d71?w=150&h=150&fit=crop',
      lastMessage: 'Thank you for your visit! How was your experience with us?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 1,
      isOnline: true,
      category: 'Nail Salon',
      isVerified: false,
    },
    {
      id: '4',
      salonName: 'Relaxation Spa & Wellness',
      salonImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150&h=150&fit=crop',
      lastMessage: 'Your massage therapist is running 5 minutes late. Apologies for the delay!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 0,
      isOnline: true,
      category: 'Spa',
      isVerified: true,
    },
    {
      id: '5',
      salonName: 'Beauty Glow Studio',
      salonImage: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=150&h=150&fit=crop',
      lastMessage: 'Your facial treatment products have arrived! Ready for your next session?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      unreadCount: 0,
      isOnline: false,
      category: 'Skincare',
      isVerified: true,
    },
  ]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    if (diff < 604800000) return date.toLocaleDateString('en-US', { weekday: 'short' });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.salonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ConversationItem = ({ conversation }: { conversation: Conversation }) => (
    <TouchableOpacity
      className="bg-white px-4 py-3 active:bg-gray-50 border-b border-gray-100"
      onPress={() => router.push({
        pathname: '/(msg)/ConversationScreen',
        params: {
          conversationId: conversation.id,
          salonName: conversation.salonName,
          salonImage: conversation.salonImage,
          category: conversation.category,
        }
      })}
    >
      <View className="flex-row items-center">
        {/* Profile Image with Online Status */}
        <View className="relative">
          <Image
            source={{ uri: conversation.salonImage }}
            className="w-14 h-14 rounded-full mr-4"
          />
          {conversation.isOnline && (
            <View className="absolute bottom-0 right-3 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
          )}
        </View>
        
        {/* Conversation Content */}
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-1">
            <View className="flex-row items-center flex-1">
              <Text className="text-[16px] font-semibold text-gray-900 mr-2">
                {conversation.salonName}
              </Text>
              {conversation.isVerified && (
                <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />
              )}
            </View>
            <Text className="text-[13px] text-gray-500 font-medium">
              {formatTime(conversation.timestamp)}
            </Text>
          </View>
          
          <View className="flex-row items-center justify-between">
            <Text 
              className={`text-[15px] flex-1 ${conversation.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}
              numberOfLines={1}
            >
              {conversation.lastMessage}
            </Text>
            
            {conversation.unreadCount > 0 && (
              <View className="ml-2 bg-blue-500 rounded-full min-w-5 h-5 items-center justify-center">
                <Text className="text-white text-[12px] font-bold">
                  {conversation.unreadCount}
                </Text>
              </View>
            )}
          </View>

          {/* Category Badge */}
          <View className="flex-row items-center mt-1">
            <Text className="text-[12px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {conversation.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header - Messenger Style */}
      <View className="bg-white border-b border-gray-200 px-4 py-3">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-900">Chats</Text>
          <View className="flex-row space-x-4">
           
          </View>
        </View>

        {/* Search Bar - Messenger Style */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search messages"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-[16px] text-gray-900 ml-2"
          />
        </View>
      </View>

      {/* Conversations List */}
      <View className="flex-1 bg-white">
        {filteredConversations.length > 0 ? (
          <FlatList
            data={filteredConversations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ConversationItem conversation={item} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center px-8">
            <Ionicons name="chatbubbles-outline" size={80} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg font-semibold mt-4 text-center">
              No conversations found
            </Text>
            <Text className="text-gray-400 text-sm mt-2 text-center">
              {searchQuery ? 'Try a different search' : 'Start chatting with salons to see messages here'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity 
                className="bg-blue-500 rounded-lg py-3 px-6 mt-6"
                onPress={() => router.push('/Search')}
              >
                <Text className="text-white text-base font-semibold">
                  Find Salons
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}