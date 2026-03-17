/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  return process.env.API_KEY || localStorage.getItem('GEMINI_API_KEY');
};

const getAi = () => new GoogleGenAI({ apiKey: getApiKey() || 'dummy_key' });

export type StatusUpdateCallback = (message: string) => void;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const dataUrlToBase64 = (dataUrl: string): { data: string; mimeType: string } => {
  const [header, data] = dataUrl.split(',');
  const mimeType = header.split(':')[1].split(';')[0];
  return { data, mimeType };
};

const isRetryableError = (error: any): boolean => {
  const msg = typeof error?.message === 'string' ? error.message : JSON.stringify(error);
  return (
    msg.includes('"code":503') ||
    msg.includes('"code":500') ||
    msg.includes('"code":429') ||
    msg.includes('429') ||
    msg.includes('503') ||
    msg.includes('fetch failed') ||
    msg.includes('xhr error')
  );
};

const withRetry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  initialDelay = 1000,
  onStatusUpdate?: StatusUpdateCallback,
  actionName = 'Edit'
): Promise<T> => {
  let lastError: any;
  let currentDelay = initialDelay;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (isRetryableError(error)) {
        if (onStatusUpdate) onStatusUpdate(`Retrying ${actionName} (${i + 1}/${retries})...`);
        await delay(currentDelay);
        currentDelay *= 2;
      } else {
        throw error;
      }
    }
  }
  throw lastError;
};

/**
 * Retouch an image at a specific point using a text description.
 * xPct and yPct are percentages (0–100) of the image dimensions.
 */
export const retouchImageAtPoint = async (
  imageDataUrl: string,
  prompt: string,
  xPct: number,
  yPct: number,
  onStatusUpdate?: StatusUpdateCallback
): Promise<string> => {
  const { data, mimeType } = dataUrlToBase64(imageDataUrl);
  const ai = getAi();

  const instruction = `Edit this photo. Focus specifically on the area located at approximately ${Math.round(xPct)}% from the left and ${Math.round(yPct)}% from the top of the image. Apply this change to that area only: ${prompt}. Do NOT alter any other part of the image. Preserve the original composition, lighting and overall style. Output the complete image.`;

  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          { inlineData: { data, mimeType } },
          { text: instruction },
        ],
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if ((part as any).inlineData) {
          const inlineData = (part as any).inlineData;
          return `data:${inlineData.mimeType || 'image/png'};base64,${inlineData.data}`;
        }
      }
    }
    throw new Error('No image returned from API');
  }, 3, 1500, onStatusUpdate, 'Retouch');
};

/**
 * Apply a global transformation (filter or adjustment) to the entire image.
 */
export const transformImage = async (
  imageDataUrl: string,
  instruction: string,
  onStatusUpdate?: StatusUpdateCallback
): Promise<string> => {
  const { data, mimeType } = dataUrlToBase64(imageDataUrl);
  const ai = getAi();

  const fullInstruction = `${instruction} Do not change the composition, subjects, or content of the image — only apply the requested visual transformation. Output the complete edited image.`;

  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          { inlineData: { data, mimeType } },
          { text: fullInstruction },
        ],
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if ((part as any).inlineData) {
          const inlineData = (part as any).inlineData;
          return `data:${inlineData.mimeType || 'image/png'};base64,${inlineData.data}`;
        }
      }
    }
    throw new Error('No image returned from API');
  }, 3, 1500, onStatusUpdate, 'Transform');
};
