export const siteConfig = {
  name: "Espresso SaaS",
  description: "Scalable enterprise-ready SaaS application built with Next.js, TypeScript, Tailwind CSS, and Ant Design.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    docs: "#",
    support: "#",
  },
  company: {
    name: "Espresso House",
    website: "#",
  },
};

export type SiteConfig = typeof siteConfig;
