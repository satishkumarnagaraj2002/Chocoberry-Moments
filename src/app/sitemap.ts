import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/experiences", "/occasions", "/gallery", "/about", "/enquire", "/privacy"];
  return routes.map((route) => ({ url: new URL(route, brand.siteUrl).toString(), changeFrequency: "monthly", priority: route === "" ? 1 : .7 }));
}