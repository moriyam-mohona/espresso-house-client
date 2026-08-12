export const siteConfig = {
  name: "Espresso Club",
  description: "Espresso Club–inspired coffee ordering, loyalty, digital wallet, store, and administration platform.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    docs: "#",
    support: "#",
  },
  company: {
    name: "Espresso Club",
    website: "#",
  },
};

export type SiteConfig = typeof siteConfig;
