import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Key, Info, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SettingsModalProps {
  onClose: () => void;
}

function SettingsModal({ onClose }: SettingsModalProps) {
  const { apiKey, setApiKey } = useApp();
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  const handleSave = () => {
    setApiKey(localApiKey);
    onClose();
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="card w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-surface-800">
          <h2 className="text-xl font-medium">Settings</h2>
          <button 
            className="text-surface-400 hover:text-surface-200 rounded-full p-1"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="api-key" className="label flex gap-2 items-center">
              <Key className="h-4 w-4 text-primary-500" />
              <span>OpenAI API Key</span>
            </label>
            <div className="relative">
              <input
                id="api-key"
                type={showKey ? 'text' : 'password'}
                className="input pr-24"
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                placeholder="sk-..."
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>
          
          <div className="rounded-lg bg-surface-800/50 p-4 mb-6 text-sm text-surface-300 flex gap-3">
            <Info className="h-5 w-5 text-primary-400 shrink-0 mt-0.5" />
            <div>
              <p className="mb-2">You need an OpenAI API key with access to the gpt-image-1 model to use this application.</p>
              <p>
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
                >
                  Get an API key
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn-primary"
              onClick={handleSave}
            >
              Save Settings
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SettingsModal;