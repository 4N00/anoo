'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isAdmin as checkIsAdmin } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  user: User | null;
  loading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();
        if (!mounted) return;

        setSession(initialSession);
        if (initialSession) {
          const adminStatus = await checkIsAdmin();
          if (!mounted) return;
          setIsAdmin(adminStatus);
          setUser(initialSession.user);
        } else {
          setIsAdmin(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
          setIsInitialized(true);
        }
      }
    };

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;

      try {
        if (newSession) {
          setSession(newSession);
          const adminStatus = await checkIsAdmin();
          if (!mounted) return;
          setIsAdmin(adminStatus);
          setUser(newSession.user);
        } else {
          setSession(null);
          setIsAdmin(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error handling auth change:', error);
        setSession(null);
        setIsAdmin(false);
        setUser(null);
      }
    });

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Don't render until auth is initialized
  if (!isInitialized) {
    return null;
  }

  const login = async (user: User) => {
    setUser(user);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAdmin,
        isLoading,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
