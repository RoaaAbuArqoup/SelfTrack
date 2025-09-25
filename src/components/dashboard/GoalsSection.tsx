import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BookOpen, Clock, Award, CreditCard as Edit3, Trash2, Play } from 'lucide-react';
import { Goal } from '../../types';
import { GoalCard } from './GoalCard';
import { QuizModal } from './QuizModal';

interface GoalsSectionProps {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
}

export const GoalsSection = ({ goals, setGoals }: GoalsSectionProps) => {
  const [selectedStage, setSelectedStage] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedQuizGoal, setSelectedQuizGoal] = useState<Goal | null>(null);

  const filteredGoals = selectedStage === 'all' 
    ? goals 
    : goals.filter(goal => goal.stage === selectedStage);

  const stages = [
    { id: 'all' as const, label: 'All Goals', count: goals.length },
    { id: 'beginner' as const, label: 'Beginner', count: goals.filter(g => g.stage === 'beginner').length },
    { id: 'intermediate' as const, label: 'Intermediate', count: goals.filter(g => g.stage === 'intermediate').length },
    { id: 'advanced' as const, label: 'Advanced', count: goals.filter(g => g.stage === 'advanced').length }
  ];

  const handleTakeQuiz = (goal: Goal) => {
    setSelectedQuizGoal(goal);
  };

  const handleQuizComplete = (goalId: string, passed: boolean) => {
    if (passed) {
      setGoals(goals.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: true, completedAt: new Date() }
          : goal
      ));
    }
    setSelectedQuizGoal(null);
  };

  return (
    <div className="space-y-6">
      {/* Stage Filter */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedStage === stage.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {stage.label} ({stage.count})
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </motion.button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredGoals.map((goal, index) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              index={index}
              onTakeQuiz={handleTakeQuiz}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredGoals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No goals found
          </h3>
          <p className="text-gray-600 mb-6">
            {selectedStage === 'all' 
              ? "Get started by adding your first learning goal"
              : `No ${selectedStage} level goals yet`
            }
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Your First Goal
          </button>
        </motion.div>
      )}

      {/* Quiz Modal */}
      <AnimatePresence>
        {selectedQuizGoal && (
          <QuizModal
            goal={selectedQuizGoal}
            onComplete={handleQuizComplete}
            onClose={() => setSelectedQuizGoal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};