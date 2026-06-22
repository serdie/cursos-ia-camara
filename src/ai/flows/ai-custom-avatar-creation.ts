'use server';

import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

export interface AiCustomAvatarCreationInput {
  description: string;
}

export interface AiCustomAvatarCreationOutput {
  avatarImage: string;
}

export async function aiCustomAvatarCreation(input: AiCustomAvatarCreationInput): Promise<AiCustomAvatarCreationOutput> {
  try {
    const prompt = `Genera una imagen de un avatar digital basado en esta descripción: ${input.description}.
El avatar debe tener un estilo profesional y moderno, adecuado para un entorno educativo de IA.
Estilo: ilustración digital, colores vibrantes, fondo limpio.`;

    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: prompt,
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    const text = result.text;
    if (text) {
      const urlMatch = text.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        return { avatarImage: urlMatch[0] };
      }
    }

    return { avatarImage: '' };
  } catch (error) {
    console.error('Error in aiCustomAvatarCreation:', error);
    throw new Error('No se pudo generar el avatar. Por favor, inténtalo de nuevo.');
  }
}
