import { motion } from 'framer-motion';
import { Clock, Award, BookOpen, Play, CheckCircle } from 'lucide-react';
import { Goal } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface GoalCardProps {
  goal: Goal;
  index: number;
  onTakeQuiz: (goal: Goal) => void;
}

export const GoalCard = ({ goal, index, onTakeQuiz }: GoalCardProps) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const stageColors = {
    beginner: 'bg-blue-100 text-blue-800',
    intermediate: 'bg-purple-100 text-purple-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all ${
        goal.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[goal.stage]}`}>
                {goal.stage.charAt(0).toUpperCase() + goal.stage.slice(1)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[goal.difficulty]}`}>
                {goal.difficulty.charAt(0).toUpperCase() + goal.difficulty.slice(1)}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{goal.description}</p>
          </div>
          {goal.completed && (
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-2" />
          )}
        </div>

        {/* Resources */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{goal.resources.length} Resources</span>
          </div>
          <div className="space-y-1">
            {goal.resources.slice(0, 2).map((resource) => (
              <div key={resource.id} className="text-xs text-gray-600 flex items-center space-x-2">
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span>{resource.title}</span>
                {resource.duration && (
                  <span className="text-gray-500">({resource.duration})</span>
                )}
              </div>
            ))}
            {goal.resources.length > 2 && (
              <div className="text-xs text-gray-500">
                +{goal.resources.length - 2} more resources
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4" />
              <span>{goal.points} pts</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDistanceToNow(goal.createdAt)} ago</span>
            </div>
          </div>

          {!goal.completed ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTakeQuiz(goal)}
              className="flex items-center space-x-1 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Take Quiz</span>
            </motion.button>
          ) : (
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};