import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Helper function to require authentication
export async function requireAuth() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    throw new Error('Unauthorized');
  }

  return session;
}

// Helper function to require admin access
export async function requireAdmin() {
  const session = await requireAuth();

  const { data: profile, error } = await supabase
    .from('users')  // Changed from 'User' to 'users'
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (error || !profile || profile.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }

  return session;
}

// Helper function to check if error is an auth error
export function isAuthError(error: unknown): boolean {
  return error instanceof Error && error.message === 'Unauthorized';
}

// Helper function to check if error is an admin error
export function isAdminError(error: unknown): boolean {
  return error instanceof Error && error.message === 'Admin access required';
}

// Helper function to get user profile
export async function getUserProfile() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return null;
  }

  const { data: profile } = await supabase
    .from('users')  // Changed from 'User' to 'users'
    .select('*')
    .eq('id', session.user.id)
    .single();

  return profile;
}

// Helper function to check if user is admin
export async function isAdmin(): Promise<boolean> {
  try {
    const profile = await getUserProfile();
    return profile?.role === 'ADMIN';
  } catch {
    return false;
  }
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Helper function to get current session
export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

// Helper function to refresh session
export async function refreshSession() {
  const { data: { session }, error } = await supabase.auth.refreshSession();
  if (error) throw error;
  return session;
}

// Helper function to update password
export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

// Helper function to request password reset
export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}