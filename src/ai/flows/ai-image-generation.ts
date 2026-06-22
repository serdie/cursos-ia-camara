'use server';

export interface AiImageGenerationInput {
  prompt: string;
}

export interface AiImageGenerationOutput {
  imageUrl: string;
}

export async function aiImageGeneration(input: AiImageGenerationInput): Promise<AiImageGenerationOutput> {
  try {
    const encodedPrompt = encodeURIComponent(input.prompt);
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=1024&height=1024&nologo=true`;

    const response = await fetch(imageUrl, { method: 'HEAD' });

    if (!response.ok) {
      throw new Error('No se pudo generar la imagen.');
    }

    return { imageUrl };
  } catch (error) {
    console.error('Error in aiImageGeneration:', error);
    if (error instanceof Error && error.message.includes('content filter')) {
      throw new Error('La imagen fue bloqueada por el filtro de contenido. Prueba con otra descripción.');
    }
    throw new Error('No se pudo generar la imagen. Por favor, inténtalo de nuevo.');
  }
}

export const generateCourseImage = aiImageGeneration;
