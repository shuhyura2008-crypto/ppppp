import {
  createContext, useContext, useEffect, useState, useCallback, ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type Profile = { full_name: string };
type CourseAccess = {
  is_approved: boolean;
  approved_at: string | null;
  access_expires_at: string | null;
};

type AuthCtx = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  courseAccess: CourseAccess | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  refreshAccess: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  session: null,
  user: null,
  profile: null,
  courseAccess: null,
  loading: true,
  refreshProfile: async () => { },
  refreshAccess: async () => { },
  signOut: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [courseAccess, setCourseAccess] = useState<CourseAccess | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('student_profiles')
      .select('full_name')
      .eq('id', userId)
      .maybeSingle();

    if (!error) setProfile(data ?? null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session?.user) await fetchProfile(session.user.id);
  }, [session, fetchProfile]);

  const fetchAccess = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('course_access')
      .select('is_approved, approved_at, access_expires_at')
      .eq('user_id', userId)
      .maybeSingle();

    if (!error) setCourseAccess(data ?? null);
  }, []);

  const refreshAccess = useCallback(async () => {
    if (session?.user) await fetchAccess(session.user.id);
  }, [session, fetchAccess]);

  const fetchAccountData = useCallback(async (userId: string) => {
    await Promise.all([fetchProfile(userId), fetchAccess(userId)]);
  }, [fetchAccess, fetchProfile]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    let active = true;

    const loadInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      setSession(data.session);
      if (data.session?.user) await fetchAccountData(data.session.user.id);
      if (active) setLoading(false);
    };

    void loadInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        setLoading(true);
        window.setTimeout(() => {
          void fetchAccountData(nextSession.user.id).finally(() => setLoading(false));
        }, 0);
      } else {
        setProfile(null);
        setCourseAccess(null);
        setLoading(false);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [fetchAccountData]);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
    setProfile(null);
    setCourseAccess(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ?? null,
      profile,
      courseAccess,
      loading,
      refreshProfile,
      refreshAccess,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
