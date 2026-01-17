import { useState } from 'react';
import type { UserData, ViewState } from './types';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { Navbar } from './components/Navbar';
import { MemoryTest } from './components/MemoryTest';
import { ActivityTracker } from './components/ActivityTracker';
import { CaregiverNotes } from './components/CaregiverNotes';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('AUTH');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    riskLevel: 'Moderate', // Default for demo
    history: [],
    activity: [],
    notes: []
  });

  const handleLogin = (name: string) => {
    setUserData(prev => ({ ...prev, name }));
    setCurrentView('HOME');
  };

  const handleRiskUpdate = (newRisk: 'Low' | 'Moderate' | 'High') => {
    setUserData(prev => ({ ...prev, riskLevel: newRisk }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans p-4">
      {/* Mobile Wrapper */}
      <div className="w-full max-w-[448px] bg-white h-[850px] max-h-screen rounded-[40px] shadow-2xl overflow-hidden relative border border-gray-100 flex flex-col">

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative bg-gray-50/50">
          {currentView === 'AUTH' && <AuthScreen onLogin={handleLogin} />}

          {currentView === 'HOME' && (
            <HomeScreen userData={userData} onNavigate={setCurrentView} />
          )}

          {currentView === 'TEST' && (
            <MemoryTest
              onComplete={(risk) => {
                handleRiskUpdate(risk);
                setCurrentView('HOME');
              }}
              onBack={() => setCurrentView('HOME')}
            />
          )}

          {currentView === 'ACTIVITY' && (
            <ActivityTracker onBack={() => setCurrentView('HOME')} />
          )}

          {currentView === 'NOTES' && (
            <CaregiverNotes
              notes={userData.notes}
              onAddNote={(note) => setUserData(prev => ({ ...prev, notes: [note, ...prev.notes] }))}
              onBack={() => setCurrentView('HOME')}
            />
          )}
        </div>

        {/* Navigation */}
        <Navbar currentView={currentView} onNavigate={setCurrentView} />

      </div>
    </div>
  );
}

export default App;
