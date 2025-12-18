import React, { createContext, useState, useCallback, ReactNode } from "react";

export type ConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export interface SessionContextType {
  // State
  userId: string | null;
  displayName: string;
  roomId: string;
  connectionStatus: ConnectionStatus;
  displayNameSet: boolean;

  // Actions
  setDisplayName: (name: string) => void;
  setRoomId: (roomId: string) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

interface SessionProviderProps {
  userId: string;
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  userId,
  children,
}) => {
  const [displayName, setDisplayNameState] = useState<string>("");
  const [displayNameSet, setDisplayNameSet] = useState<boolean>(false);
  const [roomId, setRoomIdState] = useState<string>("general");
  const [connectionStatus, setConnectionStatusState] =
    useState<ConnectionStatus>("idle");

  // Allow setting display name only once
  const setDisplayName = useCallback(
    (name: string): void => {
      if (!displayNameSet && name.trim()) {
        setDisplayNameState(name.trim());
        setDisplayNameSet(true);
      }
    },
    [displayNameSet]
  );

  // Allow changing room ID
  const setRoomId = useCallback((newRoomId: string): void => {
    if (newRoomId.trim()) {
      setRoomIdState(newRoomId.trim());
    }
  }, []);

  // Allow updating connection status
  const setConnectionStatus = useCallback((status: ConnectionStatus): void => {
    setConnectionStatusState(status);
  }, []);

  const value: SessionContextType = {
    userId,
    displayName,
    roomId,
    connectionStatus,
    displayNameSet,
    setDisplayName,
    setRoomId,
    setConnectionStatus,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionContext;
