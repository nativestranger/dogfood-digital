"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          a: "Absolutely. We start by building core functionality to validate your concept fast — so you can prove traction before investing big. Our 2-4 week MVP builds are perfect for testing ideas and getting to market quickly.",
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
          a: "MVPs typically take 2-4 weeks from kickoff to launch. Our deep expertise in RubyOnVibes and Rails means we can move faster than agencies learning the stack. Ongoing sprints run bi-weekly for continuous improvement.",
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
    <div className="scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-lg font-semibold">Dogfood Digital</div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#how-we-work" className="text-foreground/60 hover:text-foreground transition-colors">How We Work</a>
            <a href="#pricing" className="text-foreground/60 hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="text-foreground/60 hover:text-foreground transition-colors">FAQ</a>
            <a href="#contact" className="px-5 py-2.5 bg-[#e0115f] text-white rounded-lg hover:bg-[#b80d4a] transition-all duration-300 font-medium ruby-glow">Start a Project</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 pt-32 relative overflow-hidden">
        <div ref={(el) => { parallaxRefs.current[0] = el; }} className="geometric-splash geometric-splash-1 parallax-slow"></div>
        <div ref={(el) => { parallaxRefs.current[1] = el; }} className="geometric-splash geometric-splash-2 parallax-fast"></div>
        <div className="max-w-5xl mx-auto text-center space-y-12 fade-on-scroll opacity-0 relative z-10">
          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9]">
              <span className="text-foreground">Built by the </span>
              <span className="ruby-text-gradient">makers of RubyOnVibes</span>
          </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-foreground/60 max-w-3xl mx-auto leading-relaxed font-light">
              The in-house agency behind RubyOnVibes — building production-ready apps with the tools we build ourselves.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="#contact"
              className="px-10 py-5 bg-[#e0115f] text-white font-medium rounded-xl hover:bg-[#b80d4a] transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg ruby-glow"
            >
              Start a Project
            </a>
            <a
              href="#built-in-public"
              className="px-10 py-5 border-2 border-[#e0115f]/30 text-[#e0115f] font-medium rounded-xl hover:bg-[#e0115f]/10 hover:border-[#e0115f]/50 transition-all duration-300 hover:scale-105 text-lg"
            >
              See How We Build in Public
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 border-y border-foreground/5 relative overflow-hidden">
        <div ref={(el) => { parallaxRefs.current[2] = el; }} className="geometric-splash geometric-splash-3 parallax-slow"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { value: "100%", label: "Stack Dogfooding", sublabel: "Every project uses our own tools" },
              { value: "2-4", label: "Weeks to MVP", sublabel: "Fast iteration, real results" },
              { value: "∞", label: "Continuous Improvement", sublabel: "Every build makes the stack better" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="fade-on-scroll opacity-0 text-center"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-5xl md:text-6xl font-bold mb-2 ruby-text-gradient">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-foreground/50">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Is Dogfood Digital */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto fade-on-scroll opacity-0">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Dogfood Digital
            </h2>
            <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-light">
              We practice what we preach. Dogfood Digital builds real, production applications using RubyOnVibes, Rails, and React. As the in-house agency behind RubyOnVibes, we have deep expertise in the stack and ship faster because we know every edge case. The result? Better products, delivered faster.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="how-we-work" className="py-32 px-6 relative overflow-hidden">
        <div className="animated-gradient absolute inset-0 opacity-5"></div>
        <div ref={(el) => { parallaxRefs.current[3] = el; }} className="geometric-splash geometric-splash-1 parallax-slow" style={{ top: "10%", right: "-10%" }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center tracking-tight fade-on-scroll opacity-0">
            How We Work
          </h2>
          <p className="text-xl text-foreground/60 text-center mb-20 fade-on-scroll opacity-0">
            We simplify complex builds into fast, focused sprints that ship real results every week.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Build",
                subtitle: "Your MVP in 2-4 weeks",
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
              <div
                key={idx}
                className="fade-on-scroll opacity-0 hover-lift p-8 rounded-2xl border border-foreground/5 bg-background hover:border-[#e0115f]/20 transition-all duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-sm font-mono text-[#e0115f] mb-4 font-semibold">{item.step}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <div className="text-sm font-medium text-foreground/60 mb-4">{item.subtitle}</div>
                <p className="text-foreground/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center tracking-tight fade-on-scroll opacity-0">
            Pricing
          </h2>
          <p className="text-xl text-foreground/60 text-center mb-20 fade-on-scroll opacity-0">
            Your own fractionalized team, with flexible pricing. No contract term.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Strategy Session */}
            <div className="fade-on-scroll opacity-0 hover-lift p-8 rounded-2xl border-2 border-foreground/10 bg-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg border-2 border-foreground/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Strategy Session</h3>
                  <p className="text-xs text-foreground/50">1-hour consultation</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
                Not sure where to start? Let's talk through your idea, stack choices, and roadmap.
              </p>
              <div className="mb-4">
                <div className="text-3xl font-bold text-foreground mb-1">$500</div>
                <div className="text-xs text-foreground/50">/ One-time</div>
              </div>
              <div className="mb-4 p-3 bg-[#e0115f]/10 border border-[#e0115f]/20 rounded-lg">
                <p className="text-xs text-[#e0115f] font-medium">
                  ✓ Credit applies to MVP or Growth plans if you hire us
                </p>
              </div>
              <a
                href="#contact"
                className="block w-full px-4 py-2.5 border-2 border-foreground/20 text-foreground font-medium rounded-lg hover:bg-foreground/5 transition-all duration-300 text-center mb-4 text-sm"
              >
                Book a Call
              </a>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/60">Technical roadmap</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/60">Stack recommendations</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/60">MVP scope & timeline</span>
                </div>
              </div>
            </div>

            {/* MVP Build */}
            <div className="fade-on-scroll opacity-0 hover-lift p-10 rounded-2xl border-2 border-foreground/10 bg-background">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg ruby-gradient flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">MVP Build</h3>
                  <p className="text-sm text-foreground/60">We deliver an MVP in 2-4 weeks</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Perfect for validating your idea fast. Get a full working product ready to launch.
              </p>
              <div className="mb-6">
                <div className="text-5xl font-bold ruby-text-gradient mb-1">$1,000</div>
                <div className="text-sm text-foreground/60">/ One-time</div>
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
                  <span className="text-foreground/70">Functional MVP built with RubyOnVibes</span>
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
                  <span className="text-foreground/70">User authentication & onboarding</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Product design components</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Communication via Slack</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/70">Bi-weekly progress updates</span>
                </div>
              </div>
            </div>

            {/* Growth Build */}
            <div className="fade-on-scroll opacity-0 hover-lift p-10 rounded-2xl border-2 border-[#e0115f]/20 bg-background relative overflow-hidden">
              <div className="ruby-gradient-subtle absolute inset-0 opacity-5"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg border-2 border-[#e0115f]/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#e0115f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Growth Build</h3>
                    <p className="text-sm text-foreground/60">Bi-weekly sprints for scaling</p>
                  </div>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Scale your product with proven patterns. Continuous improvement through focused sprints.
                </p>
                <div className="mb-6">
                  <div className="text-5xl font-bold mb-1 ruby-text-gradient">$2,500</div>
                  <div className="text-sm text-foreground/60">/ Every 2 weeks</div>
                  <div className="text-sm text-foreground/50 mt-2">Pause or cancel anytime</div>
                </div>
                <a
                  href="#contact"
                  className="block w-full px-6 py-3 border-2 border-[#e0115f]/30 text-[#e0115f] font-medium rounded-lg hover:bg-[#e0115f]/10 hover:border-[#e0115f]/50 transition-all duration-300 text-center mb-6"
                >
                  Book a Call
                </a>
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
                    <span className="text-foreground/70">Product strategy & roadmap</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/70">Integrations & APIs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/70">Communication via Slack</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#e0115f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/70">Tri-weekly progress updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center tracking-tight fade-on-scroll opacity-0">
            Why Choose <span className="ruby-text-gradient">Dogfood Digital</span>
          </h2>
          <p className="text-xl text-foreground/60 text-center mb-20 fade-on-scroll opacity-0">
            We build polished, production-ready products that AI native.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Speed without compromise",
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
              <div
                key={idx}
                className="fade-on-scroll opacity-0 hover-lift p-10 rounded-2xl border border-foreground/5 hover:border-[#e0115f]/30 transition-all duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg text-foreground/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center fade-on-scroll opacity-0">
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              As the in-house agency behind <span className="font-semibold text-[#e0115f]">RubyOnVibes</span>, we have deep expertise in the stack and a direct line to the framework team. Every project we ship makes the tools better for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center tracking-tight fade-on-scroll opacity-0">
            FAQs
          </h2>
          <div className="space-y-6">
            {faqs.map((category, catIdx) => (
              <div key={catIdx} className="fade-on-scroll opacity-0" style={{ animationDelay: `${catIdx * 0.1}s` }}>
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
                        className={`border border-foreground/10 rounded-xl bg-background hover:border-foreground/20 transition-all duration-300 ${isOpen ? "border-[#e0115f]/30" : ""}`}
                      >
                        <button
                          onClick={() => setOpenFAQ(isOpen ? null : index)}
                          className={`w-full px-6 py-5 text-left flex justify-between items-center gap-4 transition-colors rounded-xl ${isOpen ? "" : "hover:bg-foreground/5"}`}
                        >
                          <span className="text-lg font-semibold pr-8">{faq.q}</span>
                          <svg
                            className={`w-5 h-5 text-foreground/40 flex-shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 pt-0">
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
      <section id="contact" className="py-32 px-6 relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto text-center fade-on-scroll opacity-0 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight text-white" style={{ "borderBottom": "0.04em solid #e0115f"}}>
            Start your project with us today
          </h2>
          <p className="text-xl text-background/70 mb-12 font-light">
            Ready to build something great? Let's talk about your project.
          </p>
          <a
            href="mailto:hello@dogfood.digital"
            className="inline-block px-10 py-5 bg-[#e0115f] text-white font-medium rounded-xl hover:bg-[#b80d4a] transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg ruby-glow"
          >
            Start a Project
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-background border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-foreground/5">
            <div className="text-xl font-semibold">Dogfood Digital</div>
            <div className="flex gap-8 text-sm">
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
          <div className="pt-8 text-center">
            <p className="text-sm text-foreground/40">
              Always shipping. Always dogfooding.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
