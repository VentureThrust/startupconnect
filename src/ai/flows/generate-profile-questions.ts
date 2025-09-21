'use server';
/**
 * @fileOverview Generates questions for user profile creation.
 *
 * - generateProfileQuestions - A function that returns a list of questions.
 * - GenerateProfileQuestionsOutput - The return type for the generateProfileQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('A list of 5 questions to ask the user to build their profile.'),
});

export type GenerateProfileQuestionsOutput = z.infer<typeof GenerateProfileQuestionsOutputSchema>;

export async function generateProfileQuestions(): Promise<GenerateProfileQuestionsOutput> {
  return generateProfileQuestionsFlow();
}

const prompt = ai.definePrompt({
  name: 'generateProfileQuestionsPrompt',
  output: {schema: GenerateProfileQuestionsOutputSchema},
  prompt: `You are an expert startup matchmaker. You need to create a user profile to match them with projects.

Generate a list of 5 questions to ask the user to build their profile. The questions should cover:
1. Their startup's name.
2. A short pitch for their startup.
3. Their key skills.
4. Their professional experience.
5. Details about the product they are building.

Return the questions as a JSON object with a "questions" array.
`,
});

const generateProfileQuestionsFlow = ai.defineFlow(
  {
    name: 'generateProfileQuestionsFlow',
    outputSchema: GenerateProfileQuestionsOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
