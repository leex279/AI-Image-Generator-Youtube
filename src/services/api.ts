import { CardParameters, BRollParameters, IconSetParameters } from '../types';

const OPENAI_API_ENDPOINT = import.meta.env.VITE_OPENAI_API_ENDPOINT;

export async function generateImage(
  apiKey: string, 
  parameters: CardParameters
): Promise<string> {
  try {
    const useWebhook = localStorage.getItem('use_webhook') === 'true';
    const webhookUrl = localStorage.getItem('webhook_url');

    if (useWebhook) {
      return await generateImageViaWebhook('tradingcard', parameters);
    } else {
      return await generateImageViaOpenAI(apiKey, buildPrompt(parameters));
    }
  } catch (error) {
    console.error('Error generating image:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the image generation service. Please check your internet connection and try again.');
    }
    throw error;
  }
}

export async function generateBRollImage(
  apiKey: string,
  parameters: BRollParameters
): Promise<string> {
  try {
    const useWebhook = localStorage.getItem('use_webhook') === 'true';
    const webhookUrl = localStorage.getItem('webhook_url');

    if (useWebhook) {
      return await generateImageViaWebhook('broll', parameters);
    } else {
      return await generateImageViaOpenAI(apiKey, buildBRollPrompt(parameters));
    }
  } catch (error) {
    console.error('Error generating B-Roll image:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the image generation service. Please check your internet connection and try again.');
    }
    throw error;
  }
}

export async function generateIconSetImage(
  apiKey: string,
  parameters: IconSetParameters
): Promise<string> {
  try {
    const useWebhook = localStorage.getItem('use_webhook') === 'true';
    const webhookUrl = localStorage.getItem('webhook_url');

    if (useWebhook) {
      return await generateImageViaWebhook('iconset', parameters);
    } else {
      return await generateImageViaOpenAI(apiKey, buildIconSetPrompt(parameters));
    }
  } catch (error) {
    console.error('Error generating icon set:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the image generation service. Please check your internet connection and try again.');
    }
    throw error;
  }
}

async function generateImageViaWebhook(type: string, parameters: any): Promise<string> {
  const webhookUrl = localStorage.getItem('webhook_url');
  
  if (!webhookUrl) {
    throw new Error('Webhook URL not configured. Please check your settings.');
  }

  const colorsString = Array.isArray(parameters.colors) 
    ? parameters.colors.join(' to ') 
    : 'blue to purple';

  const requestData = {
    type,
    parameters,
    colorsString,
    openai_image_model: "gpt-image-1",
    number_of_images: 1,
    size_of_image: "1024x1024",
    quality_of_image: "high"
  };

  console.log('Webhook request:', {
    url: webhookUrl,
    data: requestData
  });

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    console.log('Webhook response status:', response.status);
    console.log('Webhook response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook error response:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        console.warn('Failed to parse error response as JSON:', e);
      }

      throw new Error(
        errorData?.error?.message || 
        `Failed to generate image: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get('content-type');
    console.log('Response content type:', contentType);

    let data;
    if (contentType?.includes('application/json')) {
      data = await response.json();
      console.log('Webhook response data:', data);
    } else {
      const text = await response.text();
      console.log('Webhook response text:', text);
      try {
        data = JSON.parse(text);
        console.log('Parsed non-JSON response:', data);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid response format from webhook');
      }
    }
    
    if (!data) {
      throw new Error('Empty response from webhook');
    }

    // Check for different response formats
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      if (data.data[0].url) {
        return data.data[0].url;
      } else if (data.data[0].b64_json) {
        return `data:image/png;base64,${data.data[0].b64_json}`;
      }
    } else if (data.url) {
      return data.url;
    } else if (data.b64_json) {
      return `data:image/png;base64,${data.b64_json}`;
    } else if (Array.isArray(data) && data.length > 0) {
      if (data[0].url) {
        return data[0].url;
      } else if (data[0].b64_json) {
        return `data:image/png;base64,${data[0].b64_json}`;
      }
    }

    console.error('Unexpected webhook response format:', data);
    throw new Error('No image data found in webhook response');
  } catch (error) {
    console.error('Webhook error:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network Error: Unable to connect to the webhook. Please check your internet connection.');
    }
    throw error;
  }
}

async function generateImageViaOpenAI(apiKey: string, prompt: string): Promise<string> {
  try {
    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `Failed to generate image: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data) {
      throw new Error('Empty response from OpenAI API');
    }

    let imageUrl = null;

    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      if (data.data[0].url) {
        imageUrl = data.data[0].url;
      } else if (data.data[0].b64_json) {
        imageUrl = `data:image/png;base64,${data.data[0].b64_json}`;
      }
    } else if (data.url) {
      imageUrl = data.url;
    }

    if (!imageUrl) {
      console.error('Unable to find image URL in response:', data);
      throw new Error('No image URL found in API response');
    }

    return imageUrl;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network Error: Unable to connect to the OpenAI API. Please check your internet connection.');
    }
    throw error;
  }
}

function buildPrompt(parameters: CardParameters): string {
  const colorsString = parameters.colors.join(', ');
  
  return `A futuristic trading card with a dark, moody neon aesthetic and soft sci-fi lighting. The card features a semi-transparent, rounded rectangle with slightly muted glowing edges, appearing as if made of holographic glass. The surface has subtle reflections and a faint gloss, with light motion blur applied to edges and highlights to create a sense of energy and depth. At the center is a large glowing logo of ${parameters.logo}, rendered with a smooth gradient of ${colorsString}—visibly radiant but not overpoweringly bright.

The background is composed of a dark carbon fiber texture or a deep gradient (e.g., graphite black to indigo), with soft ambient glows bleeding into the card edges. Subtle diagonal light rays stream downward from the top, giving the entire scene a cinematic glow.

Below the card, a realistic reflective floor mirrors the neon edges and central logo with a slightly diffused effect, grounding the card in a futuristic space.

Text elements are minimal, premium, and softly lit:

Top-left: '${parameters.ticker}'

Top-right: ${parameters.signature ? `a stylized signature '${parameters.signature}'` : 'a digital glyph'}

Bottom: '${parameters.company_name}' along with serial number '${parameters.card_number}', a revenue badge displaying '${parameters.revenue}', and the year '${parameters.year}'

Typography is elegant, with a faint glow and soft blur—evoking a high-end cyberpunk collectible. Include floating particles, faint scanlines, and a subtle holographic watermark to enhance the sci-fi premium vibe.`;
}

function buildBRollPrompt(parameters: BRollParameters): string {
  return `Create stunning, premium B-Roll material designed for YouTube videos centered around ${parameters.topic}, with a focus on artificial intelligence, technology, and educational content. The footage should be crafted specifically for a 1:1 aspect ratio, optimized for modern platforms like YouTube Shorts or Instagram.

The overall aesthetic is ${parameters.style} (e.g., cinematic, minimal, abstract, corporate, retro-futuristic), with consistent visual tone and high production value. The scenes should be visually engaging but non-distracting, intended to support narration or educational overlays.

Include visuals such as:

Abstract representations of AI, data processing, or neural networks

Futuristic user interfaces, HUDs, floating data streams

Close-up shots of servers, circuit boards, microchips, robotic elements

Hands typing on glowing keyboards, interacting with AR/VR or holo-interfaces

Digital code or data flow overlays, macro hardware details

Minimal human-tech interaction scenes to maintain relatability

Apply slow motion pans, smooth rack focus shifts, macro details, and subtle parallax to add cinematic depth. Use soft ambient lighting with occasional rim lights, backlighting, or practical glow from tech devices. Add floating particles, slight motion blur, and soft transitions between scenes. Optionally, include loopable background elements or subtle animated effects like code flickering, glowing lines, or light rays.

The background and color grading should reflect ${parameters.palette} (e.g., dark neon blues, clean grayscale tones, synthwave colors), with lighting effects that match the selected style.

Final output must be:

1:1 aspect ratio (square)

High resolution (ideally 4K or higher)

Smooth and stable footage

Muted or no audio

Filename and folder structure organized by topic

All visuals must appear modern, premium, and professional—ideal for use in high-end educational or explanatory tech content.`;
}

function buildIconSetPrompt(parameters: IconSetParameters): string {
  return `Create a cohesive and visually stunning set of icons within a single image, laid out in a grid. The icons should be for: ${parameters.icons}. All icons should be consistent in form, lighting, and design, optimized for ${parameters.use_case} (e.g., app UI, web dashboard, game HUD, infographic, operating system). Each icon should be centered within its grid cell, clean, and easy to recognize at a glance.

The overall icon design style is ${parameters.style}, selected from the following options:

Holographic

Futuristic

Minimalist

Glassmorphic

Pixel Art

Cyberpunk

Isometric 3D

Flat 2.0

Skeuomorphic

Neon Wireframe

Apply the chosen aesthetic consistently across all icons. Icons should feature smooth edges, scalable design logic, and depth or lighting consistent with the style. The icons should appear premium and modern, fitting seamlessly into high-end UI/UX environments.

Color palette is based on ${parameters.color_scheme} (e.g., pastel neon, glassy blues, monochrome, vibrant contrast, retro vaporwave, grayscale, dark mode palette). Use accent colors sparingly but effectively, ensuring high readability and visual balance.

For each icon:

The name of the icon should be displayed underneath it

Each icon should be clearly separated from others in the grid layout

All icons should follow these guidelines:
- Be centered and clean with adequate spacing
- Match the chosen theme and color scheme
- Have no background or a soft ambient glow depending on style
- Feature lighting and shadows that add subtle depth (if style allows)

Include the following custom instructions from the user:
${parameters.custom_instructions}

Create this as a single image showing all icons in a grid layout. The entire image should feel cohesive, modern, and professional—suitable for futuristic interfaces or themed UI sets.`;
}