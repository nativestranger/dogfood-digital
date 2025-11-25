"use client";

import { useEffect, useRef, useState } from "react";
import ParallaxCard from "./components/ParallaxCard";
import Link from "next/link";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark, will sync on mount
  const [mounted, setMounted] = useState(false); // Track if component has mounted
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sync theme on mount
  useEffect(() => {
    setMounted(true);
    const shouldBeDark = true;
    setIsDarkMode(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
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

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".fade-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      parallaxRefs.current.forEach((ref, idx) => {
        if (ref) {
          let speed = 0.2;
          if (idx === 0) speed = 0.3;
          else if (idx === 1) speed = 0.5;
          else if (idx === 2) speed = 0.2;
          else if (idx === 3) speed = 0.4; // How We Work parallax
          else if (idx === 4) speed = 0.35; // FAQ parallax 1 - faster
          else if (idx === 5) speed = 0.15; // FAQ parallax 2 - slower
          ref.style.transform = `translateY(${scrollY * speed}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is Dogfood Digital?",
          a: "Dogfood Digital is the in-house agency behind RubyOnVibes — building production-ready apps with the tools we build ourselves. We practice what we preach by using RubyOnVibes, Rails, and React to deliver client work faster and better.",
        },
        {
          q: "What makes Dogfood Digital different from other agencies?",
          a: "We're the in-house agency of RubyOnVibes, giving us deep expertise in the Vibes stack, early access to new features, faster build cycles, and a direct line to the RubyOnVibes product team. Every project we take on is built for speed, design quality, and scalability using the tools we build ourselves.",
        },
        {
          q: "Who does Dogfood Digital work with?",
          a: "We work with startups, founders, and teams who want to move fast. Whether you need an MVP, want to scale an existing product, or need internal tools built, we use RubyOnVibes, Rails, and React to deliver production-ready apps.",
        },
        {
          q: "How many products has Dogfood Digital built?",
          a: "We're just getting started, but we're building in public. Follow @RubyOnVibesIntern to see our journey as we build real production apps using RubyOnVibes, Rails, and React.",
        },
      ],
    },
    {
      category: "Services & Process",
      questions: [
        {
          q: "What services does Dogfood Digital offer?",
          a: "We offer end-to-end development: MVP builds, product strategy, design, development, and ongoing support. We specialize in RubyOnVibes, Rails, React deployments. From idea validation to full-stack platforms, we build it all.",
        },
        {
          q: "What is RubyOnVibes and how does it work?",
          a: "RubyOnVibes is a modern full-stack framework that combines Rails with React for rapid development. As the in-house agency, we have deep expertise in the stack and use it to build production apps faster than agencies learning the stack for the first time.",
        },
        {
          q: "How does Dogfood Digital build apps with RubyOnVibes?",
          a: "We run focused sprints using RubyOnVibes, Rails, and React. Our deep familiarity with the stack means faster builds, fewer surprises, and better results. We know every edge case because we've hit them ourselves.",
        },
        {
          q: "Can Dogfood Digital help me validate my app idea?",
          a: "Absolutely. We start by building core functionality to validate your concept fast — so you can prove traction before investing big. Our 0-3 week MVP builds are perfect for testing ideas and getting to market quickly.",
        },
      ],
    },
    {
      category: "Pricing & Timelines",
      questions: [
        {
          q: "How much does it cost to build an app?",
          a: "MVP builds start at $1,000 for simple projects, with most MVPs ranging from $1,000-$5,000 depending on complexity. Growth builds and ongoing development are priced based on scope. We offer flexible pricing with no long-term contracts.",
        },
        {
          q: "How long does it take to build an app with Dogfood Digital?",
          a: "MVPs typically take 0-3 weeks from kickoff to launch. Our deep expertise in RubyOnVibes and Rails means we can move faster than agencies learning the stack. Ongoing sprints run bi-weekly for continuous improvement.",
        },
        {
          q: "Do you offer ongoing support after launch?",
          a: "Yes. We offer ongoing support, maintenance, and iteration packages. You can pause or cancel anytime — total flexibility, zero long-term commitments. Clients can continue with bi-weekly sprints for continuous improvement.",
        },
      ],
    },
    {
      category: "RubyOnVibes & Stack",
      questions: [
        {
          q: "What types of apps can Dogfood Digital build?",
          a: "We build SaaS apps, MVPs, dashboards, landing pages, internal tools, CRMs, and other full-stack platforms. Our stack is perfect for AI native web applications that need rapid development.",
        },
        {
          q: "Is the software built with RubyOnVibes scalable?",
          a: "Absolutely. Apps built with RubyOnVibes use Rails and React — proven, production-ready technologies, allowing you to scale from MVP to thousands or millions of users seamlessly.",
        },
      ],
    },
  ];

  return (
    <div className="scroll-smooth dark:bg-black relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center">
          <img 
            src="/dogfood-logo.png" 
            alt="Dogfood Digital" 
            className="h-10 sm:h-11 w-auto -ml-1 flex-shrink-0" 
            style={{ filter: mounted && isDarkMode ? 'invert(1) brightness(1.2)' : 'none' }} 
          />
          <div className="hidden md:flex items-center gap-6 text-sm ml-auto">
            <a href="#how-we-work" className="text-foreground/60 hover:text-foreground transition-colors">How We Work</a>
            <a href="#pricing" className="text-foreground/60 hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="text-foreground/60 hover:text-foreground transition-colors">FAQ</a>
            <Link
              href="/apply"
              className="px-5 py-2.5 bg-[#e0115f] text-white rounded-lg hover:bg-[#b80d4a] transition-all duration-300 font-medium ruby-glow"
            >
              Book a Call
            </Link>
            <a href="#contact" className="px-5 py-2.5 border-2 border-[#e0115f]/30 text-[#e0115f] rounded-lg hover:bg-[#e0115f]/10 transition-all duration-300 font-medium">Start a Project</a>
          </div>
          <div className="md:hidden flex items-center gap-3 ml-auto">
            <Link
              href="/apply"
              className="px-4 py-2 bg-[#e0115f] text-white rounded-lg text-sm font-medium"
            >
              Book Call
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 py-32 pt-32 relative overflow-hidden dark:bg-black">
        <div ref={(el) => { parallaxRefs.current[0] = el; }} className="geometric-splash geometric-splash-1 parallax-slow"></div>
        <div ref={(el) => { parallaxRefs.current[1] = el; }} className="geometric-splash geometric-splash-2 parallax-fast"></div>
        {/* Red spot glows - light mode */}
        <div className="hidden md:block dark:hidden absolute top-20 left-1/4 w-[400px] h-[400px] bg-[#e0115f]/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="hidden md:block dark:hidden absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#e0115f]/15 rounded-full blur-[90px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden md:dark:block absolute top-20 left-1/4 w-[400px] h-[400px] bg-[#e0115f]/25 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="hidden md:dark:block absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#e0115f]/20 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12 fade-on-scroll opacity-0 relative z-10 w-full">
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background dark:bg-white/5 border border-foreground/10 dark:border-[#e0115f]/50">
                <span className="text-sm font-medium text-foreground/80">Official partner of</span>
                <a href="https://www.rubyonvibes.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold ruby-text-gradient hover:opacity-80 transition-opacity">RubyOnVibes</a>
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight sm:leading-[0.95] px-2">
              <span className="text-foreground">The partner for </span>
              <span className="ruby-text-gradient">AI native founders</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto leading-relaxed font-light px-4">
              The in-house agency behind RubyOnVibes — building full-stack apps with Rails, React, and the tools we build ourselves.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 px-4">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[#e0115f] text-white font-medium rounded-xl hover:bg-[#b80d4a] transition-all duration-300 hover:scale-105 hover:shadow-2xl text-base sm:text-lg ruby-glow text-center"
            >
              Start a Project
            </a>
            <a
              href="#built-in-public"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-[#e0115f]/30 text-[#e0115f] font-medium rounded-xl hover:bg-[#e0115f]/10 hover:border-[#e0115f]/50 transition-all duration-300 hover:scale-105 text-base sm:text-lg text-center"
            >
              See How We Build in Public
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-y border-foreground/5 relative overflow-hidden dark:bg-black dark:border-[#e0115f]/20">
        <div ref={(el) => { parallaxRefs.current[2] = el; }} className="geometric-splash geometric-splash-3 parallax-slow"></div>
        {/* Red spot glows - light mode */}
        <div className="hidden md:block dark:hidden absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#e0115f]/12 rounded-full blur-[90px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden md:dark:block absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#e0115f]/20 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { value: "100%", label: "Stack Dogfooding", sublabel: "Every project uses our own tools" },
              { value: "0-3", label: "Weeks to MVP", sublabel: "Fast iteration, real results" },
              { value: "∞", label: "Continuous Improvement", sublabel: "Every build makes the stack better" },
            ].map((stat, idx) => (
              <ParallaxCard
                key={idx}
                delay={idx * 0.1}
                parallaxStrength={10}
                hoverLift={3}
                className="text-center px-4"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 ruby-text-gradient whitespace-nowrap">{stat.value}</div>
                <div className="text-base sm:text-lg font-semibold mb-1 no-break-words">{stat.label}</div>
                <div className="text-sm text-foreground/50">{stat.sublabel}</div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </section>

      {/* What Is Dogfood Digital */}
      <section className="py-20 sm:py-32 px-6 sm:px-8 dark:bg-black relative overflow-hidden">
        {/* Red spot glows - light mode */}
        <div className="hidden md:block dark:hidden absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#e0115f]/14 rounded-full blur-[95px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden md:dark:block absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#e0115f]/22 rounded-full blur-[95px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto fade-on-scroll opacity-0 relative z-10">
          <div className="space-y-6 px-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Dogfood Digital
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/60 leading-relaxed font-light">
              We practice what we preach. Dogfood Digital builds real, production applications using RubyOnVibes, Rails, and React. As the in-house agency behind RubyOnVibes, we have deep expertise in the stack and ship faster because we know every edge case. The result? Better products, delivered faster.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="how-we-work" className="py-20 sm:py-32 px-6 sm:px-8 relative overflow-hidden bg-white dark:bg-black">
        <div className="animated-gradient absolute inset-0 opacity-[0.03] dark:opacity-[0.2]"></div>
        <div ref={(el) => { parallaxRefs.current[3] = el; }} className="geometric-splash geometric-splash-1 parallax-slow opacity-0 dark:opacity-[0.3]" style={{ top: "10%", right: "-10%" }}></div>
        {/* Red spot glows - light mode */}
        <div className="hidden md:block dark:hidden absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#e0115f]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="hidden md:block dark:hidden absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-[#e0115f]/12 rounded-full blur-[110px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden md:dark:block absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#e0115f]/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="hidden md:dark:block absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-[#e0115f]/25 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center tracking-tight fade-on-scroll opacity-0">
            How We Work
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 text-center mb-12 sm:mb-20 fade-on-scroll opacity-0 px-4 max-w-3xl mx-auto">
            We simplify complex builds into fast, focused sprints that ship real results every week.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {[
              {
                step: "01",
                title: "Build",
                subtitle: "Your MVP in 0-3 weeks",
                description: "We start by designing and developing core functionality to validate your concept fast — so you can prove traction before investing big.",
              },
              {
                step: "02",
                title: "Iterate",
                subtitle: "Set your roadmap",
                description: "Once live, we help you define clear goals and run bi-weekly sprints to ship features, improve UX, and scale efficiently.",
              },
              {
                step: "03",
                title: "Grow",
                subtitle: "Move faster with our stack",
                description: "We leverage RubyOnVibes, Rails, and React to build at unmatched speed — combining proven patterns with real engineering best practices.",
              },
              {
                step: "04",
                title: "Collaborate",
                subtitle: "Stay flexible, async-first",
                description: "Join weekly calls, stay connected asynchronously, and pause or cancel anytime — total flexibility, zero long-term commitments.",
              },
            ].map((item, idx) => (
              <ParallaxCard
                key={idx}
                delay={idx * 0.08}
                parallaxStrength={15}
                className="p-6 sm:p-7 lg:p-8 rounded-2xl bg-background dark:bg-black/80 shadow-lg dark:shadow-[#e0115f]/10 hover:shadow-xl dark:hover:shadow-[#e0115f]/20 transition-shadow duration-500 group relative overflow-hidden border border-foreground/5 dark:border-[#e0115f]/20 hover:border-[#e0115f]/20 dark:hover:border-[#e0115f]/40"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e0115f]/0 via-[#e0115f]/0 to-[#e0115f]/[0.02] dark:from-[#e0115f]/[0.08] dark:via-[#e0115f]/[0.04] dark:to-[#e0115f]/[0.12] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Subtle red glow in dark mode */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e0115f]/0 via-transparent to-[#e0115f]/0 dark:from-[#e0115f]/[0.05] dark:via-[#e0115f]/[0.02] dark:to-[#e0115f]/[0.08] pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e0115f]/10 to-[#e0115f]/5 dark:from-[#e0115f]/30 dark:to-[#e0115f]/20 flex items-center justify-center group-hover:from-[#e0115f]/20 group-hover:to-[#e0115f]/10 dark:group-hover:from-[#e0115f]/50 dark:group-hover:to-[#e0115f]/30 transition-all duration-300 shadow-sm dark:shadow-[#e0115f]/20">
                      <span className="text-sm font-mono text-[#e0115f] dark:text-[#ff1a6b] font-bold">{item.step}</span>
                    </div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-[#e0115f]/30 via-[#e0115f]/15 to-transparent" style={{ background: mounted && isDarkMode ? 'linear-gradient(to right, #e0115f, rgba(224, 17, 95, 0.5), transparent)' : undefined }}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 no-break-words group-hover:text-[#e0115f] dark:group-hover:text-[#ff1a6b] transition-colors duration-300">{item.title}</h3>
                  <div className="text-sm font-medium text-[#e0115f]/80 dark:text-[#ff1a6b] mb-3 sm:mb-4">{item.subtitle}</div>
                  <p className="text-sm sm:text-sm lg:text-base text-foreground/60 dark:text-foreground/80 leading-relaxed group-hover:text-foreground/70 dark:group-hover:text-foreground/90 transition-colors duration-300">{item.description}</p>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-32 px-6 sm:px-8 bg-background dark:bg-black relative overflow-hidden">
        {/* Red spot glows - light mode */}
        <div className="hidden md:block dark:hidden absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#e0115f]/18 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="hidden md:block dark:hidden absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#e0115f]/15 rounded-full blur-[100px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden md:dark:block absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#e0115f]/28 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="hidden md:dark:block absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#e0115f]/22 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center tracking-tight fade-on-scroll opacity-0">
            Pricing
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 text-center mb-12 sm:mb-20 fade-on-scroll opacity-0 px-4">
            Your own fractionalized team, with flexible pricing. No contract term.
          </p>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Strategy Session */}
            <ParallaxCard
              delay={0}
              parallaxStrength={12}
              hoverLift={6}
              className="p-6 sm:p-8 lg:p-10 rounded-2xl border-2 border-foreground/10 dark:border-[#e0115f]/20 bg-background dark:bg-black shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg border-2 border-[#e0115f]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#e0115f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold no-break-words whitespace-nowrap">Strategy Session</h3>
                  <p className="text-xs sm:text-sm text-foreground/60">1-hour deep dive + PRD</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Complete 1-page technical blueprint
              </p>
              <div className="mb-6">
                <div className="text-4xl sm:text-5xl font-bold ruby-text-gradient mb-1 whitespace-nowrap">$200</div>
                <div className="text-sm text-foreground/60 whitespace-nowrap">/ One-time</div>
                <div className="text-sm text-foreground/50 mt-2">Perfect for early validation</div>
              </div>
              <Link
                href="/apply"
                className="block w-full px-6 py-3 bg-[#e0115f] text-white font-medium rounded-lg hover:bg-[#b80d4a] transition-all duration-300 text-center mb-6 ruby-glow"
              >
                Book a Call
              </Link>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Stack options</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">MVP scope & timeline</span>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-foreground/5">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#e0115f] font-medium text-sm">$200 credit toward any build</span>
                </div>
              </div>
            </ParallaxCard>

            {/* MVP Build */}
            <ParallaxCard
              delay={0.1}
              parallaxStrength={12}
              hoverLift={6}
              className="p-6 sm:p-8 lg:p-10 rounded-2xl border-2 border-[#e0115f]/20 bg-background dark:bg-black shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg ruby-gradient flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#e0115f]/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold no-break-words whitespace-nowrap">MVP Build</h3>
                  <p className="text-xs sm:text-sm text-foreground/60">Delivered in 0–3 weeks</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Limited to 3–5 core features
              </p>
              <div className="mb-6">
                <div className="text-4xl sm:text-5xl font-bold ruby-text-gradient mb-1 whitespace-nowrap">$1000</div>
                <div className="text-sm text-foreground/60 whitespace-nowrap">/ One-time</div>
                <div className="text-sm text-foreground/50 mt-2">Starting price for MVPs</div>
              </div>
              <a
                href="#contact"
                className="block w-full px-6 py-3 bg-[#e0115f] text-white font-medium rounded-lg hover:bg-[#b80d4a] transition-all duration-300 text-center mb-6 ruby-glow"
              >
                Get Started Today
              </a>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Functional MVP using RubyOnVibes</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Authentication</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Database + API integrations</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Core UI components</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Deployment</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Slack</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">2 check-ins/week</span>
                </div>
              </div>
            </ParallaxCard>

            {/* Growth Build */}
            <ParallaxCard
              delay={0.2}
              parallaxStrength={12}
              hoverLift={8}
              className="p-6 sm:p-8 lg:p-10 rounded-2xl border-2 border-[#e0115f]/30 bg-background dark:bg-black relative overflow-hidden shadow-xl shadow-[#e0115f]/10 dark:shadow-[#e0115f]/25 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="ruby-gradient-subtle absolute inset-0 opacity-5 dark:opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg ruby-gradient flex items-center justify-center flex-shrink-0 shadow-xl shadow-[#e0115f]/30 ring-2 ring-[#e0115f]/10 ring-offset-2 dark:ring-offset-black">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold no-break-words whitespace-nowrap">Growth Build</h3>
                    <p className="text-xs sm:text-sm text-foreground/60">Bi-weekly sprints</p>
                  </div>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Continuous improvement 
                </p>
                <div className="mb-6">
                  <div className="text-4xl sm:text-5xl font-bold mb-1 ruby-text-gradient whitespace-nowrap">$2500</div>
                  <div className="text-sm text-foreground/60 whitespace-nowrap">/ Every 2 weeks</div>
                  <div className="text-sm text-foreground/50 mt-2">Pause or cancel anytime</div>
                </div>
                <Link
                  href="/apply"
                  className="block w-full px-6 py-3 bg-[#e0115f] text-white font-medium rounded-lg hover:bg-[#b80d4a] transition-all duration-300 text-center mb-6 ruby-glow shadow-lg shadow-[#e0115f]/20"
                >
                  Book a Call
                </Link>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/70">Dedicated RubyOnVibes team</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/70">Unlimited revisions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/70">Roadmap & strategy</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/70">Integrations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/70">Slack</span>
                  </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">3 check-ins/week</span>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-foreground/5">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#e0115f] font-medium text-sm">Guaranteed meaningful product update every sprint</span>
                </div>
              </div>
              </div>
            </ParallaxCard>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-32 px-6 sm:px-8 bg-background dark:bg-black relative overflow-hidden">
        {/* Red spot glows - light mode */}
        <div className="hidden md:block dark:hidden absolute top-1/4 left-1/3 w-[420px] h-[420px] bg-[#e0115f]/16 rounded-full blur-[105px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden md:dark:block absolute top-1/4 left-1/3 w-[420px] h-[420px] bg-[#e0115f]/24 rounded-full blur-[105px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center tracking-tight fade-on-scroll opacity-0">
            Why Choose <span className="ruby-text-gradient">Dogfood Digital</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 text-center mb-12 sm:mb-20 fade-on-scroll opacity-0 px-4">
            We build polished, production-ready products that AI native.
          </p>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                title: "Extreme Agility",
                description: "We move fast because we know our tools inside and out. Your MVP ships in weeks, not months — without cutting corners on quality or design.",
              },
              {
                title: "Design that converts",
                description: "Great products need great UX. We obsess over details that matter: intuitive flows, polished interfaces, and experiences that users love.",
              },
              {
                title: "Built to scale",
                description: "Every app we build uses production-ready patterns from day one. Scale from MVP to thousands of users without rewriting or refactoring.",
              },
            ].map((feature, idx) => (
              <ParallaxCard
                key={idx}
                delay={idx * 0.1}
                parallaxStrength={18}
                hoverLift={5}
                className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-foreground/5 dark:border-[#e0115f]/20 hover:border-[#e0115f]/30 dark:hover:border-[#e0115f]/40 transition-all duration-300 bg-background dark:bg-black/80 shadow-md hover:shadow-lg"
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 no-break-words">{feature.title}</h3>
                <p className="text-base sm:text-lg text-foreground/60 dark:text-foreground/80 leading-relaxed">{feature.description}</p>
              </ParallaxCard>
            ))}
          </div>
          <div className="mt-12 sm:mt-16 text-center fade-on-scroll opacity-0">
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto px-4">
              As the in-house agency behind <span className="font-semibold text-[#e0115f]">RubyOnVibes</span>, we have deep expertise in the stack and a direct line to the framework team. Every project we ship makes the tools better for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-32 px-6 sm:px-8 bg-background dark:bg-black relative overflow-hidden">
        <div className="animated-gradient absolute inset-0 opacity-[0.02] dark:opacity-[0.12]"></div>
        <div ref={(el) => { parallaxRefs.current[4] = el; }} className="geometric-splash geometric-splash-2 parallax-fast" style={{ top: '10%', right: '-5%', opacity: '0.08' }}></div>
        <div ref={(el) => { parallaxRefs.current[5] = el; }} className="geometric-splash geometric-splash-3 parallax-slow" style={{ bottom: '20%', left: '-5%', opacity: '0.06' }}></div>
        {/* Red spot glows - light mode */}
        <div className="hidden md:block dark:hidden absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-[#e0115f]/14 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="hidden md:block dark:hidden absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#e0115f]/10 rounded-full blur-[110px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden md:dark:block absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-[#e0115f]/22 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="hidden md:dark:block absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#e0115f]/18 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 sm:mb-20 text-center tracking-tight fade-on-scroll opacity-0">
            FAQs
          </h2>
          <div className="space-y-6">
            {faqs.map((category, catIdx) => (
              <div key={catIdx} className="fade-on-scroll opacity-0 transition-transform duration-700 ease-out" style={{ animationDelay: `${catIdx * 0.15}s` }}>
                <h3 className="text-sm font-semibold text-foreground/40 mb-4 uppercase tracking-wider">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIdx) => {
                    const index = catIdx * 100 + faqIdx;
                    const isOpen = openFAQ === index;
                    return (
                      <div
                        key={faqIdx}
                        className={`border border-foreground/10 dark:border-[#e0115f]/15 rounded-xl bg-background dark:bg-black/80 hover:border-foreground/20 dark:hover:border-[#e0115f]/30 hover:shadow-lg dark:hover:shadow-[#e0115f]/10 transition-all duration-300 hover:-translate-y-1 ${isOpen ? "border-[#e0115f]/30 dark:border-[#e0115f]/50 shadow-lg dark:shadow-[#e0115f]/20 translate-y-0" : ""}`}
                      >
                        <button
                          onClick={() => setOpenFAQ(isOpen ? null : index)}
                          className={`w-full px-6 py-5 text-left flex justify-between items-center gap-4 transition-colors rounded-xl ${isOpen ? "" : "hover:bg-foreground/5"}`}
                        >
                          <span className="text-lg font-semibold pr-8">{faq.q}</span>
                          <svg
                            className={`w-5 h-5 text-foreground/40 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-[#e0115f]" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 pt-0 animate-fade-in">
                            <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 sm:py-32 px-6 sm:px-8 relative overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.2]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #e0115f 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        {/* Red spot glows - light mode */}
        <div className="hidden md:block dark:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e0115f]/25 rounded-full blur-[140px] pointer-events-none"></div>
        {/* Red spot glows - dark mode */}
        <div className="hidden md:dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e0115f]/40 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center fade-on-scroll opacity-0 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 tracking-tight px-4">
            <span className="ruby-text-gradient">Start your project</span>
            <span className="text-foreground"> with us today</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 mb-8 sm:mb-12 font-light px-4">
            Ready to build something great? Let's talk about your project.
          </p>
          <a
            href="/start-project"
            className="inline-block px-8 sm:px-10 py-4 sm:py-5 bg-[#e0115f] text-white font-medium rounded-xl hover:bg-[#b80d4a] transition-all duration-300 hover:scale-105 hover:shadow-2xl text-base sm:text-lg ruby-glow"
          >
            Start a Project
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 bg-background dark:bg-black border-t border-foreground/5 dark:border-[#e0115f]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-foreground/5">
            <img 
              src="/dogfood-logo.png" 
              alt="Dogfood Digital" 
              className="h-14 sm:h-16 w-auto" 
              style={{ filter: mounted && isDarkMode ? 'invert(1) brightness(1.2)' : 'none' }} 
            />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
              <a
                href="#how-we-work"
                className="text-foreground/60 hover:text-[#e0115f] transition-colors"
              >
                How We Work
              </a>
              <a
                href="#pricing"
                className="text-foreground/60 hover:text-[#e0115f] transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-foreground/60 hover:text-[#e0115f] transition-colors"
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="text-foreground/60 hover:text-[#e0115f] transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 text-center">
            <p className="text-sm text-foreground/40">
              Always shipping. Always dogfooding.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
