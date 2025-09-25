import { motion } from 'framer-motion';
import { Users, Clock, Trophy, Zap, Target } from 'lucide-react';
import { Challenge } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface ChallengesSectionProps {
  challenges: Challenge[];
}

export const ChallengesSection = ({ challenges }: ChallengesSectionProps) => {
  const activeChallenges = challenges.filter(c => !c.completed);
  const completedChallenges = challenges.filter(c => c.completed);

  const typeColors = {
    daily: 'bg-blue-100 text-blue-800 border-blue-200',
    weekly: 'bg-purple-100 text-purple-800 border-purple-200',
    monthly: 'bg-green-100 text-green-800 border-green-200'
  };

  const typeIcons = {
    daily: Zap,
    weekly: Target,
    monthly: Trophy
  };

  return (
    <div className="space-y-8">
      {/* Active Challenges */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Challenges</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-shadow"
          >
            Browse More
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeChallenges.map((challenge, index) => {
            const TypeIcon = typeIcons[challenge.type];
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${typeColors[challenge.type]}`}>
                          {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-purple-600">
                        <Trophy className="w-4 h-4" />
                        <span className="font-bold">{challenge.points}</span>
                      </div>
                      <span className="text-xs text-gray-500">points</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{challenge.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} joined</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDistanceToNow(challenge.deadline)} left</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '25%' }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Continue Challenge
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AI Challenge Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Challenge Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-medium text-gray-900 mb-2">Code Review Challenge</h4>
            <p className="text-sm text-gray-600 mb-3">
              Based on your progress, try reviewing and improving existing code snippets.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-600 font-medium">Suggested for you</span>
              <button className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                Join
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-medium text-gray-900 mb-2">API Integration Sprint</h4>
            <p className="text-sm text-gray-600 mb-3">
              Perfect timing to practice integrating external APIs into your projects.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 font-medium">Trending</span>
              <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Join
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">🏆 Leaderboard</h3>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View Full
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { name: 'Alex Johnson', points: 2450, rank: 1 },
            { name: 'Sarah Chen', points: 2380, rank: 2 },
            { name: 'You', points: 1890, rank: 3 },
            { name: 'Mike Davis', points: 1750, rank: 4 }
          ].map((user, index) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg ${
                user.name === 'You' 
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200' 
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  user.rank === 1 ? 'bg-yellow-500 text-white' :
                  user.rank === 2 ? 'bg-gray-400 text-white' :
                  user.rank === 3 ? 'bg-orange-500 text-white' :
                  'bg-gray-300 text-gray-700'
                }`}>
                  {user.rank}
                </div>
                <span className={`font-medium ${user.name === 'You' ? 'text-purple-900' : 'text-gray-900'}`}>
                  {user.name}
                </span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900">{user.points.toLocaleString()}</span>
                <span className="text-xs text-gray-500 ml-1">pts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};