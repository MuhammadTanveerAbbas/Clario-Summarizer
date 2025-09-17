'use server';
/**
 * @fileOverview Generates summaries of user-provided text in different modes.
 *
 * - generateSummary - A function that takes text and a mode and returns a summary.
 * - GenerateSummaryInput - The input type for the generateSummary function.
 * - GenerateSummaryOutput - The return type for the generateSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSummaryInputSchema = z.object({
  text: z.string().describe('The text to summarize.'),
  mode: z
    .enum([
      'Action Items Only',
      'Decisions Made',
      'Brutal Roast',
      'Executive Brief',
      'Full Breakdown',
      'Key Quotes',
      'Sentiment Analysis',
      'ELI5',
      'SWOT Analysis',
      'Meeting Minutes',
    ])
    .describe('The summarization mode.'),
});
export type GenerateSummaryInput = z.infer<typeof GenerateSummaryInputSchema>;

const GenerateSummaryOutputSchema = z.object({
  summary: z.string().describe('The generated summary.'),
});
export type GenerateSummaryOutput = z.infer<typeof GenerateSummaryOutputSchema>;

export async function generateSummary(input: GenerateSummaryInput): Promise<GenerateSummaryOutput> {
  return generateSummaryFlow(input);
}

const evaluatePromptTool = ai.defineTool({
  name: 'evaluatePrompt',
  description: 'Evaluates if the prompt is missing additional reasoning and injects if necessary.',
  inputSchema: z.object({
    prompt: z.string().describe('The prompt to evaluate.'),
  }),
  outputSchema: z.boolean().describe('Whether the prompt was modified.'),
}, async (input) => {
  // Placeholder implementation for prompt evaluation and injection.
  // In a real application, this would use an LLM or other logic to determine
  // if the prompt needs additional context or reasoning steps.
  console.log("Prompt evaluation tool called.", input.prompt);
  return false; // Indicate that the prompt was not modified.
});

const summaryPrompt = ai.definePrompt({
  name: 'summaryPrompt',
  input: {schema: GenerateSummaryInputSchema},
  output: {schema: GenerateSummaryOutputSchema},
  tools: [evaluatePromptTool],
  prompt: `You are an expert summarizer. Please provide a summary of the following text in the specified mode.\n\nMode: {{{mode}}}\n\nText: {{{text}}}\n\nSummary:`,
});

const generateSummaryFlow = ai.defineFlow(
  {
    name: 'generateSummaryFlow',
    inputSchema: GenerateSummaryInputSchema,
    outputSchema: GenerateSummaryOutputSchema,
  },
  async input => {
    // Tool use example: evaluate if the prompt needs modification
    // const promptModified = await evaluatePromptTool({ prompt: summaryPrompt.prompt });

    const {output} = await summaryPrompt(input);
    return output!;
  }
);
