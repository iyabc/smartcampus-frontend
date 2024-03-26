import { Session } from '@supabase/supabase-js';
import { ReactNode, createContext, useContext, useState } from 'react';

type SessionProviderProps = {
  children: ReactNode;
};

type SessionContextType = {
  session: Session | null;
  changeSession: (newUser: Session | null) => void;
};

const defaultSession = null;

const SessionContext = createContext<SessionContextType>({
  session: defaultSession,
  changeSession: () => {},
});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(defaultSession);

  const changeSession = (newSession: Session | null) => {
    setSession(newSession);
  };

  const contextValue: SessionContextType = {
    session,
    changeSession,
  };

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
};
