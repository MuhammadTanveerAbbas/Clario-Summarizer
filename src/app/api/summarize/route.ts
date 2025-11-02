import { NextRequest, NextResponse } from 'next/server';
import { evaluateAndRefinePrompt } from '@/ai/flows/evaluate-and-refine-prompt';
import { checkRateLimit } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    
    if (!checkRateLimit(ip, 10)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    const { text, mode } = body;
    
    if (!text || typeof text !== 'string' || text.trim().length < 10) {
      return NextResponse.json(
        { error: 'Invalid input text' },
        { status: 400 }
      );
    }
    
    const result = await evaluateAndRefinePrompt({ text, mode });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
