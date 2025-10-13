// app/help-support.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Star,
  Globe,
  User,
  Shield,
  CreditCard
} from 'lucide-react-native';

const HelpSupportScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const contactMethods: {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    subtitle: string;
    availability: string;
    status: 'online' | 'offline';
    action: () => void;
  }[] = [
    {
      icon: MessageCircle,
      title: 'Chat Support',
      subtitle: '24/7 Live chat support',
      availability: 'Available now',
      status: 'online',
      action: () => Alert.alert('Chat Support', 'Connecting you with our support team...')
    },
    {
      icon: Phone,
      title: 'Phone Support',
      subtitle: '+216 70 100 200',
      availability: 'Mon-Fri, 8AM-6PM',
      status: 'offline',
      action: () => Linking.openURL('tel:+21670100200')
    },
    {
      icon: Mail,
      title: 'Email Support',
      subtitle: 'support@saha.tn',
      availability: '24/7 response within 4h',
      status: 'online',
      action: () => Linking.openURL('mailto:support@saha.tn?subject=Support Request')
    }
  ];

  

  const faqCategories = [
    {
      title: 'Account & Profile',
      icon: User,
      questions: [
        {
          question: 'How do I update my personal information?',
          answer: 'Go to your Profile screen, tap on "Personal Information", and you can edit your details there. Remember to save your changes.'
        },
        {
          question: 'Can I change my email address?',
          answer: 'Yes, go to Privacy & Security settings and select "Change Email". You will need to verify your new email address.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'Account deletion is available in Privacy & Security settings. Note that this action is permanent and cannot be undone.'
        }
      ]
    },
    {
      title: 'Bookings & Appointments',
      icon: Clock,
      questions: [
        {
          question: 'How do I cancel an appointment?',
          answer: 'Go to your Upcoming Appointments, select the appointment you want to cancel, and tap the "Cancel" button. Cancellation policies may apply.'
        },
        {
          question: 'Can I reschedule my appointment?',
          answer: 'Yes, you can reschedule up to 2 hours before your appointment time from the appointment details screen.'
        },
        {
          question: 'What is your cancellation policy?',
          answer: 'You can cancel free of charge up to 24 hours before your appointment. Later cancellations may incur a fee.'
        }
      ]
    },
    {
      title: 'Payments & Billing',
      icon: CreditCard,
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept credit cards, debit cards, and mobile payments. All payments are securely processed.'
        },
        {
          question: 'How do I get a receipt?',
          answer: 'Receipts are automatically emailed to you after each payment. You can also access them in your booking history.'
        },
        {
          question: 'Can I get a refund?',
          answer: 'Refunds are processed according to our cancellation policy. Contact support for refund requests.'
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      questions: [
        {
          question: 'How is my data protected?',
          answer: 'We use industry-standard encryption and security measures to protect your personal information and payment data.'
        },
        {
          question: 'Can I control my privacy settings?',
          answer: 'Yes, you can manage all your privacy preferences in the Privacy & Security section of your profile.'
        }
      ]
    }
  ];

  

  const ContactMethod = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    availability, 
    status, 
    action 
  }: {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    subtitle: string;
    availability: string;
    status: 'online' | 'offline';
    action: () => void;
  }) => (
    <TouchableOpacity 
      className="bg-gray-50 rounded-2xl p-5 mb-3 border border-gray-200 active:bg-gray-100"
      onPress={action}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 bg-white rounded-xl items-center justify-center mr-4 border border-gray-200">
            <Icon size={22} color="#000" />
          </View>
          <View className="flex-1">
            <Text className="text-black font-semibold text-base mb-1">{title}</Text>
            <Text className="text-gray-600 text-sm">{subtitle}</Text>
          </View>
        </View>
        <View className={`flex-row items-center rounded-full px-3 py-1 ${
          status === 'online' ? 'bg-green-50' : 'bg-gray-100'
        }`}>
          <View className={`w-2 h-2 rounded-full mr-2 ${
            status === 'online' ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          <Text className={`text-xs font-medium ${
            status === 'online' ? 'text-green-600' : 'text-gray-600'
          }`}>
            {status === 'online' ? 'Available' : 'Offline'}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-200">
        <Text className="text-gray-500 text-sm">{availability}</Text>
        <ChevronRight size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  const FaqItem = ({ 
    question, 
    answer, 
    isActive, 
    onPress 
  }: {
    question: string;
    answer: string;
    isActive: boolean;
    onPress: () => void;
  }) => (
    <View className="border-b border-gray-200 last:border-b-0">
      <TouchableOpacity 
        className="py-4 flex-row items-center justify-between"
        onPress={onPress}
      >
        <Text className="text-black font-medium text-base flex-1 pr-4">{question}</Text>
        <ChevronRight 
          size={20} 
          color="#9CA3AF" 
          className={`transform ${isActive ? 'rotate-90' : 'rotate-0'}`}
        />
      </TouchableOpacity>
      {isActive && (
        <View className="pb-4">
          <Text className="text-gray-600 text-sm leading-6">{answer}</Text>
        </View>
      )}
    </View>
  );

  const ResourceCard = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    action 
  }: {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    subtitle: string;
    action: () => void;
  }) => (
    <TouchableOpacity 
      className="bg-gray-50 rounded-2xl p-5 border border-gray-200 active:bg-gray-100"
      onPress={action}
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-white rounded-xl items-center justify-center mr-4 border border-gray-200">
          <Icon size={22} color="#000" />
        </View>
        <View className="flex-1">
          <Text className="text-black font-semibold text-base mb-1">{title}</Text>
          <Text className="text-gray-600 text-sm">{subtitle}</Text>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="px-6 pt-12 pb-6 bg-white">
          <View className="flex-row items-center justify-between mb-8">
            <View className="flex-row items-center">
              <TouchableOpacity 
                className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center mr-4 border border-gray-200"
                onPress={() => router.back()}
              >
                <ChevronLeft size={22} color="#000" />
              </TouchableOpacity>
              <View>
                <Text className="text-3xl font-light text-black mb-1">Help & Support</Text>
                <Text className="text-gray-400 text-base">We're here to help you</Text>
              </View>
            </View>
          </View>

          
          
        </View>

        {/* Contact Methods */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-5">Get in Touch</Text>
          {contactMethods.map((method, index) => (
            <ContactMethod key={index} {...method} />
          ))}
        </View>

       
        

        {/* FAQ Sections */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-light text-black mb-5">Frequently Asked Questions</Text>
          {faqCategories.map((category, categoryIndex) => (
            <View key={categoryIndex} className="mb-6">
              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-3 border border-gray-200">
                  <category.icon size={18} color="#000" />
                </View>
                <Text className="text-black font-semibold text-lg">{category.title}</Text>
              </View>
              <View className="bg-gray-50 rounded-3xl p-4 border border-gray-200">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex;
                  return (
                    <FaqItem
                      key={faqIndex}
                      question={faq.question}
                      answer={faq.answer}
                      isActive={activeFaq === globalIndex}
                      onPress={() => setActiveFaq(activeFaq === globalIndex ? null : globalIndex)}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </View>

      

        {/* Support Status */}
        <View className="px-6 mb-8">
          <View className="bg-green-50 rounded-2xl p-5 border border-green-200">
            <View className="flex-row items-center mb-3">
              <CheckCircle2 size={20} color="#16a34a" />
              <Text className="text-green-800 font-medium text-base ml-2">Support System Operational</Text>
            </View>
            <Text className="text-green-600 text-sm">
              All systems are running smoothly. Our average response time is under 15 minutes for chat support.
            </Text>
          </View>
        </View>

        {/* App Information */}
        <View className="px-6 mb-8">
          <View className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <Text className="text-black font-medium text-base mb-3">App Information</Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600 text-sm">Version</Text>
                <Text className="text-black text-sm font-medium">v0.0.1</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 text-sm">Last Updated</Text>
                <Text className="text-black text-sm font-medium">Dec 15, 2024</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600 text-sm">Support Hours</Text>
                <Text className="text-black text-sm font-medium">24/7</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center pb-10">
          <Text className="text-gray-400 text-sm font-medium">Saha Support Center</Text>
          <Text className="text-gray-400 text-xs mt-1">© 2025 All rights reserved</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupportScreen;