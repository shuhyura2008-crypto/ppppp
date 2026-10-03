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
import AccessPendingPage from '@/pages/AccessPendingPage';

type NavState = { page: string; params: Record<string, string> };

function AppShell() {
  const { session, courseAccess, loading } = useAuth();
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

  const accessExpired = Boolean(
    courseAccess?.access_expires_at
      && new Date(courseAccess.access_expires_at).getTime() <= Date.now(),
  );

  if (!courseAccess?.is_approved || accessExpired) {
    return <AccessPendingPage expired={accessExpired} />;
  }

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
      <div className="flex min-h-screen min-w-0 bg-[#f7f9fc]">
        <Sidebar activePage={nav.page} onNavigate={navigate} />
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1180px] px-4 pb-10 pt-[76px] sm:px-6 sm:pb-14 lg:px-10 lg:pt-10">
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
