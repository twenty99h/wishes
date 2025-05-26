import { AuthError, User } from '@supabase/supabase-js';

export type AuthUser = Omit<User, 'user_metadata'> & {
  user_metadata: {
    display_name: string;
    avatar_url: string;
  };
};

export type SignUpData = {
  email: string;
  password: string;
  username: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type ResetPasswordData = {
  email: string;
};

export type UpdatePasswordData = {
  password: string;
};

export type AuthErrorType = AuthError;
