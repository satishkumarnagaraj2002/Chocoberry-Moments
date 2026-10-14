import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: "Chocoberry",
    description: brand.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f0",
    theme_color: "#24130f",
    icons: [{ src: "/app-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
