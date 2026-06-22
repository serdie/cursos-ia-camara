'use server';

import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

export interface AiContentQASupportInput {
  courseContent: string;
  studentQuestion: string;
}

export interface AiContentQASupportOutput {
  answer: string;
}

export async function aiContentQASupport(input: AiContentQASupportInput): Promise<AiContentQASupportOutput> {
  try {
    const prompt = `Eres un tutor educativo de IA del curso de Inteligencia Artificial de la Cámara de Comercio de Toledo.
Un alumno ha hecho una pregunta sobre el contenido de un módulo. Tu tarea es responder de forma clara y educativa.

Instrucciones:
- Responde SIEMPRE en español de España (castellano formal).
- Responde ÚNICAMENTE basándote en el contenido del módulo proporcionado.
- Si la pregunta no está relacionada con el contenido, indica amablemente que solo puedes responder sobre el módulo.
- Usa un lenguaje accesible para adultos de 18 a 59 años.
- Sé conciso pero completo. No superes las 300 palabras.
- Si es útil, usa ejemplos prácticos relacionados con el mundo empresarial.

Contenido del Módulo:
${input.courseContent}

Pregunta del alumno:
${input.studentQuestion}

Respuesta:`;

    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: prompt,
    });

    return { answer: result.text || 'No se pudo generar una respuesta.' };
  } catch (error) {
    console.error('Error in aiContentQASupport:', error);
    throw new Error('No se pudo obtener una respuesta. Por favor, inténtalo de nuevo.');
  }
}
