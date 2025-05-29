import type { Profile } from '@/shared/types/profile';
import { supabase } from '@@/supabase';

const PROFILES_TABLE = 'profiles';
const FOLLOWS_TABLE = 'follows';

export async function getAllUsers(): Promise<Profile[]> {
  const { data: users, error } = await supabase.from(PROFILES_TABLE).select('*');

  if (error) throw error;

  return users;
}

export async function getAllUsersWithSubscriptionStatus({ search }: { search?: string }): Promise<Profile[]> {
  let query = supabase.rpc('get_profiles_with_subscription_status');

  if (search) {
    query = query.or(`username.ilike.%${search}%, email.ilike.%${search}%`);
  }

  const { data: users, error } = await query;

  if (error) throw error;

  return users;
}

export async function getUser(userId: string): Promise<Profile> {
  const { data: user, error } = await supabase
    .rpc('get_profile_with_subscription_status', { profile_id: userId })
    .single<Profile>();

  if (error) throw error;

  return user;
}

export async function getMyFollows(userId: string): Promise<Profile[]> {
  const { data: users, error } = await supabase.from(FOLLOWS_TABLE).select('*').eq('follower_id', userId);

  if (error) throw error;

  return users;
}

export async function followUser({
  userId,
  followedUserId,
}: {
  userId: string;
  followedUserId: string;
}): Promise<void> {
  const { error } = await supabase.from(FOLLOWS_TABLE).insert({ followee_id: followedUserId, follower_id: userId });

  if (error) throw error;
}

export async function unfollowUser({
  userId,
  followedUserId,
}: {
  userId: string;
  followedUserId: string;
}): Promise<void> {
  const { error } = await supabase
    .from(FOLLOWS_TABLE)
    .delete()
    .eq('followee_id', followedUserId)
    .eq('follower_id', userId);

  if (error) throw error;
}
