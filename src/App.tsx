import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CardForm from './components/CardForm';
import BRollForm from './components/BRollForm';
import IconSetForm from './components/IconSetForm';
import ImageDisplay from './components/ImageDisplay';
import SettingsModal from './components/SettingsModal';
import { AppProvider, useApp } from './context/AppContext';
import { AnimatePresence } from 'framer-motion';

function GeneratorContent() {
  const { activeGenerator } = useApp();
  
  let FormComponent;
  switch (activeGenerator) {
    case 'trading-card':
      FormComponent = CardForm;
      break;
    case 'b-roll':
      FormComponent = BRollForm;
      break;
    case 'icon-set':
      FormComponent = IconSetForm;
      break;
    default:
      FormComponent = CardForm;
  }
  
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <FormComponent />
      <ImageDisplay />
    </div>
  );
}

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header onSettingsClick={() => setIsSettingsOpen(true)} />
        <Navigation />
        
        <main className="flex-grow px-4 py-8 md:px-8">
          <GeneratorContent />
        </main>
        
        <footer className="py-6 text-center text-surface-500 text-sm">
          <p>© 2025 AI Image Generator. Built with the OpenAI API.</p>
        </footer>
        
        <AnimatePresence>
          {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}

export default App;