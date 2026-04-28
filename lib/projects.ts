export type ProjectItem = {
  id: number
  name: string
  featured: boolean
  banner: string
  description: string
  features: string[]
  technologies: string[]
  live: string
  source: string
}

export const allProjects: ProjectItem[] = [
  {
    id: 3,
    name: "Fornax",
    featured: true,
    banner: "/projects/3.webp",
    description:
      "A tool that converts any GitHub repository into practical, context-aware interview questions.",
    features: [
      "Repository-aware questionnaire generation",
      "Responsive interface for interview flow",
      "Backend service powered by AI APIs",
      "Git automation with simple-git",
    ],
    technologies: ["React", "Vite", "Express", "TypeScript"],
    live: "https://fornax.curr.xyz",
    source: "https://github.com/ogawde/fornax",
  },
  {
    id: 8,
    name: "CLOUTMINT",
    featured: false,
    banner: "/projects/8.webp",
    description:
      "A full-stack creator marketplace connecting brands and creators through briefs, bids, and project collaboration.",
    features: [
      "Role-based onboarding for brands and creators",
      "Brief creation and bid management workflows",
      "Secure auth with Better Auth and social login support",
      "Responsive App Router UI with Tailwind and shadcn-style components",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
      "Tailwind CSS",
    ],
    live: "https://cloutmint.curr.xyz",
    source: "https://github.com/ogawde/cloutmint",
  },
  {
    id: 7,
    name: "PayNXT",
    featured: false,
    banner: "/projects/7.webp",
    description:
      "A payments platform monorepo with consumer and merchant apps, transfer flows, and worker-based settlement.",
    features: [
      "Consumer and merchant onboarding with JWT auth",
      "Balance, transfers, and pay-request transaction flows",
      "Background worker that settles pending transactions",
      "Shared Prisma schema with rate-limited Express APIs",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Turborepo",
    ],
    live: "https://consumer.paynxt.curr.xyz",
    source: "https://github.com/ogawde/paynxt",
  },
  {
    id: 6,
    name: "RightsTracker",
    featured: false,
    banner: "/projects/6.webp",
    description:
      "A rights and campaign tracking app for influencer deals with reminders for upcoming expiries.",
    features: [
      "Supabase auth and secure sign-in",
      "Workspaces, projects, and campaign grouping",
      "Rights timeline tracking per influencer",
      "Scheduled expiry reminders via email",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Resend"],
    live: "https://righto.curr.xyz",
    source: "https://github.com/ogawde/righto",
  },
  {
    id: 4,
    name: "Penscape",
    featured: true,
    banner: "/projects/4.webp",
    description:
      "A writing platform for publishing blogs with auth, rich editing, and a clean reading experience.",
    features: [
      "JWT-based signup and signin flow",
      "Create, edit, and publish blog posts",
      "Public blog feed with profile details",
      "Rich text editing with TipTap",
    ],
    technologies: ["React", "TypeScript", "Hono", "Prisma"],
    live: "https://penscape.curr.xyz",
    source: "https://github.com/ogawde/penscape",
  },
  {
    id: 2,
    name: "Cooksy",
    featured: true,
    banner: "/projects/2.webp",
    description:
      "An AI-assisted recipe app that generates meal ideas from available ingredients and preferences.",
    features: [
      "Recipe generation from pantry inputs",
      "Cuisine and dietary preference filters",
      "Dedicated generated recipe result page",
      "Responsive UI with theme support",
    ],
    technologies: ["Next.js", "Python", "Tailwind CSS", "OpenRouter"],
    live: "https://cooksy.curr.xyz",
    source: "https://github.com/ogawde/chef-ai-gen",
  },
  {
    id: 1,
    name: "Yapp",
    featured: true,
    banner: "/projects/1.webp",
    description:
      "A real-time multi-room chat app with a Bun WebSocket backend and a lightweight frontend.",
    features: [
      "Live messaging over WebSockets",
      "Multiple chat rooms with room switching",
      "Simple profile and display name flow",
      "Rate limiting and payload validation",
    ],
    technologies: ["Bun", "WebSockets", "TypeScript", "Vite"],
    live: "https://yapp.curr.xyz",
    source: "https://github.com/ogawde/chat-ws",
  },
  {
    id: 5,
    name: "Sync Scribe",
    featured: false,
    banner: "/projects/5.webp",
    description:
      "A collaborative writing app with shared rooms, presence updates, and real-time synchronization.",
    features: [
      "Real-time collaborative editing rooms",
      "Presence-aware multi-user experience",
      "Rich text formatting controls",
      "Document export to PDF and DOCX",
    ],
    technologies: ["Next.js", "TypeScript", "WebSockets", "Zustand"],
    live: "https://syncscribe.curr.xyz",
    source: "https://github.com/ogawde/sync-scribe",
  },
]

