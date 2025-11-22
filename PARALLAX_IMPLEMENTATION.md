# Parallax Scroll Motion Implementation

## 🎯 Overview

I've implemented smooth scroll-based parallax motion for all card sections on the Dogfood Digital landing page using **Framer Motion**. The animations are subtle, performant, and fully accessible.

---

## 📦 What Was Added

### 1. **New Component: `ParallaxCard`**
**Location:** `/app/components/ParallaxCard.tsx`

A reusable, fully-typed React component that handles:
- ✅ Fade-in + slide-up entrance animations
- ✅ Optional scale effect on entrance
- ✅ Continuous parallax motion tied to scroll progress
- ✅ Hover lift effects (desktop)
- ✅ Full `prefers-reduced-motion` support for accessibility

---

## 🎨 Features & How They Work

### **Entrance Animation**
When a card enters the viewport:
- Fades from `opacity: 0` → `1`
- Translates from `40px down` → `0`
- Optionally scales from `0.98` → `1.0`
- Duration: `0.5s` with custom easeOut curve
- Cards are **staggered** with configurable delays

### **Parallax While Scrolling**
Uses Framer Motion's `useScroll` and `useTransform` to:
- Track each card's position in the viewport
- Map scroll progress (0 → 1) to Y-axis transforms
- Creates subtle depth by moving cards at different speeds
- Range: typically `-20px` to `+20px` based on scroll

### **Hover State**
On desktop hover:
- Card lifts slightly (default: `4px`)
- Scales to `1.01`
- Smooth `0.3s` transition

### **Performance Optimizations**
- Uses `will-change: transform` for GPU acceleration
- `viewport={{ once: true }}` prevents re-triggering
- Reduced motion users get simple fade-in with no continuous movement

---

## 📍 Where It's Applied

I've wrapped cards in the following sections with `ParallaxCard`:

1. **Stats Section** (lines ~260-277)
   - 3 stat cards
   - `parallaxStrength: 10` (subtle)
   - `hoverLift: 3`

2. **How We Work** (lines ~314-368)
   - 4 process cards
   - `parallaxStrength: 15` (moderate)
   - `hoverLift: 4`
   - Staggered delays: `0`, `0.08s`, `0.16s`, `0.24s`

3. **Pricing Cards** (lines ~387-593)
   - 3 pricing tiers
   - `parallaxStrength: 12`
   - `hoverLift: 6` (Strategy), `6` (MVP), `8` (Growth - most emphasis)
   - Staggered delays: `0`, `0.1s`, `0.2s`

4. **Why Choose Us** (lines ~611-635)
   - 3 feature cards
   - `parallaxStrength: 18` (stronger for visual interest)
   - `hoverLift: 5`

---

## 🎛️ Customization Props

The `ParallaxCard` component accepts these props:

```tsx
interface ParallaxCardProps {
  children: ReactNode;
  className?: string;
  
  // Parallax intensity (higher = more movement)
  parallaxStrength?: number;  // default: 20
  
  // Entrance animation timing
  delay?: number;             // default: 0 (seconds)
  duration?: number;          // default: 0.5 (seconds)
  initialY?: number;          // default: 40 (pixels)
  
  // Effects
  enableScale?: boolean;      // default: true
  hoverLift?: number;         // default: 4 (pixels)
}
```

---

## 🔧 How to Tune Animations

### **Adjust Parallax Strength**
```tsx
// Subtle parallax (good for small cards)
<ParallaxCard parallaxStrength={10}>

// Moderate parallax (good for medium cards)
<ParallaxCard parallaxStrength={20}>

// Strong parallax (good for large hero sections)
<ParallaxCard parallaxStrength={30}>
```

### **Change Entrance Speed**
```tsx
// Faster entrance
<ParallaxCard duration={0.3}>

// Slower, more dramatic entrance
<ParallaxCard duration={0.8}>
```

### **Stagger Multiple Cards**
```tsx
{items.map((item, idx) => (
  <ParallaxCard 
    key={idx}
    delay={idx * 0.1}  // 0s, 0.1s, 0.2s, 0.3s...
  >
    {/* card content */}
  </ParallaxCard>
))}
```

### **Disable Scale Effect**
```tsx
<ParallaxCard enableScale={false}>
  {/* Card without scale effect */}
</ParallaxCard>
```

### **Increase Hover Lift**
```tsx
// Emphasized lift on hover
<ParallaxCard hoverLift={8}>
  {/* Important card */}
</ParallaxCard>
```

---

## ♿ Accessibility

The component automatically respects `prefers-reduced-motion`:

- **Motion allowed:** Full parallax + animations
- **Motion reduced:** Simple fade-in, no parallax, no hover transforms

This prevents motion sickness for sensitive users while maintaining visual polish for others.

---

## 📦 Dependencies

**Added:** `framer-motion` (installed via npm)

```json
{
  "dependencies": {
    "framer-motion": "^11.x.x"
  }
}
```

---

## 🚀 Next Steps

1. **Test on mobile devices** - Ensure parallax feels smooth on iOS/Android
2. **Adjust strength per section** - Some sections may benefit from stronger/weaker parallax
3. **Add more cards** - Simply wrap any new card content with `<ParallaxCard>`
4. **Consider adding** - Horizontal parallax for background elements (optional)

---

## 🎨 Design Philosophy

The implementation follows modern agency site patterns (similar to creme.digital):
- **Subtle, not distracting** - Motion enhances, doesn't overwhelm
- **Layered depth** - Different parallax speeds create visual hierarchy
- **Smooth performance** - 60fps on modern devices
- **Accessible by default** - Respects user preferences

---

## 📝 Files Modified

1. `/app/components/ParallaxCard.tsx` (new file, 159 lines)
2. `/app/page.tsx` (updated to use ParallaxCard)
3. `/package.json` (added framer-motion dependency)

---

## 💡 Tips

- **Less is more:** Start with subtle values and increase gradually
- **Match brand:** Dogfood Digital uses smooth, professional motion
- **Test on real devices:** Parallax can feel different on mobile
- **Check reduced motion:** Test with system setting enabled

---

**Happy scrolling! 🎢**

