import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
  
  const updateColor = (colorIndex: number, newColor: string) => {
    const newColors = [...colors];
    newColors[colorIndex] = newColor;
    onChange(newColors);
  };
  
  const addColor = () => {
    if (colors.length < 5) { // Limit to 5 colors
      onChange([...colors, '#ffffff']);
    }
  };
  
  const removeColor = (index: number) => {
    if (colors.length > 1) { // Keep at least one color
      const newColors = colors.filter((_, i) => i !== index);
      onChange(newColors);
      setSelectedColorIndex(null);
    }
  };

  return (
    <div className="glass p-4 mb-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {colors.map((color, index) => (
          <div key={index} className="relative">
            <button
              type="button"
              className={`w-10 h-10 rounded-md transition-all duration-200 ${selectedColorIndex === index ? 'ring-2 ring-white' : 'ring-1 ring-surface-700'}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColorIndex(index === selectedColorIndex ? null : index)}
            />
            {colors.length > 1 && (
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-surface-800 rounded-full p-0.5 text-surface-400 hover:text-error-400"
                onClick={() => removeColor(index)}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        
        {colors.length < 5 && (
          <button
            type="button"
            className="w-10 h-10 rounded-md border border-dashed border-surface-600 flex items-center justify-center text-surface-500 hover:text-surface-300 hover:border-surface-500 transition-colors"
            onClick={addColor}
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {selectedColorIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-3"
          >
            <SketchPicker
              color={colors[selectedColorIndex]}
              onChange={(color) => updateColor(selectedColorIndex, color.hex)}
              width="100%"
              presetColors={[
                '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', 
                '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', 
                '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF'
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ColorPicker;