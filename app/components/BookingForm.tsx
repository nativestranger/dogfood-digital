"use client";

import { useState } from "react";
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

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingForm({ isOpen, onClose }: BookingFormProps) {
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
      // Submit to Formspree
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
    const inputClass = "w-full px-4 py-3 bg-background dark:bg-white/5 border border-foreground/10 dark:border-[#e0115f]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e0115f]/50 focus:border-transparent transition-all text-foreground";
    const labelClass = "block text-lg font-medium mb-4 text-foreground";

    switch (currentStep) {
      case 0:
        return (
          <div>
            <label className={labelClass}>What's your name?</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              className={inputClass}
              placeholder="Enter your full name"
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
            <div className="space-y-3">
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
            <div className="space-y-3">
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
            <div className="space-y-3">
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
            <div className="space-y-3">
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
              className={`${inputClass} resize-none`}
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
            <div className="space-y-3">
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
            <div className="space-y-3">
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
            <div className="space-y-3">
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
            <div className="space-y-3">
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
            <p className="text-sm text-foreground/60 mb-6">
              (1 = I'm comfortable where I am • 10 = I'll do whatever it takes to launch this)
            </p>
            <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-6">
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
            <div className="space-y-3">
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
            <p className="text-foreground/60 mb-6 text-sm">
              Are you committed to showing up for your strategy session?
            </p>
            <div className="grid grid-cols-2 gap-4">
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-background dark:bg-black border border-foreground/10 dark:border-[#e0115f]/30 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e0115f]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#e0115f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 ruby-text-gradient">You're all set!</h3>
            <p className="text-foreground/60 mb-8 text-lg">
              We'll review your information and send you a calendar link within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#e0115f] text-white font-medium rounded-lg hover:bg-[#b80d4a] transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 border-b border-foreground/10 dark:border-[#e0115f]/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold ruby-text-gradient">Book Strategy Session</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#e0115f] to-[#ff1a6b] transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-foreground/60 whitespace-nowrap">
                  {currentStep + 1} / {totalSteps}
                </span>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-foreground/10 dark:border-[#e0115f]/20 flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-foreground/10 dark:border-[#e0115f]/30 rounded-lg hover:bg-foreground/5 transition-all font-medium"
                >
                  Back
                </button>
              )}
              
              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex-1 px-6 py-3 bg-[#e0115f] text-white font-medium rounded-lg hover:bg-[#b80d4a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ruby-glow"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="flex-1 px-6 py-3 bg-[#e0115f] text-white font-medium rounded-lg hover:bg-[#b80d4a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ruby-glow"
                >
                  {isSubmitting ? "Booking..." : "Book My Strategy Session"}
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

