import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in environment');
  }

  if (!supabase) {
    supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, detectSessionInUrl: false },
      global: { headers: { 'X-Client-Info': 'bug-buster' } }
    });
  }

  return supabase;
}