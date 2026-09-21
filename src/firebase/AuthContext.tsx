import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  phone?: string | null;
  role?: 'customer' | 'admin';
}

export const ADMIN_EMAIL = 'mdsaifulislamniaz209@gmail.com';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfileData | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  sendPhoneOtp: (phoneNumber: string, containerOrId: string | HTMLElement) => Promise<ConfirmationResult>;
  verifyPhoneOtp: (confirmationResult: ConfirmationResult, otpCode: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync profile to Firestore upon sign-in/up
  const syncUserProfile = async (user: User, additionalData?: { phone?: string; displayName?: string }) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const phone = additionalData?.phone || user.phoneNumber || null;
        const displayName =
          additionalData?.displayName ||
          user.displayName ||
          (phone ? `Customer (${phone})` : user.email?.split('@')[0]) ||
          'Customer';

        const newProfile: UserProfileData = {
          uid: user.uid,
          email: user.email || null,
          phone: phone,
          displayName: displayName,
          photoURL: user.photoURL || null,
          role: user.email === ADMIN_EMAIL ? 'admin' : 'customer',
        };
        await setDoc(userRef, {
          ...newProfile,
          createdAt: serverTimestamp(),
        });
        setUserProfile(newProfile);
      } else {
        const existingData = userSnap.data() as UserProfileData;
        if (additionalData?.phone && !existingData.phone) {
          await updateDoc(userRef, { phone: additionalData.phone });
          existingData.phone = additionalData.phone;
        }
        setUserProfile(existingData);
      }
    } catch (e) {
      console.warn('Could not sync user profile to firestore:', e);
      // Fallback
      setUserProfile({
        uid: user.uid,
        email: user.email || null,
        phone: additionalData?.phone || user.phoneNumber || null,
        displayName: user.displayName || user.email?.split('@')[0] || (user.phoneNumber ? `Customer (${user.phoneNumber})` : 'Customer'),
        photoURL: user.photoURL || null,
        role: user.email === ADMIN_EMAIL ? 'admin' : 'customer',
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await syncUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    if (res.user) await syncUserProfile(res.user);
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (res.user) {
      await updateProfile(res.user, { displayName: name });
      await syncUserProfile(res.user);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    if (res.user) await syncUserProfile(res.user);
  };

  const sendPhoneOtp = async (phoneNumber: string, containerOrId: string | HTMLElement) => {
    // Clear any previous window recaptchaVerifier if existing
    const appVerifier = new RecaptchaVerifier(auth, containerOrId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved - will proceed with phone auth
      },
      'expired-callback': () => {
        console.warn('reCAPTCHA expired, please retry');
      }
    });

    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  };

  const verifyPhoneOtp = async (confirmationResult: ConfirmationResult, otpCode: string, name?: string) => {
    const res = await confirmationResult.confirm(otpCode);
    if (res.user) {
      if (name && name.trim()) {
        await updateProfile(res.user, { displayName: name.trim() });
      }
      await syncUserProfile(res.user, {
        phone: res.user.phoneNumber || undefined,
        displayName: name ? name.trim() : undefined,
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
  };

  const isAdmin = Boolean(
    currentUser &&
      (currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ||
        userProfile?.role === 'admin')
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isAdmin,
        loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        sendPhoneOtp,
        verifyPhoneOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
