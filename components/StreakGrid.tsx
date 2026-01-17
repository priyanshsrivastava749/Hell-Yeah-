import React from 'react';
import { HistoryMap } from '../types';
import { HABITS } from '../constants';

interface StreakGridProps {
  history: HistoryMap;
}

const StreakGrid: React.FC<StreakGridProps> = ({ history }) => {
  // Generate last 30 days
  const days = React.useMemo(() => {
    const dates = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      // Adjust for timezone to match storage keys
      const offset = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - (offset * 60 * 1000));
      dates.push(localDate.toISOString().split('T')[0]);
    }
    return dates;
  }, []);

  const totalHabits = HABITS.length;

  return (
    <div className="mt-12 border-t border-[#003300] pt-8">
      <h3 className="text-[#00ff41] text-lg mb-4 font-bold tracking-widest uppercase text-glow">
        System_Logs // Last 30 Cycles
      </h3>
      
      <div className="flex flex-wrap gap-1 md:gap-2 justify-center md:justify-start">
        {days.map((date) => {
          const completedCount = history[date]?.length || 0;
          const percentage = completedCount / totalHabits;
          
          let bgColor = 'bg-[#0a0a0a]'; // Empty
          let borderColor = 'border-[#003300]';

          if (completedCount === totalHabits) {
            bgColor = 'bg-[#00ff41] shadow-[0_0_8px_#00ff41]'; // Full Win
            borderColor = 'border-[#00ff41]';
          } else if (completedCount > 0) {
            bgColor = 'bg-[#005515]'; // Partial
            borderColor = 'border-[#00aa2c]';
          }

          return (
            <div 
              key={date}
              title={`${date}: ${completedCount}/${totalHabits}`}
              className={`
                w-6 h-6 md:w-8 md:h-8 border ${borderColor} ${bgColor}
                transition-all duration-300 hover:scale-110
              `}
            />
          );
        })}
      </div>
      
      <div className="mt-2 flex gap-4 text-xs text-[#005515] font-pixel uppercase">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border border-[#003300] bg-[#0a0a0a]"></div>
          <span>Null</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border border-[#00aa2c] bg-[#005515]"></div>
          <span>Partial</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border border-[#00ff41] bg-[#00ff41]"></div>
          <span>Complete</span>
        </div>
      </div>
    </div>
  );
};

export default StreakGrid;