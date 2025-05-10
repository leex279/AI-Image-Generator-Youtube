import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

function IconSetPreview() {
  const { iconSetParameters } = useApp();
  
  // Parse the user's icon list
  const userIcons = iconSetParameters.icons
    .split(',')
    .map(icon => icon.trim())
    .filter(icon => icon.length > 0)
    .slice(0, 9); // Limit to 9 icons for preview
  
  // If no icons provided, use default placeholders
  const iconDisplay = userIcons.length > 0 
    ? userIcons
    : ['home', 'settings', 'profile', 'notification', 'search', 'chat', 'calendar', 'bookmark', 'chart'];
  
  // Emoji mapping for preview
  const iconToEmoji: Record<string, string> = {
    'home': '🏠',
    'house': '🏠',
    'gear': '⚙️',
    'settings': '⚙️',
    'user': '👤',
    'profile': '👤',
    'person': '👤',
    'notification': '🔔',
    'bell': '🔔',
    'alert': '🔔',
    'search': '🔍',
    'magnifier': '🔍',
    'chat': '💬',
    'message': '💬',
    'comment': '💬',
    'calendar': '📅',
    'date': '📅',
    'schedule': '📅',
    'bookmark': '🔖',
    'save': '🔖',
    'chart': '📊',
    'graph': '📊',
    'stats': '📊',
    'cloud': '☁️',
    'heart': '❤️',
    'like': '❤️',
    'star': '⭐',
    'favorite': '⭐',
    'location': '📍',
    'pin': '📍',
    'map': '🗺️',
    'mail': '✉️',
    'email': '✉️',
    'lock': '🔒',
    'secure': '🔒',
    'unlock': '🔓',
    'mic': '🎤',
    'microphone': '🎤',
    'audio': '🔊',
    'sound': '🔊',
    'camera': '📷',
    'photo': '📷',
    'picture': '📷',
    'video': '🎥',
    'film': '🎥',
    'phone': '📱',
    'call': '📞',
    'wifi': '📶',
    'bluetooth': '🔵',
    'battery': '🔋',
    'power': '⚡',
    'download': '⬇️',
    'upload': '⬆️',
    'refresh': '🔄',
    'sync': '🔄',
    'delete': '🗑️',
    'trash': '🗑️',
    'time': '⏰',
    'clock': '⏰',
    'share': '🔗',
    'link': '🔗',
    'copy': '📋',
    'paste': '📋',
    'edit': '✏️',
    'pencil': '✏️',
    'document': '📄',
    'file': '📄',
    'folder': '📁',
    'arrow left': '⬅️',
    'arrow right': '➡️',
    'arrow up': '⬆️',
    'arrow down': '⬇️',
    'plus': '➕',
    'minus': '➖',
    'check': '✅',
    'close': '❌',
    'cart': '🛒',
    'shop': '🛒',
    'tag': '🏷️',
    'price': '🏷️',
    'music': '🎵',
    'note': '🎵',
    'play': '▶️',
    'pause': '⏸️',
    'stop': '⏹️',
    'forward': '⏩',
    'backward': '⏪',
    'volume': '🔊',
    'mute': '🔇',
    'camera': '📷',
    'image': '🖼️',
    'text': '📝',
    'font': '🔤',
    'app': '📱',
    'mobile': '📱',
    'web': '🌐',
    'internet': '🌐',
    'cookie': '🍪',
    'security': '🔒',
    'payment': '💳',
    'credit card': '💳',
    'money': '💰',
    'cash': '💵',
    'wallet': '👛',
    'gift': '🎁',
    'present': '🎁',
    'news': '📰',
    'newspaper': '📰',
    'tasklist': '📋',
    'todo': '📋',
    'list': '📋',
    'ai': '🤖',
    'robot': '🤖',
    'garden': '🌱',
    'plant': '🌱',
    'flower': '🌸'
  };
  
  // Helper function to get emoji for an icon
  const getEmojiForIcon = (iconName: string) => {
    const lowercaseIcon = iconName.toLowerCase();
    return iconToEmoji[lowercaseIcon] || '📌'; // Default emoji if not found
  };
  
  // Helper function to determine style-specific properties
  const getStyleProperties = () => {
    switch (iconSetParameters.style.toLowerCase()) {
      case 'glassmorphic':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          iconEffect: 'glassy',
        };
      case 'neon wireframe':
      case 'holographic':
        return {
          background: 'transparent',
          boxShadow: '0 0 15px rgba(120, 120, 255, 0.6), 0 0 30px rgba(120, 120, 255, 0.3)',
          border: '1px solid rgba(150, 150, 255, 0.5)',
          iconEffect: 'neon',
        };
      case 'cyberpunk':
        return {
          background: 'rgba(30, 10, 60, 0.8)',
          boxShadow: '0 0 15px rgba(255, 50, 150, 0.6), 0 0 30px rgba(0, 200, 255, 0.3)',
          border: '1px solid rgba(255, 100, 100, 0.5)',
          iconEffect: 'cyberpunk',
        };
      case 'minimalist':
      case 'flat 2.0':
        return {
          background: 'rgba(240, 240, 240, 0.1)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
          border: 'none',
          iconEffect: 'flat',
        };
      case 'isometric 3d':
        return {
          background: 'transparent',
          border: 'none',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          iconEffect: 'isometric',
        };
      case 'pixel art':
        return {
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          iconEffect: 'pixel',
        };
      default:
        return {
          background: 'rgba(50, 50, 70, 0.3)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(100, 100, 150, 0.2)',
          iconEffect: 'standard',
        };
    }
  };
  
  // Helper function to determine color scheme
  const getColorScheme = () => {
    switch (iconSetParameters.color_scheme.toLowerCase()) {
      case 'pastel neon':
        return {
          primary: 'rgb(255, 128, 222)',
          secondary: 'rgb(128, 255, 212)',
          accent: 'rgb(255, 230, 128)',
          gradient: 'linear-gradient(45deg, rgba(255, 128, 222, 0.7), rgba(128, 255, 212, 0.7))',
        };
      case 'glassy blues':
        return {
          primary: 'rgb(100, 180, 255)',
          secondary: 'rgb(80, 130, 240)',
          accent: 'rgb(200, 230, 255)',
          gradient: 'linear-gradient(45deg, rgba(100, 180, 255, 0.7), rgba(80, 130, 240, 0.7))',
        };
      case 'monochrome':
      case 'grayscale':
        return {
          primary: 'rgb(200, 200, 200)',
          secondary: 'rgb(150, 150, 150)',
          accent: 'rgb(230, 230, 230)',
          gradient: 'linear-gradient(45deg, rgba(200, 200, 200, 0.7), rgba(150, 150, 150, 0.7))',
        };
      case 'vibrant contrast':
        return {
          primary: 'rgb(255, 65, 65)',
          secondary: 'rgb(65, 105, 255)',
          accent: 'rgb(255, 215, 65)',
          gradient: 'linear-gradient(45deg, rgba(255, 65, 65, 0.7), rgba(65, 105, 255, 0.7))',
        };
      case 'retro vaporwave':
        return {
          primary: 'rgb(255, 100, 180)',
          secondary: 'rgb(100, 200, 255)',
          accent: 'rgb(180, 100, 255)',
          gradient: 'linear-gradient(45deg, rgba(255, 100, 180, 0.7), rgba(100, 200, 255, 0.7))',
        };
      case 'dark mode palette':
        return {
          primary: 'rgb(80, 90, 120)',
          secondary: 'rgb(50, 55, 80)',
          accent: 'rgb(100, 130, 230)',
          gradient: 'linear-gradient(45deg, rgba(80, 90, 120, 0.7), rgba(50, 55, 80, 0.7))',
        };
      default:
        return {
          primary: 'rgb(100, 150, 220)',
          secondary: 'rgb(70, 90, 180)',
          accent: 'rgb(160, 210, 255)',
          gradient: 'linear-gradient(45deg, rgba(100, 150, 220, 0.7), rgba(70, 90, 180, 0.7))',
        };
    }
  };
  
  const styleProps = getStyleProperties();
  const colorScheme = getColorScheme();
  
  // Calculate grid columns based on number of icons
  const getGridColumns = () => {
    const count = iconDisplay.length;
    if (count <= 4) return 2;
    if (count <= 9) return 3;
    return 4;
  };
  
  // Apply icon effect based on style
  const getIconStyles = (index: number) => {
    const baseStyles = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      borderRadius: styleProps.iconEffect === 'pixel' ? '0' : '12px',
      position: 'relative' as 'relative',
      overflow: 'hidden',
    };
    
    // Apply different effects based on the selected style
    switch (styleProps.iconEffect) {
      case 'glassy':
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        };
      case 'neon':
        return {
          ...baseStyles,
          background: 'rgba(20, 20, 40, 0.4)',
          boxShadow: `0 0 10px ${colorScheme.primary}, 0 0 20px rgba(100, 100, 255, 0.3)`,
          border: `1px solid ${colorScheme.primary}80`,
        };
      case 'cyberpunk':
        return {
          ...baseStyles,
          background: 'rgba(30, 10, 40, 0.7)',
          border: '1px solid rgba(255, 100, 150, 0.5)',
          boxShadow: `0 0 10px ${colorScheme.primary}, 0 0 20px ${colorScheme.secondary}`,
          clipPath: index % 2 === 0 
            ? 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)' 
            : 'polygon(0 0, 100% 10%, 100% 100%, 0 90%)',
        };
      case 'flat':
        return {
          ...baseStyles,
          background: index % 3 === 0 
            ? colorScheme.primary 
            : index % 3 === 1 
              ? colorScheme.secondary 
              : colorScheme.accent,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        };
      case 'isometric':
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.1)',
          transform: 'perspective(500px) rotateX(15deg) rotateY(-15deg)',
          boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
        };
      case 'pixel':
        return {
          ...baseStyles,
          imageRendering: 'pixelated' as 'pixelated',
        };
      default:
        return {
          ...baseStyles,
          background: 'rgba(50, 50, 70, 0.3)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        };
    }
  };

  return (
    <div className="w-full h-full relative bg-surface-950 rounded-lg overflow-hidden flex items-center justify-center p-6">
      {/* Background effect based on style and color scheme */}
      <div className="absolute inset-0 opacity-40" style={{ 
        background: colorScheme.gradient
      }}></div>
      
      {/* Grid container for icons */}
      <motion.div 
        className="relative w-full max-w-[90%] aspect-square rounded-lg overflow-hidden"
        style={{
          background: styleProps.background,
          boxShadow: styleProps.boxShadow,
          border: styleProps.border,
          backdropFilter: styleProps.backdropFilter,
        }}
      >
        {/* Optional scan lines effect */}
        {['cyberpunk', 'neon', 'holographic'].includes(styleProps.iconEffect) && (
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)',
            mixBlendMode: 'overlay',
          }}></div>
        )}
        
        {/* Grid layout */}
        <div 
          className={`grid gap-4 p-6 h-full w-full`}
          style={{ gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)` }}
        >
          {iconDisplay.map((icon, index) => (
            <motion.div
              key={icon}
              style={getIconStyles(index)}
              animate={styleProps.iconEffect === 'neon' ? {
                boxShadow: [
                  `0 0 5px ${colorScheme.primary}80, 0 0 10px ${colorScheme.secondary}40`,
                  `0 0 10px ${colorScheme.primary}90, 0 0 20px ${colorScheme.secondary}60`,
                  `0 0 5px ${colorScheme.primary}80, 0 0 10px ${colorScheme.secondary}40`,
                ]
              } : {}}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'reverse' 
              }}
            >
              {/* Icon placeholder */}
              <span className="text-2xl">{getEmojiForIcon(icon)}</span>
              
              {/* Icon label */}
              <div className="absolute bottom-1 left-0 right-0 text-center text-xs font-medium opacity-80">
                {icon}
              </div>
              
              {/* Gloss effect for glassy style */}
              {styleProps.iconEffect === 'glassy' && (
                <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-10"></div>
              )}
              
              {/* Grid effect for certain styles */}
              {['cyberpunk', 'futuristic'].includes(styleProps.iconEffect) && (
                <div className="absolute inset-0 z-0 opacity-10" style={{
                  backgroundImage: `radial-gradient(circle, ${colorScheme.accent}20 1px, transparent 1px)`,
                  backgroundSize: '8px 8px',
                }}></div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Overlay text showing parameters */}
        <div className="absolute bottom-2 right-2 text-xs bg-surface-900/60 backdrop-blur-sm px-2 py-1 rounded">
          {iconSetParameters.use_case} · {iconSetParameters.style}
        </div>
      </motion.div>
    </div>
  );
}

export default IconSetPreview;