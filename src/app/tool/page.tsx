import { Navbar } from "@/components/layout/navbar";
import { SummarizerTool } from "@/components/layout/summarizer-tool";
import { Github, Linkedin } from "lucide-react";

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

export const metadata = {
  title: "AI Summarizer Tool",
  description:
    "Transform any text into clear, actionable summaries in seconds. 10 powerful summary modes including Action Items, Executive Brief, SWOT Analysis, and more.",
};

export default function ToolPage() {
  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{ backgroundColor: "#000000" }}
    >
      <Navbar />
      <main className="flex-1">
        <section
          id="tool"
          className="py-6 sm:py-8"
          style={{ backgroundColor: "#000000" }}
        >
          <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
            <div className="mx-auto max-w-2xl text-center mb-4 sm:mb-6">
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                Summarize Your Text
              </h1>
              <p className="mt-2 text-xs text-gray-400 sm:text-sm">
                Transform meeting transcripts, articles, and documents into
                clear, actionable summaries in seconds.
              </p>
            </div>
            <SummarizerTool />
          </div>
        </section>
      </main>
      <footer
        id="contact"
        className="text-primary-foreground border-t border-white/10"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex justify-center space-x-6">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300 hover:text-white hover:glow"
              >
                <span className="sr-only">{item.label}</span>
                <item.icon
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
          <div className="mt-10 text-center text-sm leading-5 text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Clario. Built by Muhammad
              Tanveer Abbas.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
