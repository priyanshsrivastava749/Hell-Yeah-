import React from 'react';
import { HabitDef } from '../types';
import { Terminal, Sun, Dumbbell, Gamepad2, Check } from 'lucide-react';

interface HabitRowProps {
  habit: HabitDef;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

const icons: Record<string, React.FC<any>> = {
  Terminal,
  Sun,
  Dumbbell,
  Gamepad2
};

const HabitRow: React.FC<HabitRowProps> = ({ habit, isCompleted, onToggle }) => {
  const Icon = icons[habit.icon] || Terminal;

  return (
    <div 
      onClick={() => onToggle(habit.id)}
      className={`
        group relative overflow-hidden cursor-pointer border-2 transition-all duration-300 ease-out
        flex items-center p-4 md:p-6 mb-4
        ${isCompleted 
          ? 'border-[#00ff41] bg-[#00ff41] text-black shadow-[0_0_15px_#00ff41]' 
          : 'border-[#003300] bg-black text-[#00ff41] hover:border-[#00ff41] hover:shadow-[0_0_10px_#003300]'
        }
      `}
    >
      {/* Glitch Overlay (only on hover when not completed) */}
      {!isCompleted && (
        <div className="absolute inset-0 bg-[#00ff41] opacity-0 group-hover:opacity-5 transition-opacity duration-100 pointer-events-none" />
      )}

      {/* Checkbox Graphic */}
      <div className={`
        flex-shrink-0 w-12 h-12 md:w-16 md:h-16 border-2 mr-6 flex items-center justify-center transition-all duration-300
        ${isCompleted ? 'border-black bg-black text-[#00ff41]' : 'border-[#00ff41]'}
      `}>
        {isCompleted && <Check size={32} strokeWidth={4} />}
      </div>

      {/* Text Content */}
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <Icon size={20} className={isCompleted ? "text-black" : "text-[#00ff41]"} />
          <h3 className={`text-xl md:text-2xl font-bold uppercase tracking-widest ${isCompleted ? 'text-black' : 'text-glow'}`}>
            {habit.title}
          </h3>
        </div>
        <p className={`text-sm md:text-base font-pixel uppercase tracking-wide opacity-80 ${isCompleted ? 'text-black font-bold' : 'text-[#00aa2c]'}`}>
          {habit.description}
        </p>
      </div>

      {/* Decoration: Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50"></div>
    </div>
  );
};

export default HabitRow;