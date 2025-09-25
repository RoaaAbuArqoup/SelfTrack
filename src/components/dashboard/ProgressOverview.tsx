import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BookOpen, Clock, Award } from 'lucide-react';
import { User, Goal } from '../../types';

interface ProgressOverviewProps {
  user: User;
  goals: Goal[];
}

export const ProgressOverview = ({ user, goals }: ProgressOverviewProps) => {
  const completedGoals = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;
  const progressPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const stageData = [
    { name: 'Beginner', completed: goals.filter(g => g.stage === 'beginner' && g.completed).length, total: goals.filter(g => g.stage === 'beginner').length },
    { name: 'Intermediate', completed: goals.filter(g => g.stage === 'intermediate' && g.completed).length, total: goals.filter(g => g.stage === 'intermediate').length },
    { name: 'Advanced', completed: goals.filter(g => g.stage === 'advanced' && g.completed).length, total: goals.filter(g => g.stage === 'advanced').length }
  ];

  const pieData = [
    { name: 'Completed', value: completedGoals, color: '#10B981' },
    { name: 'In Progress', value: totalGoals - completedGoals, color: '#E5E7EB' }
  ];

  const stats = [
    { label: 'Total Goals', value: totalGoals, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Completed', value: completedGoals, icon: Award, color: 'bg-green-500' },
    { label: 'Current Streak', value: user.streak, icon: Clock, color: 'bg-orange-500' },
    { label: 'Total Points', value: user.points, icon: TrendingUp, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress by Stage */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress by Stage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Overall Progress</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <p className="text-3xl font-bold text-purple-600">{Math.round(progressPercentage)}%</p>
            <p className="text-gray-600">Complete</p>
          </div>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Recommendations</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <p className="text-gray-800">
              Great progress on your {user.field} journey! Consider focusing on intermediate-level goals 
              to maintain momentum. Your learning pattern suggests you work best in the morning.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-gray-800">
              Based on your quiz performance, you might benefit from more hands-on practice. 
              Try the "Build a Mini Project" challenge this week!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};