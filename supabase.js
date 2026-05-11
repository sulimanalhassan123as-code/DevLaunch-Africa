// supabase.js
import { createClient } from '@supabase/supabase-js';

// These will be pulled from Vercel Settings > Environment Variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "YOUR_ACTUAL_URL_HERE";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "YOUR_ACTUAL_KEY_HERE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
