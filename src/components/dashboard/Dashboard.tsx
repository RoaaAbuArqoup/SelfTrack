import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProgressOverview } from './ProgressOverview';
import { GoalsSection } from './GoalsSection';
import { ChallengesSection } from './ChallengesSection';
import { AchievementsSection } from './AchievementsSection';
import { NavigationTabs } from './NavigationTabs';
import { UserHeader } from './UserHeader';
import { useAuth } from '../../hooks/useAuth';
import { Goal, Challenge } from '../../types';
import { generateLearningPlan, sampleChallenges } from '../../data/mockData';

export const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [challenges] = useState<Challenge[]>(sampleChallenges);

  useEffect(() => {
    if (user?.field) {
      const plan = generateLearningPlan(user.field);
      const allGoals = [
        ...plan.stages.beginner,
        ...plan.stages.intermediate,
        ...plan.stages.advanced
      ];
      setGoals(allGoals);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <UserHeader user={user} />
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && <ProgressOverview user={user} goals={goals} />}
          {activeTab === 'goals' && <GoalsSection goals={goals} setGoals={setGoals} />}
          {activeTab === 'challenges' && <ChallengesSection challenges={challenges} />}
          {activeTab === 'achievements' && <AchievementsSection user={user} />}
        </motion.div>
      </div>
    </div>
  );
};