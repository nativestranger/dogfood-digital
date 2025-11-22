"use client";

import { useForm, ValidationError } from "@formspree/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StartProject() {
  const [state, handleSubmit] = useForm("xqajpgny");
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
    <div className="min-h-screen dark:bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/">
            <img src="/dogfood-logo.png" alt="Dogfood Digital" className="h-10 sm:h-11 w-auto -ml-1" style={{ filter: isDarkMode ? 'invert(1) brightness(1.2)' : 'none' }} />
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-foreground/5 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-foreground/60 hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-foreground/60 hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <Link href="/" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Form Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Red spot glows - light mode */}
        <div className="dark:hidden absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#e0115f]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="dark:hidden absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#e0115f]/12 rounded-full blur-[110px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden dark:block absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#e0115f]/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="hidden dark:block absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#e0115f]/25 rounded-full blur-[110px] pointer-events-none"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="ruby-text-gradient">Start your project</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/60 font-light">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          {state.succeeded ? (
            <div className="text-center p-8 sm:p-12 bg-background dark:bg-black/80 rounded-2xl border-2 border-[#e0115f]/30">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e0115f]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#e0115f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Thanks for reaching out!</h3>
              <p className="text-foreground/60 mb-6">We'll get back to you shortly to discuss your project.</p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-[#e0115f] text-white font-medium rounded-lg hover:bg-[#b80d4a] transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-background dark:bg-black/80 p-6 sm:p-8 rounded-2xl border border-foreground/10 dark:border-[#e0115f]/20">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-background dark:bg-white/5 border border-foreground/10 dark:border-[#e0115f]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e0115f]/50 focus:border-transparent transition-all text-foreground"
                  placeholder="John Doe"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-background dark:bg-white/5 border border-foreground/10 dark:border-[#e0115f]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e0115f]/50 focus:border-transparent transition-all text-foreground"
                  placeholder="john@example.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium mb-2 text-foreground/80">
                  Project Type *
                </label>
                <select
                  id="project"
                  name="project"
                  required
                  className="w-full px-4 py-3 bg-background dark:bg-white/5 border border-foreground/10 dark:border-[#e0115f]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e0115f]/50 focus:border-transparent transition-all text-foreground"
                >
                  <option value="">Select a project type</option>
                  <option value="strategy">Strategy Session</option>
                  <option value="mvp">MVP Build (0-4 weeks)</option>
                  <option value="growth">Growth Build (Ongoing)</option>
                </select>
                <ValidationError prefix="Project" field="project" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">
                  Tell us about your project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-background dark:bg-white/5 border border-foreground/10 dark:border-[#e0115f]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e0115f]/50 focus:border-transparent transition-all resize-none text-foreground"
                  placeholder="Share your vision, goals, timeline, and any other details that will help us understand your project..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full px-8 py-4 bg-[#e0115f] text-white font-medium rounded-xl hover:bg-[#b80d4a] transition-all duration-300 hover:scale-105 hover:shadow-2xl text-base sm:text-lg ruby-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {state.submitting ? "Sending..." : "Submit Project"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

