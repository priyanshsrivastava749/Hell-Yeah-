import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full mb-8 relative">
      <div className="flex justify-between items-end mb-2 text-[#00ff41] font-bold tracking-widest uppercase">
        <span className="text-glow">Sync Status</span>
        <span>{Math.round(progress)}%</span>
      </div>
      
      {/* Bar Container */}
      <div className="h-6 w-full bg-[#001100] border border-[#003300] relative overflow-hidden">
        {/* Grid Background inside bar */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(90deg, #00ff41 1px, transparent 1px)', backgroundSize: '20px 100%' }}>
        </div>

        {/* Fill */}
        <div 
          className="h-full bg-[#00ff41] transition-all duration-500 ease-out relative shadow-[0_0_20px_#00ff41]"
          style={{ width: `${progress}%` }}
        >
            {/* Animated shine/glare on the bar */}
            <div className="absolute top-0 right-0 bottom-0 w-1 bg-white opacity-50 blur-[2px]"></div>
        </div>
      </div>
      
      {/* Decorative text under bar */}
      <div className="flex justify-between mt-1 text-[10px] text-[#005515] font-pixel uppercase">
        <span>Sys.Ready</span>
        <span>Dopamine.Level.Optimized</span>
      </div>
    </div>
  );
};

export default ProgressBar;