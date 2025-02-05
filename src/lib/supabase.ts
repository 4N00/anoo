import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Helper function to get current session
export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

// Helper function to check if user is admin
export async function isAdmin() {
  const session = await getCurrentSession();
  if (!session) return false;

  try {
    console.log('Checking admin status for user:', session.user.id);
    
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    console.log('User data:', user);
    const isAdminUser = user?.role === 'ADMIN';
    console.log('Is admin?', isAdminUser);

    return isAdminUser;
  } catch (error) {
    console.error('Error in isAdmin check:', error);
    return false;
  }
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}