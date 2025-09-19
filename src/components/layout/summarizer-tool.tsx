"use client";

import { useState, useEffect, useRef } from 'react';
import {
  Baby,
  Briefcase,
  Check,
  CheckCircle2,
  ClipboardCopy,
  FileDown,
  Flame,
  Gavel,
  LayoutList,
  ListTodo,
  Loader2,
  NotebookPen,
  Quote,
  SmilePlus,
  Sparkles,
  Swords,
} from 'lucide-react';
import jsPDF from 'jspdf';

import { evaluateAndRefinePrompt } from '@/ai/flows/evaluate-and-refine-prompt';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Types
type ModeValue = 
  | 'Action Items Only'
  | 'Decisions Made'
  | 'Brutal Roast'
  | 'Executive Brief'
  | 'Full Breakdown'
  | 'Key Quotes'
  | 'Sentiment Analysis'
  | 'ELI5'
  | 'SWOT Analysis'
  | 'Meeting Minutes';

interface SummaryMode {
  readonly value: ModeValue;
  readonly helperText: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}

interface SummaryRequest {
  readonly text: string;
  readonly mode: ModeValue;
}

interface SummaryState {
  text: string;
  mode: ModeValue;
  summary: string | null;
  isLoading: boolean;
  error: string | null;
  showSuccess: boolean;
}

// Constants
const STORAGE_KEYS = {
  TEXT: 'summarizerText',
  MODE: 'summarizerMode',
} as const;

const MIN_TEXT_LENGTH = 10;
const SUCCESS_DISPLAY_DURATION = 2000;

const SUMMARY_MODES: readonly SummaryMode[] = [
  {
    value: 'Action Items Only',
    helperText: 'Just the to-do list.',
    icon: ListTodo,
  },
  {
    value: 'Decisions Made',
    helperText: 'Key decisions, nothing else.',
    icon: Gavel,
  },
  {
    value: 'Brutal Roast',
    helperText: 'Sarcastic critique with fixes.',
    icon: Flame,
  },
  {
    value: 'Executive Brief',
    helperText: 'High-level, formal summary.',
    icon: Briefcase,
  },
  {
    value: 'Full Breakdown',
    helperText: 'Detailed, structured analysis.',
    icon: LayoutList,
  },
  {
    value: 'Key Quotes',
    helperText: 'Extract the most impactful quotes.',
    icon: Quote,
  },
  {
    value: 'Sentiment Analysis',
    helperText: 'Analyze the tone and emotion.',
    icon: SmilePlus,
  },
  {
    value: 'ELI5',
    helperText: "Explain it like I'm 5.",
    icon: Baby,
  },
  {
    value: 'SWOT Analysis',
    helperText: 'Strengths, Weaknesses, etc.',
    icon: Swords,
  },
  {
    value: 'Meeting Minutes',
    helperText: 'Formal record of a meeting.',
    icon: NotebookPen,
  },
] as const;

// Pure utility functions
const isValidMode = (mode: string): mode is ModeValue => 
  SUMMARY_MODES.some(m => m.value === mode);

const getStorageValue = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Could not read from local storage for key: ${key}`, error);
    return null;
  }
};

const setStorageValue = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Could not write to local storage for key: ${key}`, error);
  }
};

const extractTextContent = (element: HTMLElement): string => 
  element.innerText || element.textContent || '';

// Storage service
interface StorageService {
  loadInitialState(): Pick<SummaryState, 'text' | 'mode'>;
  saveText(text: string): void;
  saveMode(mode: ModeValue): void;
}

const createStorageService = (): StorageService => ({
  loadInitialState: () => {
    const savedText = getStorageValue(STORAGE_KEYS.TEXT) || '';
    const savedMode = getStorageValue(STORAGE_KEYS.MODE);
    const mode: ModeValue = savedMode && isValidMode(savedMode) 
      ? savedMode 
      : 'Full Breakdown';
    
    return { text: savedText, mode };
  },
  
  saveText: (text: string) => setStorageValue(STORAGE_KEYS.TEXT, text),
  saveMode: (mode: ModeValue) => setStorageValue(STORAGE_KEYS.MODE, mode),
});

// Clipboard service
interface ClipboardService {
  copyText(text: string): Promise<void>;
}

const createClipboardService = (toast: ReturnType<typeof useToast>['toast']): ClipboardService => ({
  copyText: async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "The summary has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Clipboard copy failed:', error);
      toast({
        variant: 'destructive',
        title: 'Copy failed',
        description: 'Could not copy to clipboard. Please try selecting and copying manually.',
      });
    }
  },
});

// PDF export service
interface PdfExportService {
  exportElementAsPdf(element: HTMLElement): Promise<void>;
}

const createPdfExportService = (toast: ReturnType<typeof useToast>['toast']): PdfExportService => ({
  exportElementAsPdf: async (element: HTMLElement) => {
    try {
      // Create PDF with text content instead of image to avoid html-to-image dependency
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      // Extract and clean text content
      const textContent = extractTextContent(element);
      const lines = pdf.splitTextToSize(textContent, contentWidth);
      
      let yPosition = margin;
      const lineHeight = 7;
      
      // Add title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Summary Report', margin, yPosition);
      yPosition += lineHeight * 2;
      
      // Add content
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      for (const line of lines) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      }
      
      // Add footer with timestamp
      const timestamp = new Date().toLocaleString();
      pdf.setFontSize(8);
      pdf.setTextColor(128);
      pdf.text(`Generated on ${timestamp}`, margin, pageHeight - 10);
      
      pdf.save('summary.pdf');
      
      toast({
        title: "Export successful!",
        description: "Your summary has been exported as a PDF.",
      });
    } catch (error) {
      console.error('PDF export failed:', error);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "An unexpected error occurred while exporting to PDF.",
      });
    }
  },
});

// Summary service
interface SummaryService {
  generateSummary(request: SummaryRequest): Promise<string>;
}

const createSummaryService = (): SummaryService => ({
  generateSummary: async (request: SummaryRequest) => {
    const result = await evaluateAndRefinePrompt(request);
    return result.summary;
  },
});

// Main component
export function SummarizerTool() {
  const [state, setState] = useState<SummaryState>({
    text: '',
    mode: 'Full Breakdown',
    summary: null,
    isLoading: false,
    error: null,
    showSuccess: false,
  });
  
  const summaryRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Services - injected dependencies
  const storageService = createStorageService();
  const clipboardService = createClipboardService(toast);
  const pdfExportService = createPdfExportService(toast);
  const summaryService = createSummaryService();
  
  // Initialize state from storage
  useEffect(() => {
    const initialState = storageService.loadInitialState();
    setState(prev => ({ ...prev, ...initialState }));
  }, []);
  
  // Persist text changes
  useEffect(() => {
    if (state.text) {
      storageService.saveText(state.text);
    }
  }, [state.text]);
  
  // Persist mode changes
  useEffect(() => {
    storageService.saveMode(state.mode);
  }, [state.mode]);
  
  // Event handlers
  const handleTextChange = (text: string): void => {
    setState(prev => ({ ...prev, text, error: null }));
  };
  
  const handleModeChange = (mode: ModeValue): void => {
    setState(prev => ({ ...prev, mode }));
  };
  
  const handleCopyToClipboard = async (): Promise<void> => {
    if (!summaryRef.current) {
      toast({
        variant: 'destructive',
        title: 'Copy failed',
        description: 'No summary content found to copy.',
      });
      return;
    }
    
    const text = extractTextContent(summaryRef.current);
    await clipboardService.copyText(text);
  };
  
  const handleExportAsPdf = async (): Promise<void> => {
    if (!summaryRef.current) {
      toast({
        variant: 'destructive',
        title: 'Export failed',
        description: 'No summary content found to export.',
      });
      return;
    }
    
    await pdfExportService.exportElementAsPdf(summaryRef.current);
  };
  
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      summary: null,
      showSuccess: false,
    }));
    
    try {
      const summary = await summaryService.generateSummary({
        text: state.text,
        mode: state.mode,
      });
      
      setState(prev => ({ ...prev, summary, showSuccess: true }));
      
      // Hide success indicator after delay
      setTimeout(() => {
        setState(prev => ({ ...prev, showSuccess: false }));
      }, SUCCESS_DISPLAY_DURATION);
      
    } catch (error) {
      console.error('Summary generation failed:', error);
      setState(prev => ({
        ...prev,
        error: 'An error occurred while generating the summary. Please try again.',
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  // Computed values
  const isSubmitDisabled = state.isLoading || state.text.trim().length < MIN_TEXT_LENGTH;
  const hasSummary = Boolean(state.summary);
  
  return (
    <div className="mt-16 sm:mt-20">
      <Card className="bg-background/50">
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text-input" className="text-lg font-semibold">
                Your Text
              </Label>
              <Textarea
                id="text-input"
                placeholder="Paste your transcript here..."
                className="min-h-[200px]"
                aria-label="Text to summarize"
                value={state.text}
                onChange={(e) => handleTextChange(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold">
                Summary Style
              </Label>
              <RadioGroup
                value={state.mode}
                onValueChange={(value: string) => handleModeChange(value as ModeValue)}
                className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                aria-label="Summary style"
              >
                {SUMMARY_MODES.map((modeOption) => (
                  <div key={modeOption.value} className="relative">
                    <RadioGroupItem 
                      value={modeOption.value} 
                      id={modeOption.value} 
                      className="sr-only peer" 
                    />
                    <Label
                      htmlFor={modeOption.value}
                      className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 sm:p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors"
                    >
                      <modeOption.icon className="mb-2 h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="text-sm sm:text-base font-medium">
                        {modeOption.value}
                      </span>
                      <p className="text-xs mt-1 text-muted-foreground leading-tight">
                        {modeOption.helperText}
                      </p>
                    </Label>
                    <Check className="absolute top-2 right-2 h-4 w-4 opacity-0 transition-opacity peer-data-[state=checked]:opacity-100" />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitDisabled} 
                aria-label="Summarize"
                className="w-full sm:w-auto"
              >
                {state.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Summarize
                  </>
                )}
              </Button>
            </div>
          </form>

          {state.error && (
            <div className="mt-6 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
              <p className="text-sm sm:text-base">{state.error}</p>
            </div>
          )}

          <div className="mt-8">
            {hasSummary ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className='flex items-center gap-2'>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      Your Summary
                    </h3>
                    {state.showSuccess && (
                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 animate-in fade-in zoom-in" />
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyToClipboard}
                      aria-label="Copy summary to clipboard"
                      className="w-full sm:w-auto"
                    >
                      <ClipboardCopy className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Copy</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportAsPdf}
                      aria-label="Export summary as PDF"
                      className="w-full sm:w-auto"
                    >
                      <FileDown className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Export PDF</span>
                    </Button>
                  </div>
                </div>
                <Card className="bg-[#121212] relative group">
                  <CardContent className="p-0">
                    <div
                      id="summary-content"
                      ref={summaryRef}
                      className="summary-prose p-4 sm:p-6 text-sm sm:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: state.summary }}
                    />
                  </CardContent>
                </Card>
              </>
            ) : !state.isLoading && (
              <div className="text-center text-foreground/60 py-8">
                <p className="text-sm sm:text-base">
                  Your summary will appear here instantly.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
