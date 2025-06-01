import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Key, Info, ExternalLink, Globe, Webhook } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SettingsModalProps {
  onClose: () => void;
}

function SettingsModal({ onClose }: SettingsModalProps) {
  const { apiKey, setApiKey, useWebhook, setUseWebhook, webhookUrl, setWebhookUrl } = useApp();
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localUseWebhook, setLocalUseWebhook] = useState(useWebhook);
  const [localWebhookUrl, setLocalWebhookUrl] = useState(webhookUrl);
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
    setUseWebhook(localUseWebhook);
    setWebhookUrl(localWebhookUrl);
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
        
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4 text-primary-500" />
              <span className="label mb-0">Image Generation Service</span>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-surface-800 cursor-pointer hover:bg-surface-800/50 transition-colors">
                <input
                  type="radio"
                  checked={!localUseWebhook}
                  onChange={() => setLocalUseWebhook(false)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <div>
                  <div className="font-medium">OpenAI Direct</div>
                  <div className="text-sm text-surface-400">Connect directly to OpenAI's API using your API key</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 rounded-lg border border-surface-800 cursor-pointer hover:bg-surface-800/50 transition-colors">
                <input
                  type="radio"
                  checked={localUseWebhook}
                  onChange={() => setLocalUseWebhook(true)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <div>
                  <div className="font-medium">Custom Webhook</div>
                  <div className="text-sm text-surface-400">Use a custom webhook endpoint for image generation</div>
                </div>
              </label>
            </div>
          </div>

          {!localUseWebhook && (
            <div>
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
              
              <div className="rounded-lg bg-surface-800/50 p-4 mt-4 text-sm text-surface-300 flex gap-3">
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
            </div>
          )}

          {localUseWebhook && (
            <div>
              <label htmlFor="webhook-url" className="label flex gap-2 items-center">
                <Webhook className="h-4 w-4 text-primary-500" />
                <span>Webhook URL</span>
              </label>
              <input
                id="webhook-url"
                type="url"
                className="input"
                value={localWebhookUrl}
                onChange={(e) => setLocalWebhookUrl(e.target.value)}
                placeholder="https://your-webhook-url.com/endpoint"
              />
              
              <div className="rounded-lg bg-surface-800/50 p-4 mt-4 text-sm text-surface-300 flex gap-3">
                <Info className="h-5 w-5 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <p>Enter the URL of your webhook endpoint that will handle the image generation requests.</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
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