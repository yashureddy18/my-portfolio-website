# Syamala Yasaswini – Portfolio

A fully animated personal portfolio built with **React, TypeScript, and Vite**. The site showcases my background, skills across full‑stack, data science, and AI/ML domains, highlighted projects, certifications, and a polished contact experience. Micro-interactions, GSAP scroll reveals, and tailored gradients give the page a cinematic feel while staying performant.

## ✨ Highlights

- **Hero + Navigation** with smooth-scrolling, floating elements, and a command-style menu for quick jumps.
- **About Me** section featuring animated stats, info cards, and GSAP-triggered layouts describing education, interests, and academic track record.
- **Skills & Tools grid** with Radix UI, Tailwind utility styling, and responsive layouts for both desktop and mobile.
- **Project gallery** displaying AI-powered apps, mobile builds, and diagnostic tools using hover-depth effects.
- **Certifications carousel** and **contact form** wired with `react-hook-form` + `zod` validation and `sonner` toasts.

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS, GSAP, Lenis smooth scrolling
- **UI Toolkit:** Radix UI primitives, Lucide icons, custom gradients + glassmorphism
- **3D/Visuals:** `@react-three/fiber`, `drei` helpers, and carefully tuned animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm 10+

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
This starts Vite with hot module replacement at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Outputs static assets into `dist/` using TypeScript project references and Vite optimizations.

### Preview Build Locally
```bash
npm run preview
```
Serves the production build so you can sanity-check before deploying.

## 📁 Project Structure

```
my-portfolio/
├── public/              # Static assets (favicons, fonts)
├── src/
│   ├── sections/        # Hero, About, Skills, Projects, Certifications, Contact
│   ├── components/      # Shared UI primitives and Radix wrappers
│   ├── styles/          # Tailwind setup, animations, global styles
│   └── App.tsx          # Section composition + GSAP trigger wiring
├── dist/                # Generated build output
├── package.json
└── README.md
```

## 📜 npm Scripts

| Script       | Description |
|--------------|-------------|
| `npm run dev` | Starts Vite dev server with HMR. |
| `npm run build` | Runs TypeScript checks then emits optimized static assets. |
| `npm run preview` | Serves the build from `dist/` for final verification. |
| `npm run lint` | ESLint across the entire project (TS + JSX rules). |

## 🎨 Customization Tips

1. **Content:** Edit text, stats, and card data in `src/sections/*.tsx` — each section separates copy from layout for quick tweaks.
2. **Animations:** GSAP timelines live alongside each section; adjust easing/duration to dial in the motion feel.
3. **Branding:** Tailwind tokens (gradients, glass effects) are defined in `tailwind.config.js`. Update color stops to match your palette.
4. **Assets:** Drop new images or 3D assets into `public/` and reference them via Vite’s asset handling.

## 📦 Deployment

Because the project compiles to static assets, it deploys easily to Netlify, Vercel, GitHub Pages, or any static host:

1. Run `npm run build`.
2. Deploy the `dist/` directory to your hosting provider.

---

Built with care to present the breadth of my full-stack, AI/ML, and data science journey. Feel free to fork, remix, or reach out via the contact form for collaborations!
