"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxCardProps {
  children: ReactNode;
  className?: string;
  /**
   * Controls the strength of the parallax effect
   * @default 20 - Higher values = more movement
   */
  parallaxStrength?: number;
  /**
   * Delay before the entrance animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  /**
   * Duration of the entrance animation (in seconds)
   * @default 0.5
   */
  duration?: number;
  /**
   * Initial Y offset for entrance animation (in pixels)
   * @default 40
   */
  initialY?: number;
  /**
   * Whether to apply scale effect on entrance
   * @default true
   */
  enableScale?: boolean;
  /**
   * Hover lift effect (in pixels)
   * @default 4
   */
  hoverLift?: number;
}

/**
 * ParallaxCard Component
 * 
 * A reusable card component with smooth scroll-based parallax motion.
 * 
 * Features:
 * - Fade in + slide up entrance animation
 * - Optional scale effect on entrance
 * - Continuous parallax motion tied to scroll progress
 * - Hover lift effect (desktop)
 * - Respects prefers-reduced-motion for accessibility
 * 
 * How it works:
 * 1. Uses Framer Motion's useScroll to track the card's position in viewport
 * 2. Maps scroll progress (0 to 1) to transform values using useTransform
 * 3. Applies transforms smoothly via motion.div
 * 4. For reduced motion users, disables parallax and uses simple fade-in
 * 
 * @example
 * <ParallaxCard delay={0.1} parallaxStrength={30}>
 *   <div className="p-6 bg-white rounded-lg">
 *     Your content here
 *   </div>
 * </ParallaxCard>
 */
export default function ParallaxCard({
  children,
  className = "",
  parallaxStrength = 20,
  delay = 0,
  duration = 0.5,
  initialY = 40,
  enableScale = true,
  hoverLift = 4,
}: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress of this specific element
  // scrollYProgress goes from 0 (element enters viewport bottom) to 1 (element exits viewport top)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Track from when it enters to when it leaves
  });

  // Map scroll progress to parallax movement
  // When scroll progress is 0 (entering): move down slightly
  // When scroll progress is 1 (leaving): move up slightly
  // This creates the depth/layering effect
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [0, 0, 0] : [parallaxStrength, 0, -parallaxStrength]
  );

  // Entrance animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : initialY,
      scale: shouldReduceMotion ? 1 : enableScale ? 0.98 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut" as const,
      },
    },
  };

  // Hover animation
  const hoverVariants = shouldReduceMotion
    ? undefined
    : {
        scale: 1.01,
        y: -hoverLift,
        transition: {
          duration: 0.3,
          ease: "easeOut" as const,
        },
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // Trigger when 50px into viewport
      variants={variants}
      whileHover={hoverVariants}
      style={{
        y: shouldReduceMotion ? 0 : y, // Apply continuous parallax only if motion is allowed
        willChange: "transform", // Performance optimization
      }}
    >
      {children}
    </motion.div>
  );
}

