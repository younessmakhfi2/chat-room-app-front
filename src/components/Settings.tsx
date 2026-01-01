import React, { useState } from 'react';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <div className="settings-group">
        <label>
          Theme
          <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div className="settings-group">
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Enable notifications
        </label>
      </div>
      <div className="settings-group">
        <label>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
          />
          Enable sound
        </label>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Settings;
