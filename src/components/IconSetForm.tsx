import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Sparkles, PenSquare, List } from 'lucide-react';
import { useApp } from '../context/AppContext';

const styleOptions = [
  'Holographic',
  'Futuristic',
  'Minimalist',
  'Glassmorphic',
  'Pixel Art',
  'Cyberpunk',
  'Isometric 3D',
  'Flat 2.0',
  'Skeuomorphic',
  'Neon Wireframe',
];

const colorSchemeOptions = [
  'pastel neon',
  'glassy blues',
  'monochrome',
  'vibrant contrast',
  'retro vaporwave',
  'grayscale',
  'dark mode palette',
  'sunset gradient',
  'oceanic tones',
];

const useCaseOptions = [
  'app UI',
  'web dashboard',
  'game HUD',
  'infographic',
  'operating system',
  'presentation',
  'mobile navigation',
  'social media',
];

const iconSuggestions = [
  'home', 'gear', 'cloud', 'tasklist', 'heart', 
  'user', 'message', 'bell', 'calendar', 'search',
  'settings', 'cart', 'star', 'lock', 'camera',
  'document', 'folder', 'arrow left', 'arrow right', 'trash',
  'wifi', 'bluetooth', 'battery', 'location', 'microphone',
  'chart', 'graph', 'AI', 'robot', 'garden',
];

function IconSetForm() {
  const { iconSetParameters, updateIconSetParameters, generateIconSetImage, isGenerating } = useApp();
  const [showIconSuggestions, setShowIconSuggestions] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateIconSetImage();
  };
  
  const handleIconSuggestionClick = (icon: string) => {
    // Get current icons as array
    const currentIcons = iconSetParameters.icons
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);
    
    // Check if icon is already in the list
    if (!currentIcons.includes(icon)) {
      // Add new icon and join back to string
      const newIcons = [...currentIcons, icon].join(', ');
      updateIconSetParameters({ icons: newIcons });
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Palette className="text-primary-500 h-6 w-6" />
        <h2 className="text-xl font-medium">Icon Set Parameters</h2>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <label htmlFor="icons" className="label">Icons to Generate</label>
          <div className="relative">
            <List className="absolute left-3 top-3 text-surface-500 h-4 w-4" />
            <textarea
              id="icons"
              className="input pl-10 min-h-[80px]"
              value={iconSetParameters.icons}
              onChange={(e) => updateIconSetParameters({ icons: e.target.value })}
              placeholder="e.g., home, gear, cloud, tasklist, heart, user, message, bell"
              required
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-surface-400">Enter icon names separated by commas</p>
            <button 
              type="button" 
              className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1"
              onClick={() => setShowIconSuggestions(!showIconSuggestions)}
            >
              {showIconSuggestions ? 'Hide suggestions' : 'Show suggestions'}
            </button>
          </div>
          
          {showIconSuggestions && (
            <motion.div 
              className="mt-3 glass p-2 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="text-xs text-surface-300 mb-2">Click to add:</div>
              <div className="flex flex-wrap gap-1">
                {iconSuggestions.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    className="px-2 py-1 text-xs rounded bg-surface-800 hover:bg-surface-700 text-surface-300"
                    onClick={() => handleIconSuggestionClick(icon)}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="use_case" className="label">Use Case</label>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {useCaseOptions.map((useCase) => (
              <button
                key={useCase}
                type="button"
                className={`px-3 py-2 text-xs rounded-md transition-colors ${
                  iconSetParameters.use_case === useCase
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                }`}
                onClick={() => updateIconSetParameters({ use_case: useCase })}
              >
                {useCase}
              </button>
            ))}
          </div>
          <input
            id="use_case"
            type="text"
            className="input mt-2"
            value={iconSetParameters.use_case}
            onChange={(e) => updateIconSetParameters({ use_case: e.target.value })}
            placeholder="e.g., app UI, web dashboard, game HUD"
            required
          />
          <p className="text-xs text-surface-400 mt-1">Select a preset or enter a custom use case</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="style" className="label">Style</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
            {styleOptions.map((style) => (
              <button
                key={style}
                type="button"
                className={`px-3 py-2 text-xs rounded-md transition-colors ${
                  iconSetParameters.style === style
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                }`}
                onClick={() => updateIconSetParameters({ style })}
              >
                {style}
              </button>
            ))}
          </div>
          <input
            id="style"
            type="text"
            className="input mt-2"
            value={iconSetParameters.style}
            onChange={(e) => updateIconSetParameters({ style: e.target.value })}
            placeholder="e.g., Glassmorphic, Futuristic, Minimalist"
            required
          />
          <p className="text-xs text-surface-400 mt-1">Select a preset or enter a custom style</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="color_scheme" className="label">Color Scheme</label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {colorSchemeOptions.map((scheme) => (
              <button
                key={scheme}
                type="button"
                className={`px-3 py-2 text-xs rounded-md transition-colors ${
                  iconSetParameters.color_scheme === scheme
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                }`}
                onClick={() => updateIconSetParameters({ color_scheme: scheme })}
              >
                {scheme}
              </button>
            ))}
          </div>
          <input
            id="color_scheme"
            type="text"
            className="input mt-2"
            value={iconSetParameters.color_scheme}
            onChange={(e) => updateIconSetParameters({ color_scheme: e.target.value })}
            placeholder="e.g., pastel neon, glassy blues, monochrome"
            required
          />
          <p className="text-xs text-surface-400 mt-1">Select a preset or enter a custom color scheme</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="custom_instructions" className="label">Custom Instructions</label>
          <div className="relative">
            <PenSquare className="absolute left-3 top-3 text-surface-500 h-4 w-4" />
            <textarea
              id="custom_instructions"
              className="input pl-10 min-h-[80px]"
              value={iconSetParameters.custom_instructions}
              onChange={(e) => updateIconSetParameters({ custom_instructions: e.target.value })}
              placeholder="e.g., Include slight glass reflections on each icon, All icons must feature a circular base"
              required
            />
          </div>
          <p className="text-xs text-surface-400 mt-1">Provide specific details about your icons</p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="pt-4"
        >
          <button 
            type="submit" 
            className="btn-accent w-full py-3 flex justify-center items-center gap-2"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Generate Icon Set</span>
              </>
            )}
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default IconSetForm;