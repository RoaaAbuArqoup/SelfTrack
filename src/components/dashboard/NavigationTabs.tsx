import { motion } from 'framer-motion';
import { BarChart3, Target, Zap, Trophy } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'challenges', label: 'Challenges', icon: Zap },
  { id: 'achievements', label: 'Achievements', icon: Trophy }
];

export const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};