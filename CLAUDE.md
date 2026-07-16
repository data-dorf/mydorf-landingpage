# Project Overview
This project is a high-fidelity of the "Mydorf". The goal is to replicate the minimal aesthetic, smooth scrolling experiences, and micro-interactions of the original Framer site using a modern React-based stack.

# Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Utilizing `@theme` and `@layer` for design tokens)
- **Animation:** GSAP (GreenSock Animation Platform) + `@gsap/react` + `ScrollTrigger`
- **Icons:** Phosphor Icons / Lucide React

# Architectural Guidelines
1. **Component-Driven Development:** Break down the UI into small, highly reusable components (e.g., `HeroSection`, `BentoGrid`, `AnimatedButton`).
2. **Server & Client Components:** - Default to Server Components for static sections to maximize performance (LCP).
   - Use `'use client'` strictly for components that require `useRef`, interactivity, or GSAP animations.
3. **Typography & Spacing:** Adhere strictly to the Tailwind spacing scale. Ensure typography scales fluidly across viewports.
4. Focus clean-code - Split Component file and import to main file

# GSAP Animation Rules (Crucial for React)
- **Safe Integration:** Always use the `useGSAP()` hook from `@gsap/react` instead of standard `useEffect()` to ensure proper garbage collection and prevent memory leaks in React 18 Strict Mode.
- **Targeting Elements:** Use React `useRef` to target specific elements rather than global string selectors (like `.my-class`) to avoid scoping issues and bugs when components render multiple times.
- **Scroll Interactions:** Utilize GSAP's `ScrollTrigger` plugin for all scroll-reveal and parallax effects. Group animations using `gsap.timeline()` for complex sequential reveals.
- **Premium Easing:** Framer templates often feel smooth because of physics-based easing. In GSAP, utilize premium eases like `power3.out`, `power4.inOut`, or `expo.out` to replicate that high-end, buttery-smooth feel.

# Development Workflow
- When asked to build a section, write the complete, copy-pasteable code.
- Always include the necessary TypeScript interfaces for component props.
- Keep animation logic inside the `useGSAP` hook block and keep the JSX structure clean.
- Prioritize clean code and maintainability over clever, unreadable one-liners.