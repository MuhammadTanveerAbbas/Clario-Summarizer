'use server';

/**
 * @fileOverview Evaluates the user's prompt and generates a high-quality summary based on the selected mode.
 *
 * - evaluateAndRefinePrompt - A function that evaluates the prompt and generates a summary.
 * - EvaluateAndRefinePromptInput - The input type for the evaluateAndRefinePrompt function.
 * - EvaluateAndRefinePromptOutput - The return type for the evaluateAndRefinePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateAndRefinePromptInputSchema = z.object({
  text: z.string().describe('The text to be summarized.'),
  mode: z.enum([
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
  ]).describe('The summarization mode selected by the user.'),
});
export type EvaluateAndRefinePromptInput = z.infer<typeof EvaluateAndRefinePromptInputSchema>;

const EvaluateAndRefinePromptOutputSchema = z.object({
  summary: z.string().describe('The generated summary in HTML format.'),
});
export type EvaluateAndRefinePromptOutput = z.infer<typeof EvaluateAndRefinePromptOutputSchema>;


const PROMPT_TEMPLATES: Record<EvaluateAndRefinePromptInput['mode'], string> = {
  'Action Items Only': `
You are an expert at identifying and extracting actionable tasks from text. Your output must be a clean, concise HTML unordered list.

- Identify all clear action items, tasks, and to-dos.
- Present them in a <ul> with each item as a <li>.
- Each list item should be concise, start with a verb, and clearly state the task.
- If no action items are found, return a single <p> tag stating: "No action items were identified."

Text:
"{{{text}}}"
`,
  'Decisions Made': `
You are an expert at summarizing key decisions from a text. Your output must be a clean HTML ordered list.

- Identify all significant decisions, conclusions, and resolutions.
- Present them in an <ol> with each item as a <li>.
- Each list item should clearly and concisely state the decision that was made.
- If no decisions are found, return a single <p> tag stating: "No significant decisions were identified."

Text:
"{{{text}}}"
`,
  'Brutal Roast': `
You are a ruthless, sarcastic AI assistant that provides humorous and overly critical roasts of text. Your output must be valid, entertaining HTML.

- Analyze the text for flaws in logic, grammar, clarity, and style.
- Write a witty, sarcastic, and brutally funny critique. Use strong, punchy language.
- Structure the output with an <h2> for "The Roast" and <p> tags for paragraphs of mockery.
- Don't just criticize; suggest improvements in a condescending but helpful way.
- Be brutal, be entertaining, but keep it concise.

Text:
"{{{text}}}"
`,
  'Executive Brief': `
You are an expert at creating high-level summaries for busy executives. Your output must be professional, concise, and in valid HTML format.

- Start with an <h1> containing a one-sentence summary of the entire text.
- Follow with an <h2> for "Key Takeaways" and a <ul> of the 3-5 most critical points.
- The tone must be formal, direct, and focused on strategic implications and outcomes.
- The entire summary must be under 150 words.

Text:
"{{{text}}}"
`,
  'Full Breakdown': `
You are an expert at creating detailed, structured analyses. Your output must be a well-organized and concise HTML document.

- Generate a professional and easy-to-read summary in clean HTML format.
- Use <h1> for the main title: "Comprehensive Summary & Analysis".
- Use <h2> for sections: "<span>✅</span> Action Items", "<span>⚡</span> Key Decisions", "<span>👍</span> Strengths", and "<span>👎</span> Weaknesses".
- Use short paragraphs (<p>) and lists (<ul>, <ol>) for maximum clarity.
- The summary should be significantly shorter than the original text but cover all key aspects.

Text:
"{{{text}}}"
`,
  'Key Quotes': `
You are an expert at extracting impactful and representative quotes from text. Your output must be a clean HTML list.

- Identify the most powerful, memorable, or significant quotes from the text.
- Present them in a <ul> with each quote inside a <blockquote> element.
- If the speaker is identifiable, add a <cite> tag with their name.
- If no uniquely powerful quotes are found, return a single <p> tag stating: "No standout quotes were identified."

Text:
"{{{text}}}"
`,
  'Sentiment Analysis': `
You are an expert at analyzing the tone and emotion of a text. Your output must be a concise, structured HTML summary.

- Determine the overall sentiment (Positive, Negative, Neutral) and represent it with an appropriate emoji (e.g., 😊, 😠, 😐).
- Create an <h2> with the overall sentiment (e.g., "<h2>Overall Sentiment: Positive 😊</h2>").
- Provide a brief <ul> listing the key emotional drivers or tones present in the text (e.g., "Optimistic," "Concerned," "Confident").
- Keep the analysis brief and to the point.

Text:
"{{{text}}}"
`,
  'ELI5': `
You are an expert at explaining complex topics in simple terms, as if to a 5-year-old. Your output must be simple, valid HTML.

- Simplify all complex ideas, jargon, and terminology into very simple concepts.
- Use short sentences and simple words.
- Use analogies and basic examples a child would understand.
- Structure the output with an <h2> for the main topic and <p> tags for the explanations.

Text:
"{{{text}}}"
`,
  'SWOT Analysis': `
You are an expert at performing SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis. Your output must be a structured HTML document.

- Analyze the provided text to identify internal strengths and weaknesses, and external opportunities and threats.
- Create four sections with <h2> headings: "<span>💪</span> Strengths", "<span>👎</span> Weaknesses", "<span>✨</span> Opportunities", and "<span>🔥</span> Threats".
- Under each heading, use a <ul> to list the identified points concisely.
- If a category has no points, state that (e.g., "No specific weaknesses identified.").

Text:
"{{{text}}}"
`,
  'Meeting Minutes': `
You are an expert at creating formal meeting minutes from a transcript. Your output must be a professional and structured HTML document.

- Create sections with <h2> headings for: "Attendees", "Agenda", "Key Discussion Points", "Decisions Made", and "Action Items".
- Extract the relevant information from the text to fill each section. If information for a section is not available, state that.
- Use lists (<ul>, <ol>) for clarity and conciseness.
- Ensure the format is clean, professional, and easy to read.

Text:
"{{{text}}}"
`,
};

const summaryPrompt = ai.definePrompt({
  name: 'summaryPrompt',
  input: {schema: z.object({ text: z.string(), mode: z.string(), template: z.string() })},
  output: {schema: EvaluateAndRefinePromptOutputSchema},
  prompt: `You are a world-class summarization expert. Your output must be valid HTML suitable for direct rendering and PDF export.
Please provide a summary of the following text in the specified mode.

Follow these instructions for the mode '{{{mode}}}':
{{{template}}}

Summary (as HTML):`,
});

export async function evaluateAndRefinePrompt(input: EvaluateAndRefinePromptInput): Promise<EvaluateAndRefinePromptOutput> {
  return evaluateAndRefinePromptFlow(input);
}

const evaluateAndRefinePromptFlow = ai.defineFlow(
  {
    name: 'evaluateAndRefinePromptFlow',
    inputSchema: EvaluateAndRefinePromptInputSchema,
    outputSchema: EvaluateAndRefinePromptOutputSchema,
  },
  async (input) => {
    if (!input.text || input.text.trim().length < 10) {
      return { summary: `<p>Oops! I don't have any words to read and make a summary for you. Please give me some text!</p>` };
    }
    const template = PROMPT_TEMPLATES[input.mode].replace('{{{text}}}', input.text);
    
    const { output } = await summaryPrompt({ ...input, template });

    if (!output) {
      throw new Error("Failed to generate a summary.");
    }
    
    return {summary: output.summary};
  }
);
