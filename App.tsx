import React, { useState, useEffect } from 'react';
import { HABITS } from './constants';
import { loadHistory, getTodayHabits, toggleHabitInStorage, getTodayStr } from './services/storageService';
import HabitRow from './components/HabitRow';
import ProgressBar from './components/ProgressBar';
import StreakGrid from './components/StreakGrid';
import Scanlines from './components/Scanlines';
import CelebrationModal from './components/CelebrationModal';
import { HistoryMap } from './types';
import { Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryMap>({});
  const [todayCompleted, setTodayCompleted] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCelebratedToday, setHasCelebratedToday] = useState(false);

  // Initial Load
  useEffect(() => {
    const data = loadHistory();
    setHistory(data);
    
    const today = getTodayStr();
    const todayData = data[today] || [];
    setTodayCompleted(todayData);
    
    // Check if already celebrated this session (simple logic: if full, don't auto-pop unless action triggers it)
    if (todayData.length === HABITS.length) {
      setHasCelebratedToday(true);
    }
  }, []);

  const handleToggle = (id: string) => {
    const { newHistory, isCompleted } = toggleHabitInStorage(id);
    
    setHistory(newHistory);
    setTodayCompleted(newHistory[getTodayStr()] || []);

    // Check for win condition
    const currentCount = (newHistory[getTodayStr()] || []).length;
    if (currentCount === HABITS.length && !hasCelebratedToday) {
      setShowCelebration(true);
      setHasCelebratedToday(true);
    } else if (currentCount < HABITS.length) {
      setHasCelebratedToday(false);
    }
  };

  const progress = (todayCompleted.length / HABITS.length) * 100;

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden selection:bg-[#00ff41] selection:text-black">
      <Scanlines />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-8 border-b-2 border-[#003300] pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-glow uppercase">
              Dopamine<span className="text-white">_</span>Detox
            </h1>
            <p className="text-[#00aa2c] font-pixel text-sm md:text-lg mt-1">
              > User: OPERATOR // Status: ONLINE
            </p>
          </div>
          <Cpu className="text-[#00ff41] animate-pulse hidden md:block" size={48} />
        </header>

        {/* Progress Section */}
        <ProgressBar progress={progress} />

        {/* Habits List */}
        <main className="space-y-4">
          {HABITS.map(habit => (
            <HabitRow
              key={habit.id}
              habit={habit}
              isCompleted={todayCompleted.includes(habit.id)}
              onToggle={handleToggle}
            />
          ))}
        </main>

        {/* Footer / Stats */}
        <StreakGrid history={history} />
        
        <footer className="mt-12 text-center text-[#005515] text-xs font-pixel">
          <p>SYSTEM.VERSION.2.0.4 // NO_EXCUSES_MODE_ACTIVE</p>
          <p className="mt-2">"Discipline equals Freedom"</p>
        </footer>
      </div>

      <CelebrationModal 
        isOpen={showCelebration} 
        onClose={() => setShowCelebration(false)} 
      />
    </div>
  );
};

export default App;