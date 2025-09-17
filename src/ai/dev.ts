import { config } from 'dotenv';
config();

import '@/ai/flows/generate-summary.ts';
import '@/ai/flows/brutal-roast-summary.ts';
import '@/ai/flows/evaluate-and-refine-prompt.ts';