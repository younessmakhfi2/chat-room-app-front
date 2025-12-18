import { useContext } from "react";
import { SessionContext, SessionContextType } from "../context/SessionContext";

/**
 * Custom hook to access session context
 * Must be used inside SessionProvider
 */
const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};

export default useSession;
