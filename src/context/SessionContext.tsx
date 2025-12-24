import React, { createContext, useState, useCallback } from 'react';

interface SessionContextType {
  userId: string | null;
  username: string | null;
  isConnected: boolean;
  setSession: (userId: string, username: string) => void;
  clearSession: () => void;
  setConnected: (connected: boolean) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const setSession = useCallback((id: string, name: string) => {
    setUserId(id);
    setUsername(name);
  }, []);

  const clearSession = useCallback(() => {
    setUserId(null);
    setUsername(null);
  }, []);

  const setConnected = useCallback((connected: boolean) => {
    setIsConnected(connected);
  }, []);

  return (
    <SessionContext.Provider
      value={{ userId, username, isConnected, setSession, clearSession, setConnected }}
    >
      {children}
    </SessionContext.Provider>
  );
};
