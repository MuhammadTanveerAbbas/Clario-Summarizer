
import { Navbar } from '@/components/layout/navbar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Briefcase,
  CheckCircle,
  ClipboardPaste,
  Flame,
  Gavel,
  Github,
  LayoutList,
  Linkedin,
  ListChecks,
  ListTodo,
  Sparkles,
  Target,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'Action Items Only',
    description: 'Extract a clean list of tasks and to-dos.',
    icon: ListTodo,
  },
  {
    title: 'Decisions Made',
    description: 'Get a summary of all key decisions.',
    icon: Gavel,
  },
  {
    title: 'Brutal Roast',
    description: 'A humorous, overly critical take on your text.',
    icon: Flame,
  },
  {
    title: 'Executive Brief',
    description: 'A high-level summary for busy leaders.',
    icon: Briefcase,
  },
  {
    title: 'Full Breakdown',
    description: 'A detailed, section-by-section analysis.',
    icon: LayoutList,
  },
];

const howItWorksSteps = [
  {
    icon: ClipboardPaste,
    title: '1. Paste Transcript',
    description:
      'Drop in your meeting notes, interview transcripts, or any text you need summarized.',
  },
  {
    icon: ListChecks,
    title: '2. Choose Your Style',
    description:
      'Select a summarization mode, from a brutal roast to a formal executive brief.',
  },
  {
    icon: Sparkles,
    title: '3. Get Your Summary',
    description:
      'Receive a perfectly structured, easy-to-read summary in seconds.',
  },
];

const whyChooseUsPoints = [
  {
    icon: CheckCircle,
    title: 'Speed',
    description: 'Instant summaries in seconds.',
    iconColor: 'text-green-500',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'No filler, no fluff, just clarity.',
    iconColor: 'text-blue-500',
  },
  {
    icon: Flame,
    title: 'Brutality',
    description: 'Roast mode calls out every flaw.',
    iconColor: 'text-red-500',
  },
];

const faqItems = [
    {
        question: 'How accurate is it?',
        answer: 'The accuracy depends heavily on the quality of your input. Vague transcripts will result in blunt, and sometimes unhelpful, output. Clear, well-structured text yields the best results.'
    },
    {
        question: 'What exactly is Brutal Roast mode?',
        answer: 'It\'\'\'s a sarcastic, humorous critique of your text. It points out everything that could be wrong, from grammar to clarity, and suggests improvements in a very direct way.'
    },
    {
        question: 'Do I need an account to use this?',
        answer: 'Nope. There are no sign-ups or logins. Everything runs locally in your browser, and your data is only stored in cookies for your convenience.'
    },
    {
        question: 'Can I export the summaries?',
        answer: 'Yes. You can instantly copy the generated summary text with a single click and paste it wherever you need it.'
    },
    {
      question: 'Is my data saved anywhere?',
      answer: 'No. Your data is not stored on any servers. All processing happens in your browser, and the text you paste is only kept in local storage for your convenience. It is never sent to or stored by us.',
    },
]

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 1200 1227"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L112.633 43.4836H312.3L604.212 514.974L651.68 582.869L1099.03 1184.04H899.362L569.165 687.854V687.828Z"
        fill="currentColor"
      />
    </svg>
  );

const socialLinks = [
    {
        href: 'https://linkedin.com/in/muhammadtanveerabbas',
        icon: Linkedin,
        label: 'LinkedIn'
    },
    {
        href: 'https://github.com/muhammadtanveerabbas',
        icon: Github,
        label: 'GitHub'
    },
    {
        href: 'https://x.com/m_tanveerabbas',
        icon: XIcon,
        label: 'X'
    }
]

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <section
          id="home"
          className="relative flex h-dvh min-h-[700px] w-full flex-col items-center justify-center overflow-hidden bg-background text-center"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-background via-background/80 to-background/50 bg-[radial-gradient(hsl(var(--accent))_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="container z-10">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl md:text-7xl">
              Ruthless Summaries. Zero Fluff.
              <br />
              Maximum Clarity.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
              Transform messy transcripts into clear, actionable summaries.
              <br />
              Our AI provides ruthless, structured insights in seconds.
              <br />
              No login, no fluff just pure, raw clarity.
              <br />
              Free forever. No catch.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/tool">
                <Button
                  size="lg"
                  className="animate-button-glow rounded-2xl bg-accent px-8 text-accent-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  aria-label="Try the Tool Now"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Try the Tool Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                Core Features
              </h2>
              <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Summarize Your Way
              </p>
              <p className="mt-6 text-lg leading-8 text-foreground/80">
                Choose from five powerful summarization modes to get the exact
                output you need.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
                {features.map((feature) => (
                  <Card
                    key={feature.title}
                    className="transform-gpu bg-accent/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-accent/50"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                          <feature.icon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="text-lg font-semibold leading-6 text-primary-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm text-foreground/70">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                How It Works
              </h2>
              <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Get Your Summary in 3 Simple Steps
              </p>
              <p className="mt-6 text-lg leading-8 text-foreground/80">
                Our process is designed for speed and simplicity. No accounts, no
                setup, just results.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold leading-6 text-primary-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base text-foreground/70">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                Why Choose Us?
              </h2>
              <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                The Unfair Advantage for Clarity
              </p>
              <p className="mt-6 text-lg leading-8 text-foreground/80">
                We're not just another summarizer. We're a tool for ruthless efficiency.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {whyChooseUsPoints.map((point) => (
                <div key={point.title} className="flex flex-col items-center text-center">
                  <point.icon
                    className={`h-10 w-10 ${point.iconColor}`}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 text-xl font-semibold leading-7 text-primary-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-foreground/70">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-accent/20 py-24 sm:py-32">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                        Have Questions? We Have Answers.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-foreground/80">
                        Find answers to common questions about Clario, its features, and how it works.
                    </p>
                </div>
                <Card className="bg-background/80 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index} className="border-border/50">
                                    <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-base text-foreground/80">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>
      <footer id="contact" className="text-primary-foreground" style={{ backgroundColor: '#131313' }}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="flex justify-center space-x-6">
                {socialLinks.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors duration-300 hover:text-white hover:glow">
                        <span className="sr-only">{item.label}</span>
                        <item.icon className="h-7 w-7" aria-hidden="true" />
                    </a>
                ))}
            </div>
            <div className="mt-10 text-center text-sm leading-5 text-gray-400">
                <p>&copy; {new Date().getFullYear()} Clario. Built by Muhammad Tanveer Abbas.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

    
