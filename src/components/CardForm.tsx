import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Palette, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ColorPicker from './ColorPicker';

function CardForm() {
  const { cardParameters, updateCardParameters, generateCardImage, isGenerating } = useApp();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateCardImage();
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
        <CreditCard className="text-primary-500 h-6 w-6" />
        <h2 className="text-xl font-medium">Card Parameters</h2>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={itemVariants}>
          <label htmlFor="logo" className="label">Company Logo</label>
          <input
            id="logo"
            type="text"
            className="input"
            value={cardParameters.logo}
            onChange={(e) => updateCardParameters({ logo: e.target.value })}
            placeholder="e.g., Tesla logo"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="ticker" className="label">Ticker Symbol</label>
          <input
            id="ticker"
            type="text"
            className="input"
            value={cardParameters.ticker}
            onChange={(e) => updateCardParameters({ ticker: e.target.value })}
            placeholder="e.g., TSLA"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="company_name" className="label">Company Name</label>
          <input
            id="company_name"
            type="text"
            className="input"
            value={cardParameters.company_name}
            onChange={(e) => updateCardParameters({ company_name: e.target.value })}
            placeholder="e.g., Tesla Inc."
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="signature" className="label">Signature (Optional)</label>
          <input
            id="signature"
            type="text"
            className="input"
            value={cardParameters.signature || ''}
            onChange={(e) => updateCardParameters({ signature: e.target.value })}
            placeholder="e.g., Elon Musk"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="card_number" className="label">Card Number</label>
            <input
              id="card_number"
              type="text"
              className="input"
              value={cardParameters.card_number}
              onChange={(e) => updateCardParameters({ card_number: e.target.value })}
              placeholder="e.g., #0006"
              required
            />
          </div>
          
          <div>
            <label htmlFor="year" className="label">Year</label>
            <input
              id="year"
              type="text"
              className="input"
              value={cardParameters.year}
              onChange={(e) => updateCardParameters({ year: e.target.value })}
              placeholder="e.g., 2025"
              required
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="revenue" className="label">Revenue</label>
          <input
            id="revenue"
            type="text"
            className="input"
            value={cardParameters.revenue}
            onChange={(e) => updateCardParameters({ revenue: e.target.value })}
            placeholder="e.g., $96.8B"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-center mb-1">
            <label className="label mb-0">Card Colors</label>
            <button 
              type="button"
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
              className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
            >
              <Palette className="h-4 w-4" />
              <span>{colorPickerOpen ? 'Close' : 'Customize'}</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            {cardParameters.colors.map((color, index) => (
              <div 
                key={index}
                className="w-8 h-8 rounded-full border border-surface-700"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          {colorPickerOpen && (
            <ColorPicker 
              colors={cardParameters.colors}
              onChange={(colors) => updateCardParameters({ colors })}
            />
          )}
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
                <span>Generate Card</span>
              </>
            )}
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default CardForm;