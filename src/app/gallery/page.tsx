import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { experiences } from "@/data/experiences";

export const metadata: Metadata = { title: "The Gallery", description: "Explore demonstration imagery for the proposed Chocoberry Moments live dessert concepts.", alternates: { canonical: "/gallery" } };

export default function GalleryPage() {
  return <main id="main-content"><PageHero eyebrow="A visual taste of what could be" title={<>A feast for<br /><em>the senses.</em></>} subtitle="A collection of dessert ideas and demonstration photography, ready to be replaced with approved imagery." image={experiences[4].image} alt={experiences[4].alt} /><section className="page-section gallery-page"><div className="container"><p className="eyebrow">The gallery · demonstration imagery</p><GalleryExperience /></div></section></main>;
}