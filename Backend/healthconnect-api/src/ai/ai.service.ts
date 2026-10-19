import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async getAppointmentResponse(userQuery: string, slots: string[]): Promise<string> {
    try {
      const prompt = `You are a helpful medical clinic assistant. User query: "${userQuery}". Available appointment slots: ${slots.join(', ')}. Recommend the best slot politely.`;
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return response.text || 'No response generated.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException(`AI Appointment Error: ${(error as any).message}`);
    }
  }

  async matchInternshipAndReviewCv(cvText: string): Promise<string> {
    try {
      const prompt = `You are an expert career consultant for student internships. Review the following student CV, provide improvement feedback, and suggest suitable tech internship roles:\n\n${cvText}`;
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return response.text || 'No analysis generated.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException(`AI CV Analysis Error: ${(error as any).message}`);
    }
  }
}