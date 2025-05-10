import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

function TradingCardPreview() {
  const { cardParameters } = useApp();
  
  // Convert color names to gradients
  const getGradientFromColors = (colors: string[]) => {
    if (colors.length === 1) return colors[0];
    return `linear-gradient(45deg, ${colors.join(', ')})`;
  };
  
  return (
    <div className="w-full h-full relative bg-surface-950 rounded-lg overflow-hidden flex items-center justify-center p-6">
      {/* Ambient background glow */}
      <div className="absolute inset-0 opacity-30" style={{ 
        background: `radial-gradient(circle at 50% 50%, ${cardParameters.colors[0] || 'rgba(139, 92, 246, 0.5)'}, transparent 70%)` 
      }}></div>
      
      {/* Card outline */}
      <motion.div 
        className="relative w-full max-w-[80%] aspect-[1/1.4] rounded-2xl overflow-hidden animate-float"
        style={{
          boxShadow: `0 0 40px 5px rgba(139, 92, 246, 0.2), 0 0 15px 2px rgba(139, 92, 246, 0.3)`,
          background: `linear-gradient(140deg, rgba(30,30,35,0.7) 0%, rgba(60,60,70,0.4) 100%)`,
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Holographic effect */}
        <div className="absolute inset-0 opacity-10 holographic-effect"></div>
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)',
          mixBlendMode: 'overlay',
        }}></div>
        
        {/* Card content */}
        <div className="absolute inset-0 p-4 flex flex-col">
          {/* Top bar with ticker and signature */}
          <div className="flex justify-between">
            <div className="text-xs font-bold bg-surface-900/60 backdrop-blur-sm px-2 py-1 rounded">
              {cardParameters.ticker}
            </div>
            <div className="text-xs font-light italic bg-surface-900/60 backdrop-blur-sm px-2 py-1 rounded">
              {cardParameters.signature || 'Signature'}
            </div>
          </div>
          
          {/* Center logo area */}
          <div className="flex-grow flex items-center justify-center">
            <motion.div 
              className="w-24 h-24 rounded-full relative"
              animate={{ 
                boxShadow: ['0 0 20px 5px rgba(139, 92, 246, 0.3)', '0 0 30px 8px rgba(139, 92, 246, 0.5)', '0 0 20px 5px rgba(139, 92, 246, 0.3)']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'reverse' 
              }}
              style={{
                background: getGradientFromColors(cardParameters.colors)
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-center text-white text-sm font-semibold">
                {cardParameters.logo.split(' ')[0]}
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white opacity-80"
                    style={{ 
                      left: `${Math.random() * 100}%`, 
                      top: `${Math.random() * 100}%`,
                      boxShadow: '0 0 3px 1px rgba(255,255,255,0.6)'
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Bottom info */}
          <div className="mt-auto">
            <div className="text-center mb-2 text-lg font-semibold">
              {cardParameters.company_name}
            </div>
            <div className="flex justify-between text-xs text-surface-300">
              <div>REV: {cardParameters.revenue}</div>
              <div>{cardParameters.card_number}</div>
              <div>{cardParameters.year}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TradingCardPreview;