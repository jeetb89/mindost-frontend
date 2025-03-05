# MindDost - AI Therapy Companion

MindDost is an AI-powered therapy companion that provides emotional support and guidance through text and voice interactions.

## Features

- Text-based chat with AI therapist
- Voice conversations with speech-to-text and text-to-speech
- Emotion analysis and language detection
- Multi-language support (English and Hindi)
- Modern, responsive UI

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- OpenAI GPT-4 & Whisper API
- Vercel Deployment

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment to Vercel

1. Push your code to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Add the following environment variable in Vercel:
   - `OPENAI_API_KEY`: Your OpenAI API key
5. Deploy!

## Environment Variables

The following environment variables are required:

- `OPENAI_API_KEY`: Your OpenAI API key for GPT-4, Whisper, and TTS services

## License

MIT 