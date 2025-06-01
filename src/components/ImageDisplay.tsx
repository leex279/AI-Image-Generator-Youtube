import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Download, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import TradingCardPreview from './TradingCardPreview';
import BRollPreview from './BRollPreview';
import IconSetPreview from './IconSetPreview';

function ImageDisplay() {
  const { 
    generatedImage, 
    isGenerating, 
    error, 
    generateCardImage, 
    generateBRollImage,
    generateIconSetImage,
    activeGenerator,
    generationHistory 
  } = useApp();

  const handleDownload = () => {
    if (generatedImage) {
      // For base64 images, we need to handle them differently
      if (generatedImage.startsWith('data:image')) {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `${activeGenerator}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // For regular URLs, fetch the image first
        fetch(generatedImage)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${activeGenerator}-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('Error downloading image:', error);
          });
      }
    }
  };

  const handleRetry = () => {
    if (activeGenerator === 'trading-card') {
      generateCardImage();
    } else if (activeGenerator === 'b-roll') {
      generateBRollImage();
    } else if (activeGenerator === 'icon-set') {
      generateIconSetImage();
    }
  };

  const filteredHistory = generationHistory.filter(item => item.type === activeGenerator);

  // Function to render the appropriate preview component
  const renderPreview = () => {
    switch (activeGenerator) {
      case 'trading-card':
        return <TradingCardPreview />;
      case 'b-roll':
        return <BRollPreview />;
      case 'icon-set':
        return <IconSetPreview />;
      default:
        return <TradingCardPreview />;
    }
  };

  // Function to get the appropriate alt text
  const getAltText = (type: string, params: any) => {
    switch (type) {
      case 'trading-card':
        return `Generated card for ${params.company_name}`;
      case 'b-roll':
        return `Generated B-Roll for ${params.topic}`;
      case 'icon-set':
        return `Generated Icon Set for ${params.use_case}`;
      default:
        return 'Generated image';
    }
  };

  // Function to get the appropriate title text for history items
  const getItemTitle = (item: any) => {
    switch (item.type) {
      case 'trading-card':
        return (item.params as any).company_name;
      case 'b-roll':
        return (item.params as any).topic;
      case 'icon-set':
        return (item.params as any).use_case;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        key={`preview-${activeGenerator}`}
      >
        <div className="flex items-center gap-2 mb-6">
          <Image className="text-primary-500 h-6 w-6" />
          <h2 className="text-xl font-medium">Preview</h2>
        </div>

        <div className="aspect-square rounded-lg overflow-hidden relative holographic-effect">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-surface-950/80 backdrop-blur-sm"
              >
                <div className="relative w-24 h-24">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-primary-500/30 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-accent-500/60 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
                </div>
                <p className="mt-4 text-surface-300">Generating amazing AI art...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-surface-950/80 backdrop-blur-sm text-center p-6"
              >
                <AlertCircle className="h-12 w-12 text-error-500 mb-4" />
                <h3 className="text-lg font-medium text-error-400 mb-2">Generation Failed</h3>
                <p className="text-surface-400 max-w-xs mx-auto mb-4">{error}</p>
                <button 
                  className="btn-secondary flex items-center gap-2" 
                  onClick={handleRetry}
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </button>
              </motion.div>
            ) : generatedImage ? (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full"
              >
                <img 
                  src={generatedImage} 
                  alt={`Generated ${activeGenerator}`} 
                  className="w-full h-full object-contain bg-surface-950"
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
                  }}
                />
                <motion.button
                  className="absolute bottom-4 right-4 bg-surface-900/80 backdrop-blur-sm p-2 rounded-full text-primary-400 hover:text-primary-300 transition-colors"
                  onClick={handleDownload}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="h-6 w-6" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex items-center justify-center"
              >
                {renderPreview()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {filteredHistory.length > 0 && (
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          key={`history-${activeGenerator}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-primary-500 h-5 w-5" />
            <h3 className="text-lg font-medium">Recent Generations</h3>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {filteredHistory.slice(0, 8).map((item, index) => (
              <motion.div
                key={item.timestamp}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square rounded-md overflow-hidden relative group cursor-pointer bg-surface-950"
                onClick={() => window.open(item.imageUrl, '_blank')}
              >
                <img 
                  src={item.imageUrl} 
                  alt={getAltText(item.type, item.params)}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
                  <p className="text-xs text-center truncate w-full">
                    {getItemTitle(item)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ImageDisplay;