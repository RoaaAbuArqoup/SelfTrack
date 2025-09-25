import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Note: In a real app, these would come from environment variables
  apiKey: "your-api-key",
  authDomain: "selftrack-app.firebaseapp.com",
  projectId: "selftrack-app",
  storageBucket: "selftrack-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;