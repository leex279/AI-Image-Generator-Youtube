import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

function BRollPreview() {
  const { bRollParameters } = useApp();
  
  return (
    <div className="w-full h-full relative bg-surface-950 rounded-lg overflow-hidden flex items-center justify-center p-6">
      {/* Ambient background glow */}
      <div className="absolute inset-0 opacity-40" style={{ 
        background: `radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.3), transparent 70%)` 
      }}></div>
      
      {/* Content frame */}
      <motion.div 
        className="relative w-full max-w-[80%] aspect-square rounded-lg overflow-hidden"
        style={{
          boxShadow: `0 0 40px 5px rgba(56, 189, 248, 0.2), 0 0 15px 2px rgba(56, 189, 248, 0.3)`,
          background: `linear-gradient(140deg, rgba(20,20,30,0.7) 0%, rgba(40,40,60,0.4) 100%)`,
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Visual effects */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)',
          mixBlendMode: 'overlay',
        }}></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 z-20 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white opacity-70"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 3px 1px rgba(255,255,255,0.4)'
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        {/* Digital grid */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(56, 189, 248, 0.3) 25%, rgba(56, 189, 248, 0.3) 26%, transparent 27%, transparent 74%, rgba(56, 189, 248, 0.3) 75%, rgba(56, 189, 248, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(56, 189, 248, 0.3) 25%, rgba(56, 189, 248, 0.3) 26%, transparent 27%, transparent 74%, rgba(56, 189, 248, 0.3) 75%, rgba(56, 189, 248, 0.3) 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px' 
          }}
        ></div>
        
        {/* HUD elements */}
        <div className="absolute inset-0 p-4 flex flex-col">
          {/* Topic */}
          <div className="flex justify-between">
            <div className="text-xs font-bold bg-surface-900/60 backdrop-blur-sm px-2 py-1 rounded">
              {bRollParameters.topic}
            </div>
            <div className="text-xs bg-surface-900/60 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
              <span>1:1</span>
            </div>
          </div>
          
          {/* Center visualization */}
          <div className="flex-grow flex items-center justify-center">
            <motion.div
              className="relative w-40 h-40 flex items-center justify-center"
              animate={{ 
                boxShadow: ['0 0 20px 5px rgba(56, 189, 248, 0.2)', '0 0 30px 8px rgba(56, 189, 248, 0.3)', '0 0 20px 5px rgba(56, 189, 248, 0.2)']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: 'reverse' 
              }}
            >
              {/* Neural network visualization */}
              <motion.div 
                className="absolute inset-0 opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-accent-400"
                    style={{ 
                      left: `calc(50% + ${Math.cos(i * (Math.PI * 2) / 5) * 60}px)`, 
                      top: `calc(50% + ${Math.sin(i * (Math.PI * 2) / 5) * 60}px)`,
                    }}
                  >
                    {Array.from({ length: 5 }).map((_, j) => (
                      <motion.div
                        key={j}
                        className="absolute top-1/2 left-1/2 w-16 h-0.5 -translate-y-1/2 origin-left"
                        style={{
                          background: `linear-gradient(90deg, rgba(56, 189, 248, 0.8) 0%, transparent 100%)`,
                          rotate: `${j * (360 / 5)}deg`,
                          opacity: 0.3 + (j * 0.1)
                        }}
                      />
                    ))}
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Central element */}
              <motion.div
                className="w-20 h-20 rounded-full relative z-10"
                style={{ background: `radial-gradient(circle at center, rgba(56, 189, 248, 0.8), rgba(124, 58, 237, 0.5))` }}
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  repeatType: 'reverse' 
                }}
              />
            </motion.div>
          </div>
          
          {/* Bottom info */}
          <div className="mt-auto">
            <div className="text-center mb-2 text-sm font-semibold">
              {bRollParameters.style} aesthetic
            </div>
            <div className="flex justify-between text-xs text-surface-300">
              <div>Palette: {bRollParameters.palette}</div>
              <div>4K</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default BRollPreview;