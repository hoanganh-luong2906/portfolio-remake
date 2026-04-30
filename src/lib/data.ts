export const PORTFOLIO_DATA = {
  identity: {
    initials: "HAL",
    name: "Hoang Anh Luong",
    role: "Front-end Developer",
    location: "Ho Chi Minh City, Vietnam",
    email: "hoanganh.luong2906@gmail.com",
    yearsExp: "+3 YoE",
    available: true,
    tagline:
      "I build Next.js apps that move with intent — fast, accessible, and full of considered detail. App Router, Server Components, and the rest of the modern React stack are my default base.",
  },
  nav: [
    { id: "home", label: "Home", href: "/" },
    { id: "experiences", label: "Experiences", href: "/experiences" },
    { id: "blog", label: "Blog", href: "/blog" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ],
  marquee: [
    "NEXT.JS · APP ROUTER",
    "REACT SERVER COMPONENTS",
    "TYPESCRIPT",
    "DESIGN SYSTEMS",
    "MOTION & INTERACTION",
    "WEBGL · THREE.JS",
    "DEVELOPER TOOLS",
    "EDGE & STREAMING",
  ],
  domains: [
    {
      id: "01",
      title: "Next.js Engineering",
      blurb:
        "My default base — Next.js with the App Router, Server Components, and a typed data layer. Architectures that scale from a marketing site to a logged-in product, tuned for Core Web Vitals.",
      stack: ["Next.js 15", "React 19", "TypeScript", "tRPC", "Vercel"],
      meta: "Base stack",
    },
    {
      id: "02",
      title: "Design Systems",
      blurb:
        "Tokens, primitives, docs. I treat a system like an API: stable contracts, sensible defaults, and the freedom to break out when the product needs it.",
      stack: ["Radix", "Tailwind", "Storybook", "Figma", "Tokens Studio"],
      meta: "Foundations",
    },
    {
      id: "03",
      title: "Motion & Interaction",
      blurb:
        "Physics-based transitions, scroll choreography, micro-interactions. Motion that signals state instead of decorating it.",
      stack: ["Framer Motion", "GSAP", "Lenis", "CSS"],
      meta: "Polish",
    },
    {
      id: "04",
      title: "Creative Code & WebGL",
      blurb:
        "Shaders, generative visuals, custom canvas. Comfortable shipping a hero scene that runs at 60fps on a five-year-old laptop.",
      stack: ["Three.js", "GLSL", "OGL", "Canvas"],
      meta: "Edge",
    },
    {
      id: "05",
      title: "Developer Tools",
      blurb:
        "CLIs, devtools panels, internal IDE plugins. The kind of tools that make the rest of engineering 10% faster — every day.",
      stack: ["Node", "ESBuild", "Bun", "VS Code API"],
      meta: "Internal",
    },
    {
      id: "06",
      title: "Prototyping",
      blurb:
        "Rapid clickable proofs, often within a day. I treat prototypes as the cheapest way to find out what's actually true about an idea.",
      stack: ["React", "Framer", "Rive", "Figma"],
      meta: "Discovery",
    },
  ],
  projects: [
    {
      id: "01",
      year: "2025",
      name: "Loom Editor",
      role: "Lead Engineer",
      blurb:
        "A browser-native motion editor for product teams. Built a custom timeline, ECS-based scene graph, and a rendering pipeline that hits 60fps on 4K canvases.",
      stack: ["Next.js", "TypeScript", "WebGL", "Rust/WASM"],
      metrics: [
        { value: "12ms", label: "median frame time" },
        { value: "230k", label: "active users" },
      ],
      art: "loom" as const,
      tone: "lime",
    },
    {
      id: "02",
      year: "2024",
      name: "Helix Design System",
      role: "Design Engineer",
      blurb:
        "Open-source component primitives used across 14 products. 240+ components, full a11y compliance, and a docs site that loads in under 200ms.",
      stack: ["Next.js", "Radix", "Stitches", "Storybook"],
      metrics: [
        { value: "240+", label: "components" },
        { value: "100", label: "Lighthouse score" },
      ],
      art: "helix" as const,
      tone: "ember",
    },
    {
      id: "03",
      year: "2024",
      name: "Atlas — Map IDE",
      role: "Founding Engineer",
      blurb:
        "An IDE for cartographers. Real-time collaborative editing on vector tiles, with a plugin system written by mapmakers who have never touched JavaScript.",
      stack: ["MapLibre", "CRDTs", "Tauri", "Rust"],
      metrics: [
        { value: "8ms", label: "edit latency" },
        { value: "p99 < 60ms", label: "render" },
      ],
      art: "atlas" as const,
      tone: "sky",
    },
    {
      id: "04",
      year: "2023",
      name: "Tessera",
      role: "Creative Technologist",
      blurb:
        "Generative print campaign for a Tokyo gallery. Built the rendering pipeline that produced 12,000 unique posters from a single shader.",
      stack: ["GLSL", "Three.js", "Node", "Cairo"],
      metrics: [
        { value: "12k", label: "unique outputs" },
        { value: "1 shader", label: "pipeline" },
      ],
      art: "tessera" as const,
      tone: "rose",
    },
    {
      id: "05",
      year: "2023",
      name: "Pulse — Status Page",
      role: "Solo",
      blurb:
        "Tiny, fast, opinionated status page. Single binary, SQLite, no JS frameworks, ships in a 90KB bundle. Powers a few thousand small teams.",
      stack: ["Go", "HTMX", "Alpine", "SQLite"],
      metrics: [
        { value: "90KB", label: "JS bundle" },
        { value: "4k+", label: "teams" },
      ],
      art: "pulse" as const,
      tone: "mint",
    },
  ],
  testimonials: [
    {
      quote:
        "HAL ships at the velocity of a prototyper but with the rigor of a staff engineer. That combo is rare.",
      name: "James Ortega",
      title: "Creative Director · Field & Co.",
    },
    {
      quote:
        "I've worked with a lot of front-end folks. He's the only one who has consistently made our product feel inevitable.",
      name: "Lena Cho",
      title: "Head of Design · Helix",
    },
    {
      quote:
        "He took our motion language from 'we should do something here' to a system. Designers and engineers both leveled up.",
      name: "David Rizzo",
      title: "Engineering Lead · Loom",
    },
    {
      quote:
        "Quietly the best technical hire we've made in three years. He raised the bar without ever raising his voice.",
      name: "Sarah Bennett",
      title: "Founder · Lume Skincare",
    },
  ],
  experiences: [
    {
      year: "2024 — Now",
      role: "Lead Front-end Engineer",
      company: "Loom",
      note: "Editor & rendering",
    },
    {
      year: "2023 — 2024",
      role: "Design Engineer",
      company: "Helix",
      note: "Design system",
    },
    {
      year: "2022 — 2023",
      role: "Founding Engineer",
      company: "Atlas (acq.)",
      note: "IDE & infra",
    },
    {
      year: "2021 — 2022",
      role: "Freelance",
      company: "Self",
      note: "Studios & startups",
    },
  ],
  faqs: [
    {
      q: "What's your engagement model?",
      a: "I'm full-time at Loom. I take on one outside project per quarter — usually 2–6 weeks, scoped tight. If yours is a fit, the worst-case is a kind no within 48 hours.",
    },
    {
      q: "Do you work with design partners or solo?",
      a: "Both. I'm comfortable carrying design-engineering through to production solo, and I'm equally comfortable embedding inside a design team and amplifying what's already there.",
    },
    {
      q: "What kinds of work do you say no to?",
      a: "Crypto, gambling, anything ad-tech adjacent. Greenfield projects without a clear thesis. Roles where the only ask is 'pixel-push our Figma.'",
    },
    {
      q: "Can I see code samples?",
      a: "Yes — for hiring conversations I share a private repo with three real PRs and a short Loom of me reasoning through one of them. Email me and I'll send the link.",
    },
  ],
  blog: [
    {
      slug: "rendering-modes-in-nextjs",
      title: "A field guide to rendering modes in Next.js",
      excerpt:
        "Static, dynamic, streaming, and PPR — when each one earns its keep, and the trade-offs nobody mentions in the docs.",
      date: "Apr 12, 2026",
      readTime: "9 min",
      category: "Engineering",
      tags: ["Next.js", "RSC", "Performance"],
      cover: "loom" as const,
    },
    {
      slug: "design-tokens-as-an-api",
      title: "Treating design tokens like a public API",
      excerpt:
        "Tokens are not a stylesheet. They're a contract between design and engineering — and the moment you treat them as anything less, the system rots.",
      date: "Mar 28, 2026",
      readTime: "7 min",
      category: "Design Systems",
      tags: ["Tokens", "Design Systems", "Process"],
      cover: "helix" as const,
    },
    {
      slug: "shaders-on-a-budget",
      title: "Shaders on a budget: hero scenes that hold up on a $300 laptop",
      excerpt:
        "How to ship a WebGL hero that doesn't melt low-end devices. Frame budgets, fallbacks, and the cheap tricks that look expensive.",
      date: "Mar 02, 2026",
      readTime: "12 min",
      category: "WebGL",
      tags: ["WebGL", "Performance", "GLSL"],
      cover: "tessera" as const,
    },
    {
      slug: "the-quiet-power-of-htmx",
      title: "The quiet power of HTMX in a React-first career",
      excerpt:
        "I'm a React engineer. I also shipped a side project in HTMX in a weekend. Here's why the contrast was useful.",
      date: "Feb 15, 2026",
      readTime: "6 min",
      category: "Tools",
      tags: ["HTMX", "Side Projects", "Opinion"],
      cover: "pulse" as const,
    },
    {
      slug: "maps-are-the-most-interesting-design-problem",
      title:
        "Why maps are the most interesting design problem of the next decade",
      excerpt:
        "A reading list, a thesis, and a slow argument that map UX has been frozen for 15 years and is overdue for a redesign.",
      date: "Jan 22, 2026",
      readTime: "11 min",
      category: "Essay",
      tags: ["Maps", "Cartography", "UX"],
      cover: "atlas" as const,
    },
    {
      slug: "ship-the-second-version",
      title: "Ship the second version",
      excerpt:
        "First versions are negotiations with the unknown. Second versions are the real product. A short note on why I stopped polishing v1s.",
      date: "Jan 04, 2026",
      readTime: "4 min",
      category: "Process",
      tags: ["Process", "Career"],
      cover: "loom" as const,
    },
  ],
} as const;

export type ArtKind = "loom" | "helix" | "atlas" | "tessera" | "pulse";
export type Project = (typeof PORTFOLIO_DATA.projects)[number];
export type BlogPost = (typeof PORTFOLIO_DATA.blog)[number];
