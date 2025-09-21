// src/ai/flows/recommend-relevant-projects.ts
'use server';

/**
 * @fileOverview An AI agent for recommending relevant startup projects to users based on their skills and experience.
 *
 * - recommendRelevantProjects - A function that takes user profile information and project details to recommend relevant projects.
 * - RecommendRelevantProjectsInput - The input type for the recommendRelevantProjects function.
 * - RecommendRelevantProjectsOutput - The return type for the recommendRelevantProjects function, listing recommended project IDs.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendRelevantProjectsInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('A list of skills possessed by the user.'),
  userExperience: z.string().describe('A description of the user\s experience.'),
  projectDetails: z
    .array(z.object({projectId: z.string(), description: z.string(), requiredSkills: z.array(z.string())}))
    .describe('A list of project details including project ID, description, and required skills.'),
});
export type RecommendRelevantProjectsInput = z.infer<
  typeof RecommendRelevantProjectsInputSchema
>;

const RecommendRelevantProjectsOutputSchema = z.object({
  recommendedProjectIds: z
    .array(z.string())
    .describe('A list of project IDs that are relevant to the user.'),
});
export type RecommendRelevantProjectsOutput = z.infer<
  typeof RecommendRelevantProjectsOutputSchema
>;

export async function recommendRelevantProjects(
  input: RecommendRelevantProjectsInput
): Promise<RecommendRelevantProjectsOutput> {
  return recommendRelevantProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendRelevantProjectsPrompt',
  input: {schema: RecommendRelevantProjectsInputSchema},
  output: {schema: RecommendRelevantProjectsOutputSchema},
  prompt: `You are an expert at matching users with relevant startup projects.

Given the following information about a user:

Skills: {{#if userSkills}}{{#each userSkills}} - {{{this}}}{{/each}}{{else}}No skills listed.{{/if}}
Experience: {{{userExperience}}}

And the following list of projects:

{{#each projectDetails}}
Project ID: {{{projectId}}}
Description: {{{description}}}
Required Skills: {{#if requiredSkills}}{{#each requiredSkills}} - {{{this}}}{{/each}}{{else}}No skills listed.{{/if}}
{{/each}}

Determine which projects are the most relevant to the user based on their skills and experience.

Return a list of project IDs that are relevant to the user.
Make sure you only include the project IDs. Do not add any additional text.
`, 
});

const recommendRelevantProjectsFlow = ai.defineFlow(
  {
    name: 'recommendRelevantProjectsFlow',
    inputSchema: RecommendRelevantProjectsInputSchema,
    outputSchema: RecommendRelevantProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
