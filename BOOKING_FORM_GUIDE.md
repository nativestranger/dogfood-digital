# 📞 Multi-Step Booking Form Implementation Guide

## 🎯 Overview

I've implemented a beautiful multi-step embedded booking form for strategy session calls. The form appears as a modal and guides users through a comprehensive qualification process before booking.

---

## ✨ Features

### **Professional Multi-Step Form**
- ✅ 15 sequential steps with smooth transitions
- ✅ Progress bar showing completion status
- ✅ Beautiful animations using Framer Motion
- ✅ Mobile-responsive design
- ✅ Form validation (can't proceed without answering)
- ✅ Automatic submission to Formspree

### **User Experience**
- Smooth slide animations between steps
- Visual feedback for selected options
- Progress tracking (1/15, 2/15, etc.)
- Back button to review previous answers
- Auto-focus on text inputs
- Success confirmation screen

### **Integration Points**
- "Book a Call" button in main navigation (desktop & mobile)
- "Book a Call" button in start-project page navigation
- All pricing section "Book a Call" buttons trigger the form
- Modal overlay with backdrop blur

---

## 📋 Form Flow (Exact Sequence)

The form asks questions in this **exact order**:

1. **Name** - Text input
2. **Email** - Email input with validation
3. **Country** - Text input
4. **Product Stage** - Multiple choice (5 options)
   - Just an idea
   - Sketches/wireframes
   - Have a prototype
   - Partially built
   - Needs a redesign

5. **Business Type** - Multiple choice (4 options)
   - Existing business
   - New software product
   - Side project turning into a business
   - Internal tool for my company

6. **Development Budget** - Multiple choice (6 options)
   - Under $5,000
   - $5,000 - $15,000
   - $15,000 - $30,000
   - $30,000 - $50,000
   - $50,000+
   - Not sure yet

7. **Documentation** - Multiple choice (5 options)
   - Yes, I have detailed documentation
   - Yes, I have a pitch deck
   - Yes, I have a website
   - No, but I can explain it
   - Not yet, just getting started

8. **Product Description** - Textarea (What are you building and who is it for?)

9. **Revenue Status** - Multiple choice (4 options)
   - Generating monthly revenue
   - Pre-revenue (no customers yet)
   - Have paying customers but irregular revenue
   - In beta with early users

10. **Revenue Goal** - Multiple choice (6 options)
    - $0 - $10k MRR
    - $10k - $50k MRR
    - $50k - $100k MRR
    - $100k+ MRR
    - Just validating the idea first
    - Not focused on revenue yet

11. **Start Timeline** - Multiple choice (5 options)
    - ASAP (within 2 weeks)
    - Within 1 month
    - 1-3 months
    - 3-6 months
    - Just exploring options

12. **Build Preference** - Multiple choice (4 options)
    - I want Dogfood Digital to build it for me
    - I want to learn how to build inside RubyOnVibes
    - Both - build with Dogfood + learn RubyOnVibes
    - Not sure yet, need guidance

13. **Feeling Scale** - Number scale 1-10
    - Visual grid with numbers
    - Labels: "Not great" to "Feeling good!"

14. **How Did You Hear** - Multiple choice (7 options)
    - Twitter/X
    - LinkedIn
    - Google search
    - Friend referral
    - RubyOnVibes website
    - Podcast/Interview
    - Other

15. **Commitment** - Yes/No question (2 options)
    - Yes, I'm committed and will show up
    - I need to check my schedule first

**Final Step:** "Book My Strategy Session" submit button

---

## 📍 Where It's Integrated

### **Main Landing Page (`/app/page.tsx`)**
1. **Desktop Navigation** - "Book a Call" button (pink/ruby color)
2. **Mobile Navigation** - "Book Call" button (compact)
3. **Pricing Section** - Strategy Session "Book a Call" button
4. **Pricing Section** - Growth Build "Book a Call" button

### **Start Project Page (`/app/start-project/page.tsx`)**
1. **Navigation Bar** - "Book a Call" button (pink/ruby color)

---

## 🎨 Design Details

### **Modal Styling**
- Full-screen overlay with backdrop blur
- Centered card with max-width of 2xl
- Dark mode support with ruby accent colors
- Smooth entrance/exit animations
- Scrollable content with max-height

### **Button Styles**
- Selected options: Ruby border + pink background tint
- Unselected: Subtle border with hover effect
- Primary action button: Ruby gradient with glow effect
- Back button: Outline style

### **Progress Indicator**
- Animated progress bar at top
- Shows current step / total steps
- Ruby gradient fill
- Smooth transitions

---

## 🔧 Technical Implementation

### **Component Location**
`/app/components/BookingForm.tsx`

### **Props Interface**
```typescript
interface BookingFormProps {
  isOpen: boolean;      // Controls modal visibility
  onClose: () => void;  // Callback to close modal
}
```

### **Form Data Structure**
All 15 questions are stored in a typed FormData object:
```typescript
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
```

### **State Management**
- `currentStep` - Tracks which question is showing (0-14)
- `formData` - Stores all answers
- `isSubmitting` - Loading state during submission
- `isSubmitted` - Shows success screen

### **Validation**
- Users cannot proceed without answering current question
- Continue button is disabled until answer is provided
- Email field uses HTML5 email validation

---

## 📤 Form Submission

### **Integration**
- Submits to **Formspree** (`https://formspree.io/f/xqajpgny`)
- Includes all 15 answers in structured format
- Adds `formType: "Strategy Session Booking"` for identification
- Shows success screen after submission

### **Success Flow**
1. User completes all 15 questions
2. Clicks "Book My Strategy Session"
3. Form submits to Formspree
4. Success screen displays with checkmark
5. Message: "We'll review your information and send you a calendar link within 24 hours"
6. Close button returns to site

---

## 🎯 Usage Examples

### **Trigger the Form**
```tsx
// In any component
const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

// Button to open form
<button onClick={() => setIsBookingFormOpen(true)}>
  Book a Call
</button>

// Add the component
<BookingForm 
  isOpen={isBookingFormOpen} 
  onClose={() => setIsBookingFormOpen(false)} 
/>
```

### **Customize Form Questions**
Edit `/app/components/BookingForm.tsx` and modify the `renderStep()` function. Each `case` statement represents one step.

### **Add New Questions**
1. Add new field to `FormData` interface
2. Increment `totalSteps` constant
3. Add new case in `renderStep()` switch statement
4. Add field to `canProceed()` validation array

---

## 🎨 Customization

### **Change Colors**
Replace `[#e0115f]` (ruby red) with your brand color throughout the component.

### **Modify Progress Bar**
```tsx
// Current implementation
<div className="h-2 bg-gradient-to-r from-[#e0115f] to-[#ff1a6b]" />

// Change to solid color
<div className="h-2 bg-[#your-color]" />
```

### **Adjust Animation Speed**
```tsx
// In motion.div
transition={{ duration: 0.3 }} // Make faster: 0.2, slower: 0.5
```

### **Change Modal Size**
```tsx
// Current: max-w-2xl
<div className="max-w-2xl">

// Larger: max-w-4xl
// Smaller: max-w-xl
```

---

## 🚀 Future Enhancements

Potential additions:
- Calendar integration (Calendly/Cal.com) for instant booking
- Conditional logic (skip questions based on previous answers)
- Analytics tracking for conversion optimization
- Email confirmation with summary
- Save progress locally (resume later)
- Admin dashboard to review submissions

---

## 📦 Dependencies

- **Framer Motion** - Animations and transitions
- **Formspree** - Form submission handling
- **React** - State management and hooks

---

## 🐛 Troubleshooting

### **Form Not Opening**
- Check that `isBookingFormOpen` state is being updated
- Verify BookingForm component is rendered
- Check z-index conflicts (modal uses z-[100])

### **Submission Failing**
- Verify Formspree endpoint URL is correct
- Check network tab for error messages
- Ensure all required fields have values

### **Styling Issues**
- Confirm Tailwind CSS is properly configured
- Check dark mode classes are working
- Verify Framer Motion is installed

---

## 📝 Files Modified/Created

1. **Created:** `/app/components/BookingForm.tsx` (560+ lines)
2. **Modified:** `/app/page.tsx` (added BookingForm integration)
3. **Modified:** `/app/start-project/page.tsx` (added Book a Call button)
4. **Documentation:** This file

---

**The booking form is fully functional and ready to qualify leads!** 🎉

Users can now book strategy sessions through a professional, multi-step qualification process.

