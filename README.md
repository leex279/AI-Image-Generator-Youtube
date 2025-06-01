# AI Image Generator

A powerful and versatile AI image generation tool built with React and TypeScript that creates stunning visuals in three different categories:

- Trading Cards: Generate futuristic, holographic trading cards for companies
- B-Roll: Create professional B-roll footage for video content
- Icon Sets: Design cohesive icon sets with various styles and themes

## 📺 DIY SmartCode YouTube Channel

This project is part of the educational content created for the DIY SmartCode YouTube channel. For more tutorials, projects, and tech content:

- YouTube: [DIY SmartCode](https://www.youtube.com/@DIYSmartCode)
- Support the Channel: [Buy Me a Coffee](https://buymeacoffee.com/diy_smartcode)

By supporting the channel, you help create more educational content and open-source projects like this one!

## Features

### Trading Card Generator
- Custom company logos with dynamic coloring
- Ticker symbol and signature support
- Revenue and year customization
- Holographic effects and premium design
- Real-time preview with interactive elements

### B-Roll Generator
- Topic-based content generation
- Multiple visual styles (cinematic, minimal, abstract, etc.)
- Custom color palette selection
- Optimized for 1:1 aspect ratio
- Perfect for YouTube Shorts and Instagram

### Icon Set Generator
- Multiple icon generation in a single grid
- 10+ design styles (Holographic, Futuristic, Minimalist, etc.)
- Custom color schemes
- Use-case specific optimization
- Real-time preview with interactive grid

### General Features
- Real-time previews for all generators
- Generation history with thumbnails
- Download generated images
- Dark mode interface
- Responsive design
- Settings management

## Setup

1. Clone the repository:
```bash
git clone https://github.com/leex279/AI-Image-Generator-Youtube.git
cd AI-Image-Generator-Youtube
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_OPENAI_API_ENDPOINT=https://api.openai.com/v1/images/generations
```

4. Start the development server:
```bash
npm run dev
```

## Configuration

### OpenAI API
You'll need to:
1. Create an OpenAI account
2. Get an API key from the OpenAI dashboard
3. Add your API key in the application settings

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Development

### Project Structure
```
src/
  ├── components/     # React components
  ├── context/       # React context providers
  ├── services/      # API and service functions
  ├── types/         # TypeScript type definitions
  └── styles/        # Global styles and Tailwind config
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Contributing

If you find this project helpful, consider:
1. Subscribing to [DIY SmartCode](https://www.youtube.com/@DIYSmartCode) for more content
2. Supporting the channel via [Buy Me a Coffee](https://buymeacoffee.com/diy_smartcode)
3. Sharing the project with others

## License

MIT License - See LICENSE file for details