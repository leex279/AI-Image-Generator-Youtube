import { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const styleOptions = [
  'cinematic',
  'minimal',
  'abstract',
  'corporate',
  'retro-futuristic',
  'sci-fi',
  'neon',
  'cyberpunk',
  'clean',
];

const paletteOptions = [
  'dark neon blues',
  'clean grayscale tones',
  'synthwave colors',
  'tech green and blue',
  'corporate blues',
  'high contrast monochrome',
  'muted earth tones',
  'warm red and orange',
  'cool blue and teal',
];

function BRollForm() {
  const { bRollParameters, updateBRollParameters, generateBRollImage, isGenerating } = useApp();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateBRollImage();
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
        <Film className="text-primary-500 h-6 w-6" />
        <h2 className="text-xl font-medium">B-Roll Parameters</h2>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={itemVariants}>
          <label htmlFor="topic" className="label">Topic</label>
          <input
            id="topic"
            type="text"
            className="input"
            value={bRollParameters.topic}
            onChange={(e) => updateBRollParameters({ topic: e.target.value })}
            placeholder="e.g., machine learning, robotics, data science"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="style" className="label">Visual Style</label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {styleOptions.map((style) => (
              <button
                key={style}
                type="button"
                className={`px-3 py-2 text-xs rounded-md transition-colors ${
                  bRollParameters.style === style
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                }`}
                onClick={() => updateBRollParameters({ style })}
              >
                {style}
              </button>
            ))}
          </div>
          <input
            id="style"
            type="text"
            className="input mt-2"
            value={bRollParameters.style}
            onChange={(e) => updateBRollParameters({ style: e.target.value })}
            placeholder="e.g., cinematic, minimal"
            required
          />
          <p className="text-xs text-surface-400 mt-1">Select a preset or enter a custom style</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="palette" className="label">Color Palette</label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {paletteOptions.map((palette) => (
              <button
                key={palette}
                type="button"
                className={`px-3 py-2 text-xs rounded-md transition-colors ${
                  bRollParameters.palette === palette
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                }`}
                onClick={() => updateBRollParameters({ palette })}
              >
                {palette}
              </button>
            ))}
          </div>
          <input
            id="palette"
            type="text"
            className="input mt-2"
            value={bRollParameters.palette}
            onChange={(e) => updateBRollParameters({ palette: e.target.value })}
            placeholder="e.g., dark neon blues, clean grayscale tones"
            required
          />
          <p className="text-xs text-surface-400 mt-1">Select a preset or enter a custom palette</p>
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
                <span>Generate B-Roll</span>
              </>
            )}
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default BRollForm;