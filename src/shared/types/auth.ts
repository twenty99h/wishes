import { AuthError, User } from '@supabase/supabase-js';

// export type AuthUser = Omit<User, 'user_metadata'> & {
//   user_metadata: {
//     username: string;
//     avatar_url: string;
//     bio?: string;
//     role?: 'user' | 'admin';
//     birthday?: Date;
//   };
// };
export type AuthUser = User;

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
