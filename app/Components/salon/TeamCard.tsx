import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../Constant/colors';
import { TeamMember} from '../../../Types/saloon';

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard = ({ member }: TeamCardProps) => {
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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: member.image }}
          style={{ width: 60, height: 60, borderRadius: 30, marginRight: 16 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 }}>
            {member.name}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.accent, marginBottom: 6, fontWeight: '500' }}>
            {member.role}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="star" size={14} color={COLORS.accent} />
            <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginLeft: 4, marginRight: 12, fontWeight: '500' }}>
              {member.rating}
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' }}>
              {member.experience} experience
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TeamCard;
