import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle, XCircle, Award } from 'lucide-react';
import { Goal, Quiz } from '../../types';
import { generateQuiz } from '../../data/mockData';
import { toast } from 'react-hot-toast';

interface QuizModalProps {
  goal: Goal;
  onComplete: (goalId: string, passed: boolean) => void;
  onClose: () => void;
}

export const QuizModal = ({ goal, onComplete, onClose }: QuizModalProps) => {
  const [quiz] = useState<Quiz>(generateQuiz(goal.id));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = (correctAnswers / quiz.questions.length) * 100;
    setScore(finalScore);
    setShowResults(true);

    const passed = finalScore >= quiz.passingScore;
    if (passed) {
      toast.success(`🎉 Congratulations! You scored ${Math.round(finalScore)}%`);
    } else {
      toast.error(`You scored ${Math.round(finalScore)}%. You need ${quiz.passingScore}% to pass.`);
    }
  };

  const handleComplete = () => {
    const passed = score >= quiz.passingScore;
    onComplete(goal.id, passed);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const question = quiz.questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{goal.title} Quiz</h2>
            <p className="text-sm text-gray-600">Passing score: {quiz.passingScore}%</p>
          </div>
          <div className="flex items-center space-x-4">
            {!showResults && (
              <div className="flex items-center space-x-2 bg-orange-100 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-600">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </span>
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {question.question}
                  </h3>

                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-purple-500 bg-purple-50 text-purple-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === index
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswers[currentQuestion] === index && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                  >
                    {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                {/* Results */}
                <div>
                  {score >= quiz.passingScore ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <XCircle className="w-10 h-10 text-white" />
                    </motion.div>
                  )}

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {score >= quiz.passingScore ? 'Congratulations!' : 'Keep Learning!'}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Your score: <span className="font-bold">{Math.round(score)}%</span>
                  </p>
                  
                  {score >= quiz.passingScore ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-center space-x-2 text-green-800">
                        <Award className="w-5 h-5" />
                        <span className="font-medium">Goal Completed! +{goal.points} points</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                      <p className="text-orange-800">
                        You need {quiz.passingScore}% to pass. Review the materials and try again!
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComplete}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};