// app/(msg)/ConversationScreen.tsx - Messenger Style
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Types
interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  read: boolean;
  type?: 'text' | 'image';
}

export default function ConversationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const conversationId = params.conversationId as string;
  const salonName = params.salonName as string;
  const salonImage = params.salonImage as string;
  const category = params.category as string;

  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>(() => {
    const messageSets: { [key: string]: Message[] } = {
      '1': [
        {
          id: '1',
          text: 'Hello! I would like to book a haircut appointment for this weekend.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          isUser: true,
          read: true,
        },
        {
          id: '2',
          text: 'Hi there! We would be happy to help you with that. What specific service are you looking for?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
          isUser: false,
          read: true,
        },
        {
          id: '3',
          text: 'I need a haircut and styling. How about tomorrow at 2:00 PM?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
          isUser: true,
          read: true,
        },
        {
          id: '4',
          text: 'That time works perfectly! We have Sophie available at 2:00 PM. She\'s our senior stylist with 8 years of experience.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isUser: false,
          read: true,
        },
      ],
    };
    return messageSets[conversationId] || messageSets['1'];
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }).toLowerCase();
  };

  const sendMessage = () => {
    if (messageText.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date(),
      isUser: true,
      read: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    // Show typing indicator
    setIsTyping(true);
    
    // Auto-reply after 2-4 seconds
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "Sounds great! We'll get that booked for you.",
        "Perfect timing! We have that slot available.",
        "We'd love to help with that! Any specific style in mind?",
        "That works for us! See you then.",
      ];
      
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date(),
        isUser: false,
        read: false,
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 2000 + Math.random() * 2000);
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <View className={`flex-row mb-3 px-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isUser && (
        <Image
          source={{ uri: salonImage }}
          className="w-8 h-8 rounded-full mr-2 self-end mb-1"
        />
      )}
      
      <View className={`max-w-[75%] ${message.isUser ? 'items-end' : 'items-start'}`}>
        <View
          className={`rounded-2xl px-4 py-3 ${
            message.isUser
              ? 'bg-blue-500 rounded-br-md'
              : 'bg-gray-200 rounded-bl-md'
          }`}
        >
          <Text
            className={`text-[16px] leading-5 ${
              message.isUser ? 'text-white' : 'text-gray-900'
            }`}
          >
            {message.text}
          </Text>
        </View>
        
        <Text
          className={`text-[12px] mt-1 ${
            message.isUser ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {formatTime(message.timestamp)}
          {message.isUser && (
            <Text> • {message.read ? 'Read' : 'Delivered'}</Text>
          )}
        </Text>
      </View>
    </View>
  );

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);

  // Focus input when entering chat
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingBottom: 0 }}>
      {/* Chat Header - Messenger Style */}
      <View className="bg-white border-b border-gray-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mr-3 p-1"
            >
              <Ionicons name="chevron-back" size={24} color="#374151" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center flex-1">
              <View className="relative">
                <Image
                  source={{ uri: salonImage }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                {isOnline && (
                  <View className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </View>
              
              <View className="flex-1">
                <Text className="text-[17px] font-semibold text-gray-900">
                  {salonName}
                </Text>
                <Text className="text-[13px] text-green-500">
                  {isOnline ? 'Active now' : 'Offline'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row space-x-4">
            
            <TouchableOpacity className="p-2">
              <Ionicons name="call-outline" size={20} color="#374151" />
            </TouchableOpacity>
           
          </View>
        </View>
      </View>

      {/* Messages List */}
      <View className="flex-1 bg-white">
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={
            isTyping ? (
              <View className="flex-row items-center px-4 mb-3">
                <Image
                  source={{ uri: salonImage }}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <View className="bg-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
                  <View className="flex-row space-x-1">
                    <View className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                    <View className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <View className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </View>
                </View>
              </View>
            ) : null
          }
        />
      </View>

      {/* Message Input - Messenger Style */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="bg-white border-t border-gray-200 px-4 py-3"
      >
        <View className="flex-row items-center space-x-2">
          
          
          <TouchableOpacity className="p-2">
            <Ionicons name="camera-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity className="p-2">
            <Ionicons name="image-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
          
          <View className="flex-1 bg-gray-100 rounded-2xl px-4 py-2">
            <TextInput
              ref={inputRef}
              placeholder="Message..."
              placeholderTextColor="#9CA3AF"
              value={messageText}
              onChangeText={setMessageText}
              className="text-[16px] text-gray-900 max-h-20"
              multiline
              maxLength={1000}
            />
          </View>
          
          <TouchableOpacity
            onPress={sendMessage}
            disabled={messageText.trim() === ''}
            className={`p-3 rounded-full ${
              messageText.trim() === '' ? 'bg-gray-300' : 'bg-blue-500'
            }`}
          >
            <Ionicons
              name="send"
              size={20}
              color={messageText.trim() === '' ? '#9CA3AF' : '#fff'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}