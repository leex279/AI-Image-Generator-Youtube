import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CardParameters, BRollParameters, IconSetParameters, GeneratorType } from '../types';
import { generateImage, generateBRollImage, generateIconSetImage } from '../services/api';

interface AppContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  activeGenerator: GeneratorType;
  setActiveGenerator: (generator: GeneratorType) => void;
  
  // Trading Card Generator
  cardParameters: CardParameters;
  updateCardParameters: (params: Partial<CardParameters>) => void;
  
  // B-Roll Generator
  bRollParameters: BRollParameters;
  updateBRollParameters: (params: Partial<BRollParameters>) => void;
  
  // Icon Set Generator
  iconSetParameters: IconSetParameters;
  updateIconSetParameters: (params: Partial<IconSetParameters>) => void;
  
  // Shared state
  generatedImage: string | null;
  isGenerating: boolean;
  error: string | null;
  generateCardImage: () => Promise<void>;
  generateBRollImage: () => Promise<void>;
  generateIconSetImage: () => Promise<void>;
  generationHistory: Array<{
    type: GeneratorType;
    params: CardParameters | BRollParameters | IconSetParameters;
    imageUrl: string;
    timestamp: number;
  }>;
}

const defaultCardParameters: CardParameters = {
  logo: 'Tesla logo',
  ticker: 'TSLA',
  company_name: 'Tesla Inc.',
  card_number: '#0006',
  revenue: '$96.8B',
  year: '2025',
  colors: ['red', 'white', 'dark gray'],
  signature: '',
};

const defaultBRollParameters: BRollParameters = {
  topic: 'machine learning',
  style: 'cinematic',
  palette: 'dark neon blues',
};

const defaultIconSetParameters: IconSetParameters = {
  use_case: 'app UI',
  style: 'Glassmorphic',
  color_scheme: 'glassy blues',
  custom_instructions: 'Include slight glass reflections on each icon',
  icons: 'home, gear, cloud, tasklist, heart, user, message, bell',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const USE_WEBHOOK = import.meta.env.VITE_USE_WEBHOOK === 'true';

export function AppProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string>(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    return savedKey || '';
  });
  
  const [activeGenerator, setActiveGenerator] = useState<GeneratorType>('trading-card');
  const [cardParameters, setCardParameters] = useState<CardParameters>(defaultCardParameters);
  const [bRollParameters, setBRollParameters] = useState<BRollParameters>(defaultBRollParameters);
  const [iconSetParameters, setIconSetParameters] = useState<IconSetParameters>(defaultIconSetParameters);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationHistory, setGenerationHistory] = useState<AppContextType['generationHistory']>([]);

  const updateCardParameters = (params: Partial<CardParameters>) => {
    setCardParameters(prev => ({ ...prev, ...params }));
  };

  const updateBRollParameters = (params: Partial<BRollParameters>) => {
    setBRollParameters(prev => ({ ...prev, ...params }));
  };
  
  const updateIconSetParameters = (params: Partial<IconSetParameters>) => {
    setIconSetParameters(prev => ({ ...prev, ...params }));
  };

  const generateCardImage = async () => {
    if (!USE_WEBHOOK && !apiKey) {
      setError('Please set your OpenAI API key in settings');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateImage(apiKey, cardParameters);
      setGeneratedImage(imageUrl);
      
      setGenerationHistory(prev => [
        {
          type: 'trading-card',
          params: { ...cardParameters },
          imageUrl,
          timestamp: Date.now(),
        },
        ...prev.slice(0, 9),
      ]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBRollImageHandler = async () => {
    if (!USE_WEBHOOK && !apiKey) {
      setError('Please set your OpenAI API key in settings');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateBRollImage(apiKey, bRollParameters);
      setGeneratedImage(imageUrl);
      
      setGenerationHistory(prev => [
        {
          type: 'b-roll',
          params: { ...bRollParameters },
          imageUrl,
          timestamp: Date.now(),
        },
        ...prev.slice(0, 9),
      ]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateIconSetImageHandler = async () => {
    if (!USE_WEBHOOK && !apiKey) {
      setError('Please set your OpenAI API key in settings');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateIconSetImage(apiKey, iconSetParameters);
      setGeneratedImage(imageUrl);
      
      setGenerationHistory(prev => [
        {
          type: 'icon-set',
          params: { ...iconSetParameters },
          imageUrl,
          timestamp: Date.now(),
        },
        ...prev.slice(0, 9),
      ]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openai_api_key', apiKey);
    }
  }, [apiKey]);

  React.useEffect(() => {
    setGeneratedImage(null);
    setError(null);
  }, [activeGenerator]);

  const value = {
    apiKey,
    setApiKey,
    activeGenerator,
    setActiveGenerator,
    cardParameters,
    updateCardParameters,
    bRollParameters,
    updateBRollParameters,
    iconSetParameters,
    updateIconSetParameters,
    generatedImage,
    isGenerating,
    error,
    generateCardImage,
    generateBRollImage: generateBRollImageHandler,
    generateIconSetImage: generateIconSetImageHandler,
    generationHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}