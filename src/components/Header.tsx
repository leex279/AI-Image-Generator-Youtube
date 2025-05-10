import { Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onSettingsClick: () => void;
}

function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="py-4 px-6 border-b border-surface-800 bg-surface-900/70 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles className="text-accent-500 h-6 w-6" />
          <div className="relative">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
              AI Image Generator
            </h1>
            <div 
              className="text-xs text-right text-white"
              style={{ 
                textShadow: '0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff'
              }}
            >
              by DIY SmartCode
            </div>
          </div>
        </motion.div>
        
        <motion.button
          className="btn-secondary p-2 rounded-full"
          onClick={onSettingsClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="h-5 w-5" />
        </motion.button>
      </div>
    </header>
  );
}

export default Header;