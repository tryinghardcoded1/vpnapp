import React, { useState } from 'react';
import { ConnectionStatus, ScreenView, User, Server } from './types';
import { MOCK_SERVERS } from './constants';
import { Navbar } from './components/Navbar';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SpeedTestScreen } from './screens/SpeedTestScreen';
import { SubscriptionScreen } from './screens/SubscriptionScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Helmet } from "react-helmet"; // <-- Add this

function App() {
  // Global State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenView>(ScreenView.HOME);
  
  // VPN State
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [selectedServer, setSelectedServer] = useState<Server>(MOCK_SERVERS[0]);
  
  // User State
  const [user, setUser] = useState<User>({
    name: 'Guest User',
    email: '',
    isPremium: false
  });

  const handleLogin = (email: string) => {
    setUser(prev => ({ ...prev, email, name: email.split('@')[0] }));
    setIsAuthenticated(true);
    setCurrentScreen(ScreenView.HOME);
  };

  const handleLogout = () => {
    setConnectionStatus(ConnectionStatus.DISCONNECTED);
    setIsAuthenticated(false);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleTogglePremium = () => {
    setUser(prev => ({ ...prev, isPremium: !prev.isPremium }));
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenView.HOME:
        return (
          <HomeScreen 
            status={connectionStatus}
            setStatus={setConnectionStatus}
            selectedServer={selectedServer}
            setSelectedServer={setSelectedServer}
            isPremium={user.isPremium}
          />
        );
      case ScreenView.SPEED_TEST:
        return <SpeedTestScreen status={connectionStatus} />;
      case ScreenView.SUBSCRIPTION:
        return <SubscriptionScreen isPremium={user.isPremium} onTogglePremium={handleTogglePremium} />;
      case ScreenView.PROFILE:
        return <ProfileScreen user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Helmet injects manifest into <head> */}
      <Helmet>
        <link rel="manifest" href="/manifest.json" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-white">
        {/* Desktop Constraint Container: Simulating Mobile App Feel */}
        <div className="max-w-md mx-auto min-h-screen bg-slate-950 shadow-2xl relative flex flex-col">
          
          {/* Screen Content */}
          <main className="flex-1 pb-24 overflow-y-auto scrollbar-hide">
            {renderScreen()}
          </main>

          {/* Bottom Navigation */}
          <Navbar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
          
        </div>
      </div>
    </>
  );
}

export default App;
