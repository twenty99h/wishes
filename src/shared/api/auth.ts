import { supabase } from '@@/supabase';
import { AuthError } from '@supabase/supabase-js';
import type { AuthUser, SignUpData, SignInData, ResetPasswordData, UpdatePasswordData } from '@/shared/types/auth';

export async function signUp({ email, password, username }: SignUpData): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: username,
      },
    },
  });

  if (error) throw error;
  if (!data.user) throw new Error('No user data returned');

  return data.user;
}

export async function signIn({ email, password }: SignInData): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error('No user data returned');

  return data.user;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword({ email }: ResetPasswordData): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword({ password }: UpdatePasswordData): Promise<void> {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  if (!user) return null;

  return user;
}

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof Error && 'status' in error;
}
