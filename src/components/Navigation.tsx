import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { CreditCard, Film, Palette } from 'lucide-react';
import { GeneratorType } from '../types';

function Navigation() {
  const { activeGenerator, setActiveGenerator } = useApp();
  
  const generators: { id: GeneratorType; label: string; icon: JSX.Element }[] = [
    { 
      id: 'trading-card', 
      label: 'Trading Card', 
      icon: <CreditCard className="h-4 w-4" /> 
    },
    { 
      id: 'b-roll', 
      label: 'B-Roll', 
      icon: <Film className="h-4 w-4" /> 
    },
    { 
      id: 'icon-set', 
      label: 'Icon Set', 
      icon: <Palette className="h-4 w-4" /> 
    }
  ];
  
  return (
    <nav className="border-b border-surface-800 bg-surface-900/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex space-x-2">
          {generators.map((generator) => (
            <li key={generator.id}>
              <motion.button
                className={`flex items-center gap-2 px-4 py-3 relative ${
                  activeGenerator === generator.id 
                    ? 'text-primary-400' 
                    : 'text-surface-400 hover:text-surface-200'
                }`}
                onClick={() => setActiveGenerator(generator.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {generator.icon}
                <span>{generator.label}</span>
                
                {activeGenerator === generator.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                    layoutId="activeGenerator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;