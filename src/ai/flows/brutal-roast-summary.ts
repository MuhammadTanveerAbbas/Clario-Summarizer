'use server';

/**
 * @fileOverview Generates a brutal roast summary of the given text.
 *
 * - brutalRoastSummary - A function that generates a brutal roast summary.
 * - BrutalRoastSummaryInput - The input type for the brutalRoastSummary function.
 * - BrutalRoastSummaryOutput - The return type for the brutalRoastSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BrutalRoastSummaryInputSchema = z.object({
  text: z
    .string()
    .describe('The text to summarize with a brutal roast.'),
});
export type BrutalRoastSummaryInput = z.infer<typeof BrutalRoastSummaryInputSchema>;

const BrutalRoastSummaryOutputSchema = z.object({
  summary: z.string().describe('The brutal roast summary of the text.'),
});
export type BrutalRoastSummaryOutput = z.infer<typeof BrutalRoastSummaryOutputSchema>;

export async function brutalRoastSummary(input: BrutalRoastSummaryInput): Promise<BrutalRoastSummaryOutput> {
  return brutalRoastSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'brutalRoastSummaryPrompt',
  input: {schema: BrutalRoastSummaryInputSchema},
  output: {schema: BrutalRoastSummaryOutputSchema},
  prompt: `You are a ruthless AI assistant that provides brutal, humorous roasts of text. You should be overly critical and highlight areas for improvement in an entertaining way.

  Text: {{{text}}}

  Brutal Roast Summary:`,
});

const brutalRoastSummaryFlow = ai.defineFlow(
  {
    name: 'brutalRoastSummaryFlow',
    inputSchema: BrutalRoastSummaryInputSchema,
    outputSchema: BrutalRoastSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
