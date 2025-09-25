import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import { AuthScreen } from './components/auth/AuthScreen';
import { OnboardingScreen } from './components/onboarding/OnboardingScreen';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading SelfTrack...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <AuthScreen />
        <Toaster position="top-right" />
      </>
    );
  }

  if (!user.field) {
    return (
      <>
        <OnboardingScreen />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <Router>
      <Dashboard />
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;