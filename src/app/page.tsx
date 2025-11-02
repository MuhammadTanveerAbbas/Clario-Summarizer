"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UniqueLoader } from "@/components/ui/unique-loader";
import { Navbar } from "@/components/layout/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  CheckCircle,
  Flame,
  Gavel,
  Github,
  LayoutList,
  Linkedin,
  ListTodo,
  Sparkles,
  Target,
  Zap,
  Chrome,
  Code,
  FileText,
  Users,
  Check,
  X,
  type LucideIcon,
} from "lucide-react";

const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Action Items Only",
    description: "Extract a clean list of tasks and to dos.",
    icon: ListTodo,
  },
  {
    title: "Decisions Made",
    description: "Get a summary of all key decisions.",
    icon: Gavel,
  },
  {
    title: "Brutal Roast",
    description: "A humorous, overly critical take on your text.",
    icon: Flame,
  },
  {
    title: "Executive Brief",
    description: "A high level summary for busy leaders.",
    icon: Briefcase,
  },
  {
    title: "Full Breakdown",
    description: "A detailed, section by section analysis.",
    icon: LayoutList,
  },
  {
    title: "Key Quotes",
    description: "Extract the most impactful quotes.",
    icon: Sparkles,
  },
  {
    title: "Sentiment Analysis",
    description: "Analyze tone and emotion of the text.",
    icon: Target,
  },
  {
    title: "ELI5",
    description: "Explain complex topics in simple terms.",
    icon: CheckCircle,
  },
  {
    title: "SWOT Analysis",
    description: "Identify strengths, weaknesses, opportunities, threats.",
    icon: Target,
  },
  {
    title: "Meeting Minutes",
    description: "Create formal, structured meeting records.",
    icon: CheckCircle,
  },
];

const useCases = [
  {
    icon: Users,
    title: "Team Meetings",
    description:
      "Convert hour long meetings into actionable summaries in seconds.",
  },
  {
    icon: FileText,
    title: "Research & Articles",
    description:
      "Extract key insights from lengthy research papers and articles.",
  },
  {
    icon: Briefcase,
    title: "Business Reports",
    description: "Create executive briefs and SWOT analyses for stakeholders.",
  },
];

const stats = [
  { value: "10", label: "Summary Modes" },
  { value: "50K", label: "Character Limit" },
  { value: "100%", label: "Free Forever" },
  { value: "<2s", label: "Average Speed" },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals",
    features: [
      "10 Summary Modes",
      "50K Character Limit",
      "PDF & Markdown Export",
      "Browser Extension",
      "History (50 summaries)",
      "Community Support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For power users",
    features: [
      "Everything in Free",
      "200K Character Limit",
      "Unlimited History",
      "Priority Processing",
      "API Access (1000 req/day)",
      "Email Support",
      "Custom Templates",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    description: "For teams & businesses",
    features: [
      "Everything in Pro",
      "Unlimited Characters",
      "Team Workspaces",
      "Unlimited API Access",
      "SSO & Advanced Security",
      "Dedicated Support",
      "Custom AI Models",
      "White-label Option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const comparisonFeatures = [
  {
    feature: "Summary Modes",
    clario: "10",
    competitor1: "3",
    competitor2: "5",
  },
  {
    feature: "Character Limit",
    clario: "50K",
    competitor1: "5K",
    competitor2: "10K",
  },
  {
    feature: "Export Formats",
    clario: "3 (PDF, MD, Copy)",
    competitor1: "1 (Copy)",
    competitor2: "2 (PDF, Copy)",
  },
  {
    feature: "Browser Extension",
    clario: true,
    competitor1: false,
    competitor2: false,
  },
  {
    feature: "API Access",
    clario: true,
    competitor1: false,
    competitor2: true,
  },
  {
    feature: "History Management",
    clario: "50 summaries",
    competitor1: "None",
    competitor2: "10 summaries",
  },
  {
    feature: "No Login Required",
    clario: true,
    competitor1: false,
    competitor2: false,
  },
  {
    feature: "Free Tier",
    clario: "Full Features",
    competitor1: "Limited",
    competitor2: "Trial Only",
  },
  {
    feature: "Processing Speed",
    clario: "<2s",
    competitor1: "5-10s",
    competitor2: "3-5s",
  },
  {
    feature: "Privacy",
    clario: "Local Storage",
    competitor1: "Cloud Stored",
    competitor2: "Cloud Stored",
  },
];

const faqItems = [
  {
    question: "How accurate is it?",
    answer:
      "The accuracy depends heavily on the quality of your input. Vague transcripts will result in blunt, and sometimes unhelpful, output. Clear, well structured text yields the best results.",
  },
  {
    question: "What exactly is Brutal Roast mode?",
    answer:
      "It'''s a sarcastic, humorous critique of your text. It points out everything that could be wrong, from grammar to clarity, and suggests improvements in a very direct way.",
  },
  {
    question: "Do I need an account to use this?",
    answer:
      "Nope. There are no sign ups or logins. Everything runs locally in your browser, and your data is only stored in cookies for your convenience.",
  },
  {
    question: "Can I export the summaries?",
    answer:
      "Yes. You can instantly copy the generated summary text with a single click and paste it wherever you need it.",
  },
  {
    question: "Is my data saved anywhere?",
    answer:
      "No. Your data is not stored on any servers. All processing happens in your browser, and the text you paste is only kept in local storage for your convenience. It is never sent to or stored by us.",
  },
];

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
    href: "https://linkedin.com/in/muhammadtanveerabbas",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/muhammadtanveerabbas",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://x.com/m_tanveerabbas",
    icon: XIcon,
    label: "X",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/tool");
    }, 100);
  };

  return (
    <>
      {loading && <UniqueLoader />}
      <div className="flex min-h-dvh flex-col">
        <Navbar />
        <main className="flex-1">
          <section
            id="home"
            className="relative flex h-dvh min-h-[700px] w-full flex-col items-center justify-center overflow-hidden text-center -mt-14 sm:mt-0"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="absolute inset-0 -z-10 h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/50 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
            <div className="container z-10">
              <div className="inline-block mb-4 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm animate-fade-in">
                <span className="text-xs sm:text-sm text-gray-300 flex items-center gap-2 flex-wrap justify-center">
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4 text-[#4169E1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="whitespace-nowrap">Instant Summaries</span>
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="whitespace-nowrap">100% Free</span>
                  <span className="text-white/40">•</span>
                  <span className="whitespace-nowrap">No Sign Up</span>
                </span>
              </div>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up px-4">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Transform Text Into Ruthless Summaries.
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 bg-clip-text text-transparent animate-gradient">
                  Zero Fluff.
                </span>
                <br />
                <span className="text-[#4169E1]">Maximum Clarity.</span>
              </h1>
              <p
                className="mx-auto mt-6 max-w-2xl text-base sm:text-base md:text-lg text-gray-400 animate-fade-in-up px-4"
                style={{ animationDelay: "0.2s" }}
              >
                Transform meeting transcripts, articles, and documents into
                clear, actionable summaries. Our AI provides ruthless,
                structured insights in seconds. Free forever.
              </p>
              <div
                className="mt-10 flex items-center justify-center gap-x-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Button
                  size="lg"
                  onClick={handleCTAClick}
                  className="group relative overflow-hidden rounded-full bg-white px-8 py-6 text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                  aria-label="Try the Tool Now"
                >
                  <span className="relative z-10 flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-[#4169E1]" />
                    Try the Tool Now
                  </span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-gray-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </Button>
              </div>
              <div
                className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-500 animate-fade-in px-4"
                style={{ animationDelay: "0.6s" }}
              >
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-[#4169E1]" /> No Credit
                  Card
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-[#4169E1]" /> Instant
                  Access
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-[#4169E1]" /> Privacy
                  First
                </span>
              </div>
            </div>
          </section>

          <section
            id="stats"
            className="py-16 sm:py-20"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="group relative text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <p className="relative text-4xl font-bold text-white sm:text-5xl">
                      {stat.value}
                    </p>
                    <p className="relative mt-2 text-sm text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="features"
            className="py-24 sm:py-32"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                  Core Features
                </h2>
                <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Summarize Your Way
                </p>
                <p className="mt-6 text-lg leading-8 text-foreground/80">
                  Choose from ten powerful summarization modes to get the exact
                  output you need.
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                  {features.map((feature) => (
                    <Card
                      key={feature.title}
                      className="transform-gpu bg-accent/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-accent/50"
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                            <feature.icon
                              className="h-6 w-6 text-[#4169E1]"
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

          <section
            id="use-cases"
            className="py-24 sm:py-32"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                  Use Cases
                </h2>
                <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Built for Real-World Scenarios
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {useCases.map((useCase) => (
                  <Card
                    key={useCase.title}
                    className="bg-white/5 border-white/10"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                          <useCase.icon
                            className="h-6 w-6 text-[#4169E1]"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {useCase.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-400">
                          {useCase.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section
            id="extensions"
            className="py-24 sm:py-32"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                    Browser Extension
                  </h2>
                  <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                    Summarize Any Webpage
                  </p>
                  <p className="mt-6 text-lg leading-8 text-foreground/80">
                    Install our Chrome/Firefox extension and summarize any text
                    on any website with a right-click.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Chrome className="mr-2 h-5 w-5 text-[#4169E1]" />
                      Chrome
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Chrome className="mr-2 h-5 w-5 text-[#4169E1]" />
                      Firefox
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                    Developer API
                  </h2>
                  <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                    Integrate with Your Apps
                  </p>
                  <p className="mt-6 text-lg leading-8 text-foreground/80">
                    Use our REST API to add summarization to your applications,
                    bots, and workflows.
                  </p>
                  <div className="mt-8">
                    <Link href="/tool">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Code className="mr-2 h-5 w-5 text-[#4169E1]" />
                        View API Docs
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="pricing"
            className="py-24 sm:py-32"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                  Pricing
                </h2>
                <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Choose Your Plan
                </p>
                <p className="mt-6 text-lg leading-8 text-foreground/80">
                  Start free, upgrade when you need more power.
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                {pricingTiers.map((tier) => (
                  <Card
                    key={tier.name}
                    className={`relative flex flex-col bg-white/5 border-white/10 ${
                      tier.popular ? "ring-2 ring-white/20" : ""
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex rounded-full bg-white px-4 py-1 text-sm font-semibold text-black">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardContent className="flex flex-col flex-1 p-8">
                      <h3 className="text-2xl font-bold text-white">
                        {tier.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-400">
                        {tier.description}
                      </p>
                      <div className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-5xl font-bold text-white">
                          {tier.price}
                        </span>
                        <span className="text-sm text-gray-400">
                          {tier.period}
                        </span>
                      </div>
                      <ul className="mt-8 space-y-3 flex-1">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-[#4169E1] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/tool" className="mt-8">
                        <Button
                          className={`w-full ${
                            tier.popular
                              ? "bg-white text-black hover:bg-gray-200"
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`}
                        >
                          {tier.cta}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section
            id="comparison"
            className="py-24 sm:py-32"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                  Comparison
                </h2>
                <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Why Clario Wins
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-4 text-left text-sm font-semibold text-white">
                        Feature
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-semibold text-white">
                        <div className="flex flex-col items-center gap-1">
                          <span>Clario</span>
                          <span className="text-xs font-normal text-green-500">
                            (You are here)
                          </span>
                        </div>
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-semibold text-gray-400">
                        <div className="flex flex-col items-center gap-1">
                          <span>QuillBot</span>
                          <span className="text-xs font-normal text-gray-500">
                            Summarizer
                          </span>
                        </div>
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-semibold text-gray-400">
                        <div className="flex flex-col items-center gap-1">
                          <span>TLDR This</span>
                          <span className="text-xs font-normal text-gray-500">
                            AI Summarizer
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, idx) => (
                      <tr
                        key={row.feature}
                        className={idx % 2 === 0 ? "bg-white/5" : ""}
                      >
                        <td className="py-4 px-4 text-sm text-gray-300">
                          {row.feature}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {typeof row.clario === "boolean" ? (
                            row.clario ? (
                              <Check className="h-5 w-5 text-[#4169E1] mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-semibold text-white">
                              {row.clario}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {typeof row.competitor1 === "boolean" ? (
                            row.competitor1 ? (
                              <Check className="h-5 w-5 text-[#4169E1] mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-400">
                              {row.competitor1}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {typeof row.competitor2 === "boolean" ? (
                            row.competitor2 ? (
                              <Check className="h-5 w-5 text-[#4169E1] mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-400">
                              {row.competitor2}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section
            id="faq"
            className="py-24 sm:py-32"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="mx-auto mb-16 max-w-2xl text-center">
                <h2 className="text-base font-semibold leading-7 text-accent-foreground/60">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Have Questions? We Have Answers.
                </p>
                <p className="mt-6 text-lg leading-8 text-foreground/80">
                  Find answers to common questions about Clario, its features,
                  and how it works.
                </p>
              </div>
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8">
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem
                        value={`item-${index}`}
                        key={index}
                        className="border-border/50"
                      >
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
        <footer
          id="contact"
          className="text-primary-foreground border-t border-white/10"
          style={{ backgroundColor: "#000000" }}
        >
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="flex justify-center space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors duration-300 hover:text-white"
                >
                  <span className="sr-only">{item.label}</span>
                  <item.icon
                    className="h-4 w-4 sm:h-5 sm:w-5 text-[#4169E1]"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} Clario. Built by Muhammad
                Tanveer Abbas.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
