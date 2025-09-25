import { motion } from 'framer-motion';
import { LogOut, Settings, Flame, Trophy, Target } from 'lucide-react';
import { User } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface UserHeaderProps {
  user: User;
}

export const UserHeader = ({ user }: UserHeaderProps) => {
  const { logOut } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </motion.div>
            
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-sm text-gray-600">
                {user.field} • {user.stage.charAt(0).toUpperCase() + user.stage.slice(1)} Level
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg"
              >
                <Flame className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-semibold text-orange-900">{user.streak}</p>
                  <p className="text-xs text-orange-700">Day Streak</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg"
              >
                <Trophy className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-semibold text-purple-900">{user.points}</p>
                  <p className="text-xs text-purple-700">Points</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg"
              >
                <Target className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-green-900">{Math.round(user.progress)}%</p>
                  <p className="text-xs text-green-700">Progress</p>
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={logOut}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};