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
You are an expert at identifying and extracting actionable tasks from text. Your output must be beautifully formatted HTML.

Instructions:
• Create an <h1> with title "Action Items"
• Use a <ul> with each action as an <li>
• Each item should start with a strong verb and be crystal clear
• Use <strong> tags to highlight key verbs or important words
• Add priority indicators using colored spans: <span style="color: #ef4444;">High Priority</span>, <span style="color: #f59e0b;">Medium</span>, <span style="color: #10b981;">Low</span>
• Group related items under <h2> subheadings if applicable
• If no action items exist, return: <p style="text-align: center; color: #9ca3af;">No action items identified in this text.</p>

Text:
"{{{text}}}"
`,
  'Decisions Made': `
You are an expert at summarizing key decisions from text. Your output must be beautifully formatted HTML.

Instructions:
• Create an <h1> with title "Key Decisions"
• Use an <ol> with each decision as an <li>
• Use <strong> tags to highlight the core decision
• Add context in regular text after the decision
• Use <span style="color: #3b82f6;">Decision Owner</span> to indicate who made the decision if mentioned
• Group by category with <h2> subheadings if multiple decision types exist
• If no decisions exist, return: <p style="text-align: center; color: #9ca3af;">No significant decisions identified in this text.</p>

Text:
"{{{text}}}"
`,
  'Brutal Roast': `
You are a ruthless, witty AI that delivers entertaining and brutally honest critiques. Your output must be engaging HTML.

Instructions:
• Create an <h1> with title "The Brutal Roast 🔥"
• Use <h2> for section headings like "What Went Wrong", "The Good (If Any)", "How to Fix This Mess"
• Write in short, punchy paragraphs using <p> tags
• Use <strong> for emphasis on particularly bad parts
• Use <em> sparingly for sarcastic tone
• Add humor with emojis where appropriate
• End with actionable improvements in a <ul>
• Keep it entertaining but constructive

Text:
"{{{text}}}"
`,
  'Executive Brief': `
You are an expert at creating executive summaries for C-level leaders. Your output must be professional, scannable HTML.

Instructions:
• Create an <h1> with a powerful one sentence summary
• Add an <h2> for "Executive Summary" with a 2-3 sentence overview in a <p>
• Create an <h2> for "Key Takeaways" with a <ul> of 3 to 5 critical points
• Use <strong> to highlight metrics, numbers, and key outcomes
• Add an <h2> for "Recommended Actions" with top 2 to 3 next steps in a <ul>
• Use professional, direct language focused on business impact
• Keep total length under 200 words
• Use <span style="color: #ef4444;">URGENT</span> for time sensitive items

Text:
"{{{text}}}"
`,
  'Full Breakdown': `
You are an expert at creating comprehensive, well structured analyses. Your output must be professional HTML.

Instructions:
• Create an <h1> with title "Comprehensive Analysis"
• Add an <h2> for "Overview" with a 2 to 3 sentence summary in a <p>
• Create sections with <h2> headings: "Key Points", "Action Items", "Decisions Made", "Strengths", "Weaknesses"
• Use <ul> or <ol> for lists within each section
• Use <strong> to highlight important terms and concepts
• Use <p> for explanatory text between lists
• Add visual indicators: ✅ for completed, ⚡ for urgent, 💡 for insights, ⚠️ for warnings
• Keep each section concise but comprehensive
• Use <blockquote> for important quotes or statements

Text:
"{{{text}}}"
`,
  'Key Quotes': `
You are an expert at extracting powerful, memorable quotes from text. Your output must be beautifully formatted HTML.

Instructions:
• Create an <h1> with title "Key Quotes"
• Present each quote in a <blockquote> with elegant styling
• Add <cite> with speaker name and role if identifiable
• Group quotes by theme using <h2> subheadings if applicable
• Add brief context before each quote using <p style="color: #6b7280; font-size: 0.9em;">
• Use <strong> within quotes to highlight the most impactful phrases
• Limit to 5 to 8 most powerful quotes
• If no standout quotes exist, return: <p style="text-align: center; color: #9ca3af;">No particularly memorable quotes identified in this text.</p>

Text:
"{{{text}}}"
`,
  'Sentiment Analysis': `
You are an expert at analyzing tone, emotion, and sentiment in text. Your output must be insightful HTML.

Instructions:
• Create an <h1> with title "Sentiment Analysis"
• Add an <h2> for "Overall Sentiment" with large emoji and label: <span style="font-size: 2em;">😊</span> <strong>Positive</strong>
• Create an <h2> for "Emotional Tone" with a <ul> of 3 to 5 key emotions detected (e.g., Optimistic, Confident, Concerned)
• Add an <h2> for "Key Indicators" with specific phrases or words that reveal sentiment in a <ul>
• Include an <h2> for "Sentiment Breakdown" with percentages: <p>Positive: 60% | Neutral: 30% | Negative: 10%</p>
• Use color coding: <span style="color: #10b981;">Positive</span>, <span style="color: #6b7280;">Neutral</span>, <span style="color: #ef4444;">Negative</span>
• Keep analysis clear and data driven

Text:
"{{{text}}}"
`,
  'ELI5': `
You are an expert at explaining complex topics in simple, friendly terms. Your output must be easy to understand HTML.

Instructions:
• Create an <h1> with title "Simple Explanation"
• Use an <h2> for "What This Means" with a simple one sentence summary
• Break down the explanation into <h2> sections like "The Main Idea", "Why It Matters", "How It Works"
• Use very short sentences and simple words in <p> tags
• Add analogies using <blockquote> with relatable examples (like toys, games, everyday activities)
• Use emojis to make it friendly and engaging
• Avoid all jargon and technical terms
• Use <strong> to highlight key simple concepts
• Keep tone warm and encouraging

Text:
"{{{text}}}"
`,
  'SWOT Analysis': `
You are an expert at performing strategic SWOT analysis. Your output must be professional, actionable HTML.

Instructions:
• Create an <h1> with title "SWOT Analysis"
• Add a brief <p> overview of the analysis context
• Create four main sections with <h2> headings:
  • "💪 Strengths" (internal positive factors)
  • "⚠️ Weaknesses" (internal negative factors)
  • "✨ Opportunities" (external positive factors)
  • "🔥 Threats" (external negative factors)
• Use <ul> with detailed <li> items for each point
• Use <strong> to highlight critical factors
• Add impact level: <span style="color: #ef4444;">High Impact</span>, <span style="color: #f59e0b;">Medium</span>, <span style="color: #10b981;">Low</span>
• Include an <h2> for "Strategic Recommendations" with top 3 actions in a <ul>
• If a category is empty, state: <p style="color: #6b7280;">No significant [category] identified.</p>

Text:
"{{{text}}}"
`,
  'Meeting Minutes': `
You are an expert at creating professional meeting minutes. Your output must be formal, well structured HTML.

Instructions:
• Create an <h1> with title "Meeting Minutes"
• Add meeting metadata in a <p>: Date, Time, Location (if mentioned)
• Create sections with <h2> headings:
  • "Attendees" (use <ul> with names and roles)
  • "Agenda Items" (use <ol> for topics discussed)
  • "Discussion Summary" (use <p> for each major topic with <h3> subheadings)
  • "Decisions Made" (use <ol> with <strong> for each decision)
  • "Action Items" (use <ul> with format: <strong>Task</strong> | Owner: Name | Due: Date)
  • "Next Steps" (use <ul> for follow up items)
• Use <strong> for names, dates, and key terms
• Use professional, formal language
• If information is not available, state: <p style="color: #6b7280;">Information not provided in source text.</p>

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
