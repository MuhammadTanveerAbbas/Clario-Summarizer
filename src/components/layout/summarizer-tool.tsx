
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
import { toPng } from 'html-to-image';

import { evaluateAndRefinePrompt } from '@/ai/flows/evaluate-and-refine-prompt';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const summaryModes = [
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

type ModeValue = typeof summaryModes[number]['value'];

export function SummarizerTool() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<ModeValue>('Full Breakdown');
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedText = localStorage.getItem('summarizerText');
      const savedMode = localStorage.getItem('summarizerMode');
      if (savedText) {
        setText(savedText);
      }
      if (savedMode && summaryModes.some(m => m.value === savedMode)) {
        setMode(savedMode as ModeValue);
      }
    } catch (error) {
      console.warn("Could not read from local storage:", error)
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('summarizerText', text);
    } catch (error) {
      console.warn("Could not write to local storage:", error)
    }
  }, [text]);

  useEffect(() => {
    try {
      localStorage.setItem('summarizerMode', mode);
    } catch (error) {
      console.warn("Could not write to local storage:", error)
    }
  }, [mode]);

  const copyToClipboard = () => {
    if (summaryRef.current) {
      navigator.clipboard.writeText(summaryRef.current.innerText);
      toast({
        title: "Copied to clipboard!",
        description: "The summary has been copied to your clipboard.",
      });
    }
  };

  const exportAsPdf = async () => {
    const element = summaryRef.current;
    if (!element) {
      toast({
        variant: 'destructive',
        title: 'Export failed',
        description: 'Could not find the summary content to export.',
      });
      return;
    }

    try {
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true,
        style: {
          margin: '0',
          fontFamily: 'Sansation, sans-serif',
          backgroundColor: '#121212'
        },
      });

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgRatio = imgWidth / imgHeight;

        const margin = 20;
        let finalWidth = pdfWidth - margin * 2;
        let finalHeight = finalWidth / imgRatio;

        if (finalHeight > pdfHeight - margin * 2) {
          finalHeight = pdfHeight - margin * 2;
          finalWidth = finalHeight * imgRatio;
        }

        const x = (pdfWidth - finalWidth) / 2;
        const y = margin;

        pdf.addImage(dataUrl, 'PNG', x, y, finalWidth, finalHeight);
        pdf.save('summary.pdf');

        toast({
          title: "Export successful!",
          description: "Your summary has been exported as a PDF.",
        });
      };

      img.onerror = () => {
        toast({
          variant: "destructive",
          title: "Export failed",
          description: "Failed to load the generated summary image for PDF export.",
        });
      }

    } catch (err) {
      console.error('PDF export failed:', err);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "An unexpected error occurred while exporting to PDF.",
      });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSummary(null);
    setShowSuccess(false);

    try {
      const result = await evaluateAndRefinePrompt({ text, mode });
      setSummary(result.summary);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (e: any) {
      setError('An error occurred while generating the summary. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const isSubmitDisabled = isLoading || text.trim().length < 10;

  return (
    <div className="mt-16 sm:mt-20">
      <Card className="bg-background/50">
        <CardContent className="p-6">
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
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold">
                Summary Style
              </Label>
              <RadioGroup
                value={mode}
                onValueChange={(value: string) => setMode(value as ModeValue)}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
                aria-label="Summary style"
              >
                {summaryModes.map((modeOption) => (
                  <div key={modeOption.value} className="relative">
                    <RadioGroupItem value={modeOption.value} id={modeOption.value} className="sr-only peer" />
                    <Label
                      htmlFor={modeOption.value}
                      className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <modeOption.icon className="mb-2 h-6 w-6" />
                      <span>{modeOption.value}</span>
                      <p className={cn("text-xs mt-1", "text-muted-foreground")}>{modeOption.helperText}</p>
                    </Label>
                    <Check className="absolute top-2 right-2 h-4 w-4 opacity-0 transition-opacity peer-data-[state=checked]:opacity-100" />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-center">
              <Button type="submit" size="lg" disabled={isSubmitDisabled} aria-label="Summarize">
                {isLoading ? (
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

          {error && (
            <div className="mt-6 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
              <p>{error}</p>
            </div>
          )}

          <div className="mt-8">
            {summary ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className='flex items-center gap-2'>
                    <h3 className="text-2xl font-bold">
                      Your Summary
                    </h3>
                    {showSuccess && <CheckCircle2 className="h-6 w-6 text-green-500 animate-in fade-in zoom-in" />}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      aria-label="Copy summary to clipboard"
                    >
                      <ClipboardCopy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportAsPdf}
                      aria-label="Export summary as PDF"
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Export PDF
                    </Button>
                  </div>
                </div>
                <Card className="bg-[#121212] relative group">
                  <CardContent className="p-0">
                    <div
                      id="summary-content"
                      ref={summaryRef}
                      className="summary-prose"
                      dangerouslySetInnerHTML={{ __html: summary }}
                    />
                  </CardContent>
                </Card>
              </>
            ) : !isLoading && (
              <div className="text-center text-foreground/60">
                <p>Your summary will appear here instantly.</p>
              </div>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
