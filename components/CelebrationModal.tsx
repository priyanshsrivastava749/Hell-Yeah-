import React, { useEffect } from 'react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        if (window.confetti) {
            window.confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#00ff41', '#ffffff']
            });
            window.confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#00ff41', '#ffffff']
            });
        }

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative border-4 border-[#00ff41] bg-black p-8 md:p-12 max-w-lg w-full text-center shadow-[0_0_50px_#00ff41] animate-bounce-in">
        <h2 className="text-6xl md:text-8xl font-bold text-[#00ff41] mb-4 text-glow italic tracking-tighter">
          HELL YEAH
        </h2>
        <p className="text-xl text-white font-pixel mb-8 uppercase tracking-widest">
          Daily Protocol Complete.
          <br />
          Dopamine Detox Successful.
        </p>
        
        <button 
          onClick={onClose}
          className="bg-[#00ff41] text-black text-xl font-bold py-3 px-8 uppercase hover:bg-white hover:shadow-[0_0_20px_white] transition-all"
        >
          Acknowledge
        </button>

        {/* Corner Decals */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-[#00ff41]"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-[#00ff41]"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-[#00ff41]"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-[#00ff41]"></div>
      </div>
    </div>
  );
};

export default CelebrationModal;