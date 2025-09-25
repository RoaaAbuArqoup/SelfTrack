import { useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        name,
        createdAt: new Date(),
        field: '',
        stage: 'beginner',
        progress: 0,
        goals: [],
        badges: [],
        points: 0,
        streak: 0,
        lastUpdate: new Date()
      };
      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
      setUser(newUser);
      toast.success('Welcome to SelfTrack!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    user,
    firebaseUser,
    loading,
    signUp,
    signIn,
    logOut
  };
};