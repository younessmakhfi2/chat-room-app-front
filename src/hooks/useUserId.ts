import { useEffect , useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface UseUserIdReturn {
  userId: string | null;
  isLoading: boolean;
}

/**
 * Custom hook to manage user ID
 * - Checks localStorage for existing userId
 * - Generates and stores new UUID if missing
 * - Loads userId into app memory
 */
const useUserId = (): UseUserIdReturn => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): void => {
    const initializeUserId = (): void => {
      const STORAGE_KEY = "chat_room_userId";

      // Check if userId exists in localStorage
      let storedUserId = localStorage.getItem(STORAGE_KEY);

      // If not found, generate and store new UUID
      if (!storedUserId) {
        storedUserId = uuidv4();
        localStorage.setItem(STORAGE_KEY, storedUserId);
      }

      // Load userId into app memory
      setUserId(storedUserId);
      setIsLoading(false);
    };

    initializeUserId();
  }, []);

  return { userId, isLoading };
};

export default useUserId;
