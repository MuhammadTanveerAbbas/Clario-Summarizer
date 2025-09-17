import { Navbar } from '@/components/layout/navbar';
import { SummarizerTool } from '@/components/layout/summarizer-tool';
import { Github, Linkedin } from 'lucide-react';

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


export default function ToolPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <section id="tool" className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h1 className="text-base font-semibold leading-7 text-accent-foreground/60">
                    Live Tool
                </h1>
                <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                    Try It Yourself
                </p>
                <p className="mt-6 text-lg leading-8 text-foreground/80">
                    Paste your text below, choose a summary style, and see the magic happen.
                </p>
            </div>
            <SummarizerTool />
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
