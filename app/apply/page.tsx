"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Apply() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen dark:bg-black flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/">
            <img src="/dogfood-logo.png" alt="Dogfood Digital" className="h-10 sm:h-11 w-auto -ml-1" style={{ filter: isDarkMode ? 'invert(1) brightness(1.2)' : 'none' }} suppressHydrationWarning />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-32 relative overflow-hidden">
        {/* Red spot glows - light mode */}
        <div className="dark:hidden absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#e0115f]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="dark:hidden absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#e0115f]/15 rounded-full blur-[110px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden dark:block absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#e0115f]/35 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="hidden dark:block absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#e0115f]/30 rounded-full blur-[110px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="ruby-text-gradient">Free Strategy Session</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 leading-relaxed font-light max-w-2xl mx-auto px-4">
            Book a 30-minute call with our team to validate your idea, map out your MVP roadmap, and get a clear path to launch in 0-3 weeks.
          </p>

          <div className="pt-4 space-y-4">
            <Link
              href="/apply/form"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#e0115f] text-white font-medium rounded-xl hover:bg-[#b80d4a] transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg ruby-glow"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <p className="text-sm text-foreground/50">
              Only for founders serious about building
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

