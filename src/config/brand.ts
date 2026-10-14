export const brand = {
  name: "Chocoberry Moments",
  descriptor: "Live Dessert Experiences",
  tagline: "Making Every Moment Sweeter.",
  parentLabel: "A Chocoberry Experience.",
  parentWebsite: "https://www.chocoberrycafe.com/",
  // Replace with the approved production domain before launch.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  contactEmail: "", // Requires business approval.
  phone: "", // Requires business approval.
  whatsapp: "", // Requires business approval.
  serviceAreas: [] as string[], // Requires business approval.
  socialLinks: [] as { label: string; href: string }[], // Add approved accounts only.
  seo: {
    title: "Chocoberry Moments | Luxury Live Dessert Experiences",
    description:
      "Make every celebration sweeter with Chocoberry Moments. Discover elegant live dessert experiences for weddings, parties, corporate events and special occasions.",
  },
  enquiry: { budgetEnabled: false },
};