"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: "#000000" }}>
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/50 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container z-10 px-4 text-center">
        <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm animate-fade-in">
          <span className="text-sm text-gray-300 flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            Page Not Found
          </span>
        </div>

        <h1 className="font-headline text-8xl sm:text-9xl md:text-[12rem] font-bold text-white animate-fade-in-up mb-4">
          404
        </h1>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Lost in the <span className="text-[#4169E1]">Digital Void</span>
          </h2>
          <p className="mx-auto max-w-md text-base sm:text-lg text-gray-400">
            This page doesn't exist. Maybe it was summarized out of existence, or you took a wrong turn.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Link href="/">
            <Button size="lg" className="group relative overflow-hidden rounded-full bg-white px-8 py-6 text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 w-full sm:w-auto">
              <span className="relative z-10 flex items-center">
                <Home className="mr-2 h-5 w-5 text-[#4169E1]" />
                Back to Home
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-gray-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Button>
          </Link>
          <Link href="/tool">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 w-full sm:w-auto">
              <Search className="mr-2 h-5 w-5 text-[#4169E1]" />
              Try the Tool
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
