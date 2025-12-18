import useUserId from "./hooks/useUserId";
import { SessionProvider } from "./context/SessionContext";
import DisplayNamePage from "./pages/DisplayNamePage";
import ChatPage from "./pages/ChatPage";
import "./App.css";

function App() {
  const { userId, isLoading } = useUserId();

  if (isLoading) {
    return (
      <div className="app-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="app-error">
        <p>Error: Unable to initialize user</p>
      </div>
    );
  }

  return (
    <SessionProvider userId={userId}>
      <DisplayNamePage />
      <ChatPage />
    </SessionProvider>
  );
}

export default App;
