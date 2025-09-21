'use server';
/**
 * @fileOverview Matches user skills to project requirements.
 *
 * - matchSkillsToProjects - A function that matches skills to projects.
 * - MatchSkillsToProjectsInput - The input type for the matchSkillsToProjects function.
 * - MatchSkillsToProjectsOutput - The return type for the matchSkillsToProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchSkillsToProjectsInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The description of the project seeking collaborators.'),
  requiredSkills: z.array(z.string()).describe('A list of skills required for the project.'),
  userSkills: z.array(z.string()).describe('A list of skills the user has.'),
});

export type MatchSkillsToProjectsInput = z.infer<typeof MatchSkillsToProjectsInputSchema>;

const MatchSkillsToProjectsOutputSchema = z.object({
  isMatch: z
    .boolean()
    .describe(
      'Whether the user skills match the project requirements. True if there is a good match, false otherwise.'
    ),
  matchReason: z.string().describe('The reason why the user skills match the project requirements.'),
});

export type MatchSkillsToProjectsOutput = z.infer<typeof MatchSkillsToProjectsOutputSchema>;

export async function matchSkillsToProjects(
  input: MatchSkillsToProjectsInput
): Promise<MatchSkillsToProjectsOutput> {
  return matchSkillsToProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchSkillsToProjectsPrompt',
  input: {schema: MatchSkillsToProjectsInputSchema},
  output: {schema: MatchSkillsToProjectsOutputSchema},
  prompt: `You are an expert at matching user skills to project requirements.

You will be provided with a project description, a list of required skills for the project, and a list of skills that a user has.

You will determine whether the user's skills are a good match for the project requirements.

Project Description: {{{projectDescription}}}
Required Skills: {{#each requiredSkills}}{{{this}}}, {{/each}}
User Skills: {{#each userSkills}}{{{this}}}, {{/each}}

Respond with whether the user's skills are a good match for the project, and the reason for the match. Be brief and concise.
`,
});

const matchSkillsToProjectsFlow = ai.defineFlow(
  {
    name: 'matchSkillsToProjectsFlow',
    inputSchema: MatchSkillsToProjectsInputSchema,
    outputSchema: MatchSkillsToProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
