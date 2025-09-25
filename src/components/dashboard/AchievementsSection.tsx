import { motion } from 'framer-motion';
import { Trophy, Star, Award, Target, Zap, Flame } from 'lucide-react';
import { User, Badge } from '../../types';
import { sampleBadges } from '../../data/mockData';

interface AchievementsSectionProps {
  user: User;
}

export const AchievementsSection = ({ user }: AchievementsSectionProps) => {
  const achievements = [
    { id: 1, name: 'Early Bird', description: 'Complete 5 goals', icon: '🌅', progress: 3, total: 5, unlocked: false },
    { id: 2, name: 'Streak Master', description: 'Maintain 10 day streak', icon: '🔥', progress: user.streak, total: 10, unlocked: user.streak >= 10 },
    { id: 3, name: 'Quiz Champion', description: 'Score 100% on 10 quizzes', icon: '🧠', progress: 2, total: 10, unlocked: false },
    { id: 4, name: 'Challenger', description: 'Complete 5 challenges', icon: '⚡', progress: 1, total: 5, unlocked: false },
    { id: 5, name: 'Knowledge Seeker', description: 'Read 20 resources', icon: '📚', progress: 8, total: 20, unlocked: false },
    { id: 6, name: 'Points Collector', description: 'Earn 1000 points', icon: '💎', progress: user.points, total: 1000, unlocked: user.points >= 1000 }
  ];

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-yellow-600'
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Badges Earned', value: user.badges.length, icon: Award, color: 'bg-purple-500' },
          { label: 'Total Points', value: user.points, icon: Star, color: 'bg-yellow-500' },
          { label: 'Current Streak', value: user.streak, icon: Flame, color: 'bg-orange-500' },
          { label: 'Goals Completed', value: user.goals.filter(Boolean).length, icon: Target, color: 'bg-green-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Earned Badges */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-all"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className={`w-16 h-16 bg-gradient-to-r ${rarityColors[badge.rarity]} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}
              >
                {badge.icon}
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                badge.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Progress */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievement Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm border p-6 ${
                achievement.unlocked 
                  ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    achievement.unlocked 
                      ? 'bg-green-100 border-2 border-green-300' 
                      : 'bg-gray-100 border-2 border-gray-300'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
                {achievement.unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Trophy className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">
                    {Math.min(achievement.progress, achievement.total)} / {achievement.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((achievement.progress / achievement.total) * 100, 100)}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-3 rounded-full ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Milestone Celebrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Keep Up the Great Work!</h3>
          <p className="text-gray-600">
            You're doing amazing on your learning journey. Your next milestone is just around the corner!
          </p>
        </div>
      </motion.div>
    </div>
  );
};