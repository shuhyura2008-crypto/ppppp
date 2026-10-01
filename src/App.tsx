import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProgressProvider } from '@/context/ProgressContext';
import Sidebar from '@/components/Sidebar';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import LearningPage from '@/pages/LearningPage';
import ModulePage from '@/pages/ModulePage';
import LessonPage from '@/pages/LessonPage';
import ProgressPage from '@/pages/ProgressPage';
import MaterialsPage from '@/pages/MaterialsPage';
import ProfilePage from '@/pages/ProfilePage';

type NavState = { page: string; params: Record<string, string> };

function AppShell() {
  const { session, loading } = useAuth();
  const [nav, setNav] = useState<NavState>({ page: 'learning', params: {} });

  const navigate = (page: string, params: Record<string, string> = {}) => setNav({ page, params });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E00000] animate-pulse" />
          <p className="text-sm text-slate-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!session) return <AuthPage />;

  const renderContent = () => {
    switch (nav.page) {
      case 'dashboard': return <DashboardPage onNavigate={navigate} />;
      case 'learning': return <LearningPage onNavigate={navigate} />;
      case 'module': return <ModulePage moduleId={nav.params.moduleId ?? ''} onNavigate={navigate} />;
      case 'lesson': return <LessonPage moduleId={nav.params.moduleId ?? ''} lessonId={nav.params.lessonId ?? ''} onNavigate={navigate} />;
      case 'my-progress': return <ProgressPage />;
      case 'materials': return <MaterialsPage />;
      case 'profile': return <ProfilePage />;
      default: return <DashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <ProgressProvider>
      <div className="flex min-h-screen bg-[#f7f9fc]">
        <Sidebar activePage={nav.page} onNavigate={navigate} />
        <main className="flex-1 overflow-auto">
          <div className="px-4 sm:px-8 pt-20 pb-12 lg:pt-8 lg:px-10 max-w-5xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </ProgressProvider>
  );
}

export default function App() {
  return <AppShell />;
}
