# 🎬 Portfolio Hero Section

A cinematic, scroll-driven portfolio hero built with **React + Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **3-scene scroll animation** — background images transition as you scroll
- **Parallax + rotation + float** effects on each scene
- **Apple-style entrance animation** — fade + scale on load
- **Scene progress dots** on the right edge
- **Animated scroll indicator** that fades when scrolling begins
- **Grain texture overlay** for cinematic depth
- Fully responsive (mobile → 4K)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

---

## 📸 Replace Placeholder Photos

Open `src/Hero.jsx` and update the three constants at the top:

```js
const PHOTO_1 = "https://images.unsplash.com/photo-1523901056858-1b233826cb15?q=80&w=1044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // front-facing photo
const PHOTO_2 = "https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // side-face photo
const PHOTO_3 = "https://images.unsplash.com/photo-1761126282098-8ee5808a90b8?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // third pose
```

You can use:
- **Remote URLs** — just paste in the URL
- **Local files** — place them in `/public/` and reference as `"/photo1.jpg"`

---

## ✏️ Customise Your Name & Title

In `src/Hero.jsx`, find:

```jsx
Alex Rivera          {/* ← Your name */}
Full Stack Developer {/* ← Your subtitle */}
{["React", "Node.js", "TypeScript", "Design"]} {/* ← Your tags */}
```

---

## 🎛️ Animation Tuning

All scroll breakpoints are in `Hero.jsx` using `useTransform`:

| Effect | Variable | Scroll range |
|---|---|---|
| Scene 1 fade out | `opacity1` | 28 % → 38 % |
| Scene 2 fade in/out | `opacity2` | 28–38 % / 62–72 % |
| Scene 3 fade in | `opacity3` | 62 % → 72 % |
| Name parallax | `nameY` | 0 → 100 % |

Adjust the numbers to taste.

---

## 📦 Build for Production

```bash
npm run build
# Output in /dist — deploy to Vercel, Netlify, etc.
```
