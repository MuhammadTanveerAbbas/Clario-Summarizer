"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Github, Menu, StickyNote, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/tool', label: 'Tool' },
  { href: '/#faq', label: 'FAQ' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex flex-1 items-center justify-start ml-[3%]">
          <Link href="/" className="flex items-center space-x-2">
              <StickyNote className="h-5 w-5 text-accent-foreground/80" />
              <span className="font-bold sm:inline-block">Clario</span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end">
            <a href="https://github.com/muhammadtanveerabbas/clario-ai-summarizer" target="_blank" rel="noopener noreferrer" className="hidden md:block">
                <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                </Button>
            </a>
        </div>


        <div className="flex items-center justify-end space-x-2 md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <VisuallyHidden>
                  <SheetTitle>Mobile Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <StickyNote className="h-5 w-5 text-accent-foreground/80" />
                    <span className="font-bold">Clario</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </div>
                <nav className="mt-6 flex flex-col space-y-4 text-lg font-medium">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-foreground/60 transition-colors hover:text-foreground/80"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
