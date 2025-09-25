import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Target, Zap } from 'lucide-react';
import { learningFields, generateLearningPlan } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-hot-toast';

export const OnboardingScreen = () => {
  const [selectedField, setSelectedField] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleFieldSelection = async () => {
    if (!selectedField || !user) return;

    setLoading(true);
    try {
      // Generate AI learning plan (simulated)
      const plan = generateLearningPlan(selectedField);
      
      // Update user profile
      await updateDoc(doc(db, 'users', user.id), {
        field: selectedField,
        lastUpdate: new Date()
      });

      toast.success('🎉 Your personalized learning plan has been generated!');
    } catch (error) {
      toast.error('Failed to create learning plan');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Welcome to SelfTrack
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Hi {user?.name}! Let's create your personalized learning journey
          </p>
          <p className="text-gray-500">
            Choose your field and I'll generate a custom AI-powered plan just for you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {learningFields.map((field) => (
            <motion.div
              key={field}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedField(field)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedField === field
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-3">
                  {field === 'Web Development' && '🌐'}
                  {field === 'Data Science' && '📊'}
                  {field === 'Machine Learning' && '🤖'}
                  {field === 'Mobile Development' && '📱'}
                  {field === 'UI/UX Design' && '🎨'}
                  {field === 'Digital Marketing' && '📈'}
                  {field === 'Cybersecurity' && '🔒'}
                  {field === 'Cloud Computing' && '☁️'}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                  {field}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedField && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  AI-Generated Learning Plan for {selectedField}
                </h3>
                <p className="text-gray-600 mb-4">
                  I'll create a personalized plan with beginner, intermediate, and advanced stages. 
                  Each goal includes curated resources, interactive quizzes, and hands-on projects 
                  tailored to your learning style.
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">Adaptive Learning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">Goal-Based Progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">AI Recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFieldSelection}
          disabled={!selectedField || loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <span>Generate My Learning Plan</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};