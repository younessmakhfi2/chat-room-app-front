import React, { useState } from "react";
import useSession from "../hooks/useSession";
import "../styles/DisplayNameEntry.css";

const MIN_LENGTH = 2;
const MAX_LENGTH = 30;

const DisplayNameEntry: React.FC = () => {
  const { setDisplayName, displayNameSet } = useSession();
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateDisplayName = (name: string): boolean => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Display name cannot be empty");
      return false;
    }

    if (trimmedName.length < MIN_LENGTH) {
      setError(`Display name must be at least ${MIN_LENGTH} characters`);
      return false;
    }

    if (trimmedName.length > MAX_LENGTH) {
      setError(`Display name must not exceed ${MAX_LENGTH} characters`);
      return false;
    }

    // Optional: Check for invalid characters
    if (!/^[a-zA-Z0-9_\s-]+$/.test(trimmedName)) {
      setError(
        "Display name can only contain letters, numbers, spaces, hyphens, and underscores"
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateDisplayName(inputValue)) {
      // Save to session state
      setDisplayName(inputValue.trim());

      // Optional: Save to localStorage
      localStorage.setItem("chat_room_displayName", inputValue.trim());

      // Clear input for any future use
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSubmit(e as any);
    }
  };

  // Hide component if display name is already set
  if (displayNameSet) {
    return null;
  }

  return (
    <div className="display-name-entry-container">
      <div className="display-name-entry-card">
        <h1>Welcome to Chat Room</h1>
        <p className="subtitle">Let's get started! What's your name?</p>

        <form onSubmit={handleSubmit} className="display-name-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your display name"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              maxLength={MAX_LENGTH}
              autoFocus
              className={`display-name-input ${error ? "input-error" : ""}`}
            />
            <span className="char-count">
              {inputValue.length}/{MAX_LENGTH}
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button">
            Enter Chat
          </button>
        </form>

        <p className="info-text">
          Name must be {MIN_LENGTH}-{MAX_LENGTH} characters
        </p>
      </div>
    </div>
  );
};

export default DisplayNameEntry;
