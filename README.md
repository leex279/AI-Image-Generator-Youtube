# AI Image Generator

A powerful and versatile AI image generation tool built with React and TypeScript that creates stunning visuals in three different categories:

- Trading Cards: Generate futuristic, holographic trading cards for companies
- B-Roll: Create professional B-roll footage for video content
- Icon Sets: Design cohesive icon sets with various styles and themes

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
git clone <repository-url>
cd ai-image-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_OPENAI_API_ENDPOINT=https://api.openai.com/v1/images/generations
VITE_USE_WEBHOOK=false
VITE_WEBHOOK_URL=your-webhook-url
```

4. Start the development server:
```bash
npm run dev
```

## Configuration

### OpenAI API
By default, the application uses the OpenAI API directly. You'll need to:
1. Create an OpenAI account
2. Get an API key from the OpenAI dashboard
3. Add your API key in the application settings

### Webhook Mode
Alternatively, you can use a custom webhook:
1. Set `VITE_USE_WEBHOOK=true` in `.env`
2. Set `VITE_WEBHOOK_URL` to your webhook endpoint
3. Ensure your webhook handles the following request format:
```json
{
  "type": "tradingcard|broll|iconset",
  "parameters": {
    // Generator-specific parameters
  },
  "colorsString": "color1 to color2",
  "openai_image_model": "gpt-image-1",
  "number_of_images": 1,
  "size_of_image": "1024x1024",
  "quality_of_image": "high"
}
```

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

## License

MIT License - See LICENSE file for details