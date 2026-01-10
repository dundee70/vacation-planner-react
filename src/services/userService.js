import { supabase } from './supabase';

export async function getCurrentUserProfile(userId) {
  const { data } = await supabase
    .from('employees')
    .select('name, role')
    .eq('id', userId)
    .single();

  return data;
}
