import {
  createContext, useContext, useEffect, useState, useCallback, ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

type ProgressCtx = {
  completedIds: Set<string>;
  markComplete: (lessonId: string) => Promise<void>;
  unmark: (lessonId: string) => Promise<void>;
  loading: boolean;
};

const ProgressContext = createContext<ProgressCtx>({
  completedIds: new Set(), markComplete: async () => { }, unmark: async () => { }, loading: true,
});

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async (uid: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', uid);
    setCompletedIds(new Set(data?.map((r) => r.lesson_id) ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) { fetchProgress(user.id); } else { setCompletedIds(new Set()); setLoading(false); }
  }, [user, fetchProgress]);

  const markComplete = async (lessonId: string) => {
    if (!user || completedIds.has(lessonId)) return;
    const { error } = await supabase.from('lesson_progress').insert({ lesson_id: lessonId });
    if (!error) setCompletedIds((prev) => new Set([...prev, lessonId]));
  };

  const unmark = async (lessonId: string) => {
    if (!user) return;
    const { error } = await supabase.from('lesson_progress').delete().eq('user_id', user.id).eq('lesson_id', lessonId);
    if (!error) setCompletedIds((prev) => { const n = new Set(prev); n.delete(lessonId); return n; });
  };

  return (
    <ProgressContext.Provider value={{ completedIds, markComplete, unmark, loading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
