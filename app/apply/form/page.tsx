"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  country: string;
  productStage: string;
  businessType: string;
  budget: string;
  hasDocumentation: string;
  productDescription: string;
  revenueStatus: string;
  revenueGoal: string;
  startTimeline: string;
  buildPreference: string;
  feelingScale: string;
  howDidYouHear: string;
  commitment: string;
}

export default function ApplyForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    country: "",
    productStage: "",
    businessType: "",
    budget: "",
    hasDocumentation: "",
    productDescription: "",
    revenueStatus: "",
    revenueGoal: "",
    startTimeline: "",
    buildPreference: "",
    feelingScale: "",
    howDidYouHear: "",
    commitment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 15;

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }, []);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mvgywqba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "Strategy Session Booking",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    const fields: (keyof FormData)[] = [
      "name",
      "email",
      "country",
      "productStage",
      "businessType",
      "budget",
      "hasDocumentation",
      "productDescription",
      "revenueStatus",
      "revenueGoal",
      "startTimeline",
      "buildPreference",
      "feelingScale",
      "howDidYouHear",
      "commitment",
    ];
    
    const currentField = fields[currentStep];
    return formData[currentField]?.trim() !== "";
  };

  const renderStep = () => {
    const inputClass = "w-full mx-auto px-4 py-3 bg-background dark:bg-white/5 border border-foreground/10 dark:border-[#e0115f]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e0115f]/50 focus:border-transparent transition-all text-foreground";
    const labelClass = "block text-2xl sm:text-3xl font-bold mb-6 text-foreground text-center";

    switch (currentStep) {
      case 0:
        return (
          <div>
            <label className={labelClass}>Let's start with your name.</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              className={inputClass}
              placeholder="Enter your first name..."
              autoFocus
            />
          </div>
        );

      case 1:
        return (
          <div>
            <label className={labelClass}>What's your email address?</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className={inputClass}
              placeholder="your@email.com"
              autoFocus
            />
          </div>
        );

      case 2:
        return (
          <div>
            <label className={labelClass}>What country are you based in?</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => updateFormData("country", e.target.value)}
              className={inputClass}
              placeholder="e.g., United States"
              autoFocus
            />
          </div>
        );

      case 3:
        return (
          <div>
            <label className={labelClass}>Where is your product or idea at?</label>
            <div className="space-y-3 max-w-xl mx-auto">
              {["Just an idea", "Sketches/wireframes", "Have a prototype", "Partially built", "Needs a redesign"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("productStage", option)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    formData.productStage === option
                      ? "border-[#e0115f] bg-[#e0115f]/10"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <label className={labelClass}>Is this an existing business or new software product?</label>
            <div className="space-y-3 max-w-xl mx-auto">
              {["Existing business", "New software product", "Side project turning into a business", "Internal tool for my company"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("businessType", option)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    formData.businessType === option
                      ? "border-[#e0115f] bg-[#e0115f]/10"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <label className={labelClass}>What is your product development budget?</label>
            <div className="space-y-3 max-w-xl mx-auto">
              {["Under $5,000", "$5,000 - $15,000", "$15,000 - $30,000", "$30,000 - $50,000", "$50,000+", "Not sure yet"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("budget", option)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    formData.budget === option
                      ? "border-[#e0115f] bg-[#e0115f]/10"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <label className={labelClass}>Do you have a site, deck, or doc describing your product?</label>
            <div className="space-y-3 max-w-xl mx-auto">
              {["Yes, I have detailed documentation", "Yes, I have a pitch deck", "Yes, I have a website", "No, but I can explain it", "Not yet, just getting started"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("hasDocumentation", option)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    formData.hasDocumentation === option
                      ? "border-[#e0115f] bg-[#e0115f]/10"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div>
            <label className={labelClass}>What are you building and who is it for?</label>
            <textarea
              value={formData.productDescription}
              onChange={(e) => updateFormData("productDescription", e.target.value)}
              className={`${inputClass} resize-none max-w-2xl mx-auto block`}
              rows={6}
              placeholder="Describe your product vision and target audience..."
              autoFocus
            />
          </div>
        );

      case 8:
        return (
          <div>
            <label className={labelClass}>Are you generating monthly revenue or pre-revenue?</label>
            <div className="space-y-3 max-w-xl mx-auto">
              {["Generating monthly revenue", "Pre-revenue (no customers yet)", "Have paying customers but irregular revenue", "In beta with early users"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("revenueStatus", option)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    formData.revenueStatus === option
                      ? "border-[#e0115f] bg-[#e0115f]/10"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div>
            <label className={labelClass}>What's your revenue goal for the next 6-12 months?</label>
            <div className="space-y-3 max-w-xl mx-auto">
              {["$0 - $10k MRR", "$10k - $50k MRR", "$50k - $100k MRR", "$100k+ MRR", "Just validating the idea first", "Not focused on revenue yet"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("revenueGoal", option)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    formData.revenueGoal === option
                      ? "border-[#e0115f] bg-[#e0115f]/10"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 10:
        return (
          <div>
            <label className={labelClass}>When are you looking to start your build?</label>
            <div className="space-y-3 max-w-xl mx-auto">
              {["ASAP (within 2 weeks)", "Within 1 month", "1-3 months", "3-6 months", "Just exploring options"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("startTimeline", option)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    formData.startTimeline === option
                      ? "border-[#e0115f] bg-[#e0115f]/10"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 11:
        return (
          <div>
            <label className={labelClass}>How do you want to approach this?</label>
            <div className="space-y-3 max-w-xl mx-auto">
              {[
                "I want Dogfood Digital to build it for me",
                "I want to learn how to build inside RubyOnVibes",
                "Both - build with Dogfood + learn RubyOnVibes",
                "Not sure yet, need guidance"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("buildPreference", option)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    formData.buildPreference === option
                      ? "border-[#e0115f] bg-[#e0115f]/10"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 12:
        return (
          <div>
            <label className={labelClass}>
              On a scale of 1-10, how committed are you to making this happen?
            </label>
            <p className="text-sm text-foreground/60 mb-8 text-center">
              (1 = I'm comfortable where I am • 10 = I'll do whatever it takes to launch this)
            </p>
            <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-xl mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => updateFormData("feelingScale", num.toString())}
                  className={`aspect-square rounded-lg border-2 transition-all font-bold text-lg ${
                    formData.feelingScale === num.toString()
                      ? "border-[#e0115f] bg-[#e0115f] text-white scale-110"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        );

      case 13:
        return (
          <div>
            <label className={labelClass}>How did you find out about us?</label>
            <div className="space-y-3 max-w-xl mx-auto">
              {[
                "Twitter/X",
                "LinkedIn",
                "Google search",
                "Friend referral",
                "RubyOnVibes website",
                "Podcast/Interview",
                "Other"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("howDidYouHear", option)}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    formData.howDidYouHear === option
                      ? "border-[#e0115f] bg-[#e0115f]/10"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 14:
        return (
          <div>
            <label className={labelClass}>
              If you qualify for a call, make sure to show up promptly. We reserve spots for committed founders only.
            </label>
            <p className="text-foreground/60 mb-8 text-sm text-center">
              Are you committed to showing up for your strategy session?
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFormData("commitment", option)}
                  className={`px-8 py-6 rounded-lg border-2 transition-all font-semibold text-lg ${
                    formData.commitment === option
                      ? "border-[#e0115f] bg-[#e0115f]/10 scale-105"
                      : "border-foreground/10 dark:border-[#e0115f]/20 hover:border-[#e0115f]/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen dark:bg-black flex flex-col">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <Link href="/">
              <img src="/dogfood-logo.png" alt="Dogfood Digital" className="h-10 sm:h-11 w-auto -ml-1 flex-shrink-0" style={{ filter: 'invert(1) brightness(1.2)' }} suppressHydrationWarning />
            </Link>
            <div className="flex items-center gap-4">
            </div>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center px-4 py-32">
          <div className="text-center max-w-2xl">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#e0115f]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#e0115f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 ruby-text-gradient">You're all set!</h1>
            <p className="text-xl text-foreground/60 mb-8">
              We'll review your information and send you a calendar link within 24 hours.
            </p>
            <Link
              href="/"
              className="px-4 py-2 border-2 border-white text-[#e0115f] rounded-lg hover:bg-white/5 hover:border-white transition-all duration-300 text-md font-medium shadow-lg shadow-white/15"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/apply">
            <button className="px-4 py-2 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-all text-sm font-medium">
              ← Back
            </button>
          </Link>
          <Link href="/">
            <img src="/dogfood-logo.png" alt="Dogfood Digital" className="h-10 sm:h-11 w-auto mx-auto flex-shrink-0" style={{ filter: 'invert(1) brightness(1.2)' }} suppressHydrationWarning />
          </Link>
        </div>
      </nav>

      {/* Form Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-32">
        <div className="w-full max-w-3xl">
          {/* Progress indicator - text only */}
          <div className="text-center mb-12">
            <p className="text-sm text-foreground/50">
              {currentStep + 1} / {totalSteps}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center">
              {/* Form Step */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-12"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 flex-col w-full max-w-xs sm:max-w-sm mx-auto">            
              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className=" flex-1 px-8 py-4 bg-[#e0115f] text-white font-medium rounded-xl hover:bg-[#b80d4a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ruby-glow inline-flex items-center justify-center gap-2"
                >
                  Continue
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="flex-1 px-8 py-4 bg-[#e0115f] text-white font-medium rounded-xl hover:bg-[#b80d4a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ruby-glow"
                >
                  {isSubmitting ? "Booking..." : "Book My Strategy Session"}
                </button>
              )}

              {currentStep > 0 && (
                <div className="flex">
                  <button
                    onClick={prevStep}
                    className=" flex-1 px-8 py-4 border-2 border-foreground/10 dark:border-[#e0115f]/30 rounded-xl hover:bg-foreground/5 transition-all font-medium min-w-[120px]"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
