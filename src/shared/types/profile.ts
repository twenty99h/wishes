export type Profile = {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar_url: string | null;
  bio: string | null;
  birthday: string;
  created_at: string;
  updated_at: string;
  is_current_user_followed?: boolean;
};
