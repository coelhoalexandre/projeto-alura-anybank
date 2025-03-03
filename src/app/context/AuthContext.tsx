import { createContext, ReactNode, useEffect, useState } from 'react';
import { supabase } from '../../infra/supabase/config';
import { Session } from '@supabase/supabase-js';

interface IAuthContext {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  session: Session | null;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        console.log('getSession', session);
      })
      .finally(() => setIsLoading(false));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('onAuthStateChange', session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {loading ? 'carregando...' : children}
    </AuthContext.Provider>
  );
};
