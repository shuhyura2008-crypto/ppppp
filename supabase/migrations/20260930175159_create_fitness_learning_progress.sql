/*
# Create student profile and lesson progress

1. New Tables
- `student_profiles` stores the student's display name and onboarding details for the signed-in personal cabinet.
- `lesson_progress` stores one completed lesson per student and lesson identifier.
2. Security
- Row level security is enabled on both tables.
- Authenticated students can only read and change their own profile and progress rows.
3. Important notes
- Both user ownership columns default to the current authenticated account.
- The learning catalogue itself remains safe test content in the application until a content management area is requested.
*/

CREATE TABLE IF NOT EXISTS public.student_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students can view own profile" ON public.student_profiles;
CREATE POLICY "Students can view own profile" ON public.student_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
DROP POLICY IF EXISTS "Students can create own profile" ON public.student_profiles;
CREATE POLICY "Students can create own profile" ON public.student_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Students can update own profile" ON public.student_profiles;
CREATE POLICY "Students can update own profile" ON public.student_profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Students can delete own profile" ON public.student_profiles;
CREATE POLICY "Students can delete own profile" ON public.student_profiles FOR DELETE TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Students can view own progress" ON public.lesson_progress;
CREATE POLICY "Students can view own progress" ON public.lesson_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Students can create own progress" ON public.lesson_progress;
CREATE POLICY "Students can create own progress" ON public.lesson_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Students can update own progress" ON public.lesson_progress;
CREATE POLICY "Students can update own progress" ON public.lesson_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Students can delete own progress" ON public.lesson_progress;
CREATE POLICY "Students can delete own progress" ON public.lesson_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS lesson_progress_user_id_idx ON public.lesson_progress(user_id);
