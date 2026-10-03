import { Clock3, LogOut, RefreshCw, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

type AccessPendingPageProps = {
  expired?: boolean;
};

export default function AccessPendingPage({ expired = false }: AccessPendingPageProps) {
  const { user, refreshAccess, signOut } = useAuth();
  const [checking, setChecking] = useState(false);

  const checkAccess = async () => {
    setChecking(true);
    await refreshAccess();
    setChecking(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[620px] items-center justify-center">
        <section className="w-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(23,32,47,0.09)]">
          <div className="h-2 bg-[#E00000]" />
          <div className="px-6 py-8 text-center sm:px-12 sm:py-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#17202f] text-white">
              {expired ? <ShieldCheck size={28} /> : <Clock3 size={28} />}
            </div>

            <h1 className="mt-6 font-display text-[28px] font-extrabold leading-tight text-[#17202f] sm:text-[34px]">
              {expired ? 'Доступ приостановлен' : 'Аккаунт создан'}
            </h1>
            <p className="mx-auto mt-3 max-w-[460px] text-[15px] leading-7 text-slate-500 sm:text-base">
              {expired
                ? 'Свяжитесь с организатором программы, чтобы продлить доступ к материалам.'
                : 'Мы проверяем участие в программе. После подтверждения здесь откроются уроки, эфиры и ваш прогресс.'}
            </p>

            {user?.email && (
              <p className="mt-5 break-all text-sm font-semibold text-[#17202f]">{user.email}</p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={checkAccess}
                disabled={checking}
                className="blue-button inline-flex min-h-12 items-center justify-center gap-2 px-5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw size={17} className={checking ? 'animate-spin' : ''} />
                {checking ? 'Проверяем...' : 'Проверить доступ'}
              </button>
              <button
                type="button"
                onClick={() => void signOut()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <LogOut size={17} />
                Выйти
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

