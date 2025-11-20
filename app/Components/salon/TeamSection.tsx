import React from 'react';
import { View, Text } from 'react-native';
import TeamCard from './TeamCard';
import { COLORS } from '../../../Constant/colors';
import { TeamMember} from '../../../Types/saloon';

interface TeamSectionProps {
  team: TeamMember[];
}

const TeamSection = ({ team }: TeamSectionProps) => {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 20 }}>
        Our Team
      </Text>
      {team.map((member) => (
        <TeamCard key={member.id} member={member} />
      ))}
    </View>
  );
};

export default TeamSection;