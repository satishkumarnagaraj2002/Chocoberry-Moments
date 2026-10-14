import { experiences } from "@/data/experiences";

const categories = ["Chocolate", "Waffles", "Crêpes", "Strawberries", "Dessert Displays", "Dessert Displays"];

export const galleryItems = experiences.map((experience, index) => ({
  id: experience.id,
  title: experience.name,
  category: categories[index],
  image: experience.image,
  alt: experience.alt,
  caption: "Demonstration photography. Replace with approved Chocoberry Moments imagery before launch.",
  isDemo: true,
}));

export const galleryCategories = ["All", ...new Set(galleryItems.map((item) => item.category))];