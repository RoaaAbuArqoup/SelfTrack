import { LearningPlan, Goal, Quiz, Badge, Challenge } from '../types';

export const learningFields = [
  'Web Development',
  'Data Science',
  'Machine Learning',
  'Mobile Development',
  'UI/UX Design',
  'Digital Marketing',
  'Cybersecurity',
  'Cloud Computing'
];

export const generateLearningPlan = (field: string): LearningPlan => {
  const plans: { [key: string]: LearningPlan } = {
    'Web Development': {
      id: 'web-dev-plan',
      field: 'Web Development',
      estimatedDuration: '6-8 months',
      stages: {
        beginner: [
          {
            id: 'html-basics',
            title: 'HTML Fundamentals',
            description: 'Learn the structure and semantics of HTML',
            resources: [
              { id: 'r1', title: 'HTML Tutorial', url: '#', type: 'article', duration: '2 hours' },
              { id: 'r2', title: 'HTML Video Course', url: '#', type: 'video', duration: '4 hours' }
            ],
            notes: '',
            quizId: 'html-quiz',
            completed: false,
            stage: 'beginner',
            points: 100,
            difficulty: 'easy',
            createdAt: new Date()
          },
          {
            id: 'css-basics',
            title: 'CSS Styling',
            description: 'Master CSS for beautiful web layouts',
            resources: [
              { id: 'r3', title: 'CSS Flexbox Guide', url: '#', type: 'article', duration: '3 hours' },
              { id: 'r4', title: 'CSS Grid Tutorial', url: '#', type: 'practice', duration: '2 hours' }
            ],
            notes: '',
            quizId: 'css-quiz',
            completed: false,
            stage: 'beginner',
            points: 150,
            difficulty: 'medium',
            createdAt: new Date()
          }
        ],
        intermediate: [
          {
            id: 'javascript-fundamentals',
            title: 'JavaScript Fundamentals',
            description: 'Learn JavaScript programming concepts',
            resources: [
              { id: 'r5', title: 'JavaScript Guide', url: '#', type: 'article', duration: '8 hours' },
              { id: 'r6', title: 'JS Practice Problems', url: '#', type: 'practice', duration: '10 hours' }
            ],
            notes: '',
            quizId: 'js-quiz',
            completed: false,
            stage: 'intermediate',
            points: 200,
            difficulty: 'medium',
            createdAt: new Date()
          }
        ],
        advanced: [
          {
            id: 'react-development',
            title: 'React Development',
            description: 'Build modern web applications with React',
            resources: [
              { id: 'r7', title: 'React Documentation', url: '#', type: 'article', duration: '12 hours' },
              { id: 'r8', title: 'React Project Tutorial', url: '#', type: 'course', duration: '20 hours' }
            ],
            notes: '',
            quizId: 'react-quiz',
            completed: false,
            stage: 'advanced',
            points: 300,
            difficulty: 'hard',
            createdAt: new Date()
          }
        ]
      }
    }
  };

  return plans[field] || plans['Web Development'];
};

export const sampleBadges: Badge[] = [
  {
    id: 'first-goal',
    name: 'First Steps',
    description: 'Complete your first goal',
    icon: '🎯',
    rarity: 'common',
    earnedAt: new Date()
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    rarity: 'rare',
    earnedAt: new Date()
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Score 100% on 5 quizzes',
    icon: '🧠',
    rarity: 'epic',
    earnedAt: new Date()
  }
];

export const sampleChallenges: Challenge[] = [
  {
    id: 'daily-practice',
    title: 'Daily Coding Practice',
    description: 'Complete at least one coding exercise today',
    type: 'daily',
    field: 'Web Development',
    points: 50,
    participants: 234,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    completed: false
  },
  {
    id: 'weekly-project',
    title: 'Build a Mini Project',
    description: 'Create a small project using this week\'s concepts',
    type: 'weekly',
    field: 'Web Development',
    points: 200,
    participants: 156,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    completed: false
  }
];

export const generateQuiz = (goalId: string): Quiz => {
  const quizzes: { [key: string]: Quiz } = {
    'html-quiz': {
      id: 'html-quiz',
      goalId: 'html-basics',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What does HTML stand for?',
          options: [
            'Hyper Text Markup Language',
            'High Tech Modern Language',
            'Home Tool Markup Language',
            'Hyperlink Text Management Language'
          ],
          correctAnswer: 0,
          explanation: 'HTML stands for Hyper Text Markup Language, which is used to create web pages.'
        },
        {
          id: 'q2',
          question: 'Which HTML tag is used for the largest heading?',
          options: ['<h6>', '<h1>', '<header>', '<head>'],
          correctAnswer: 1,
          explanation: '<h1> is used for the largest heading, with headings going from h1 to h6.'
        }
      ]
    }
  };

  return quizzes[goalId + '-quiz'] || quizzes['html-quiz'];
};