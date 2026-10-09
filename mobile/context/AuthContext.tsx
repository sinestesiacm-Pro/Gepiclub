import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import {
  supabase,
  UserProfile,
  isSupabaseConfigured,
  MembershipTier,
} from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const DEFAULT_DEMO_PROFILE: UserProfile = {
  id: 'demo-vip-001',
  email: 'luca@gepiclub.travel',
  full_name: 'Luca',
  vip_card_number: '••••  ••••  ••••  8829',
  membership_tier: 'BLACK_ELITE',
  club_points: 42500,
  created_at: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isConfigured: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(DEFAULT_DEMO_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const configured = isSupabaseConfigured();

  const fetchProfile = async (userId: string, userEmail?: string) => {
    if (!configured) {
      setProfile(DEFAULT_DEMO_PROFILE);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Error fetching profile from Supabase:', error.message);
      }

      if (data) {
        setProfile({
          id: data.id,
          email: data.email || userEmail || '',
          full_name: data.full_name || 'Socio Gepiclub',
          vip_card_number: data.vip_card_number || '••••  ••••  ••••  8829',
          membership_tier: (data.membership_tier as MembershipTier) || 'BLACK_ELITE',
          club_points: typeof data.club_points === 'number' ? data.club_points : 42500,
          phone: data.phone,
          avatar_url: data.avatar_url,
          created_at: data.created_at,
        });
      } else {
        // Fallback profile if row does not exist yet
        setProfile({
          id: userId,
          email: userEmail || 'socio@gepiclub.travel',
          full_name: 'Luca',
          vip_card_number: '••••  ••••  ••••  8829',
          membership_tier: 'BLACK_ELITE',
          club_points: 42500,
        });
      }
    } catch (err) {
      console.error('Fetch profile unexpected error:', err);
      setProfile(DEFAULT_DEMO_PROFILE);
    }
  };

  useEffect(() => {
    if (!configured) {
      // Demo / offline luxury mode while waiting for live Supabase credentials
      setProfile(DEFAULT_DEMO_PROFILE);
      setIsLoading(false);
      return;
    }

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        await fetchProfile(newSession.user.id, newSession.user.email);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [configured]);

  const signIn = async (email: string, password: string) => {
    if (!configured) {
      // If not yet connected to live Supabase, log in with demo VIP profile
      setProfile({
        ...DEFAULT_DEMO_PROFILE,
        email: email || DEFAULT_DEMO_PROFILE.email,
      });
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error ? new Error(error.message) : null };
    } catch (err: any) {
      return { error: new Error(err.message || 'Errore di accesso') };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!configured) {
      setProfile({
        ...DEFAULT_DEMO_PROFILE,
        email,
        full_name: fullName || 'Nuovo Socio',
        club_points: 5000,
        membership_tier: 'GOLD_VIP',
      });
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { error: new Error(error.message) };
      }

      // Upsert profile into public.profiles
      if (data.user) {
        const randomCard = `••••  ••••  ••••  ${Math.floor(1000 + Math.random() * 9000)}`;
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email,
          full_name: fullName,
          vip_card_number: randomCard,
          membership_tier: 'GOLD_VIP',
          club_points: 5000,
          created_at: new Date().toISOString(),
        });
      }

      return { error: null };
    } catch (err: any) {
      return { error: new Error(err.message || 'Errore di registrazione') };
    }
  };

  const signOut = async () => {
    if (configured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id, user.email);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isConfigured: configured,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
