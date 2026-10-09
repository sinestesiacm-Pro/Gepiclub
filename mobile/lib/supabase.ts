import { createClient } from '@supabase/supabase-js';
import { supabaseStorage } from './supabaseStorage';

export const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://mstmtrmwvavcbpygwlyg.supabase.co';
export const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdG10cm13dmF2Y2JweWd3bHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NDkzNDQsImV4cCI6MjEwNzEyNTM0NH0.LuFRfarNlBOrYMLdkgdKguprgMe-ws4sjkSCdaHCNvE';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_ANON_KEY) &&
    !SUPABASE_URL.includes('your-project-id')
  );
};

export type MembershipTier = 'BLACK_ELITE' | 'GOLD_VIP' | 'SILVER' | 'STANDARD';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  vip_card_number: string;
  membership_tier: MembershipTier;
  club_points: number;
  phone?: string;
  avatar_url?: string;
  created_at?: string;
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: supabaseStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
