import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { occasions } from "@/data/occasions";

export const metadata: Metadata = { title: "Events & Occasions", description: "Consider a live dessert experience for weddings, engagements, birthdays, corporate events and more.", alternates: { canonical: "/occasions" } };

export default function OccasionsPage() {
  return <main id="main-content">
    <PageHero eyebrow="A moment for every gathering" title={<>For the moments<br /><em>that matter.</em></>} subtitle="A considered sweet moment for the celebrations you hold close." image={occasions[0].image} alt={occasions[0].alt} />
    <section className="page-section"><div className="container page-intro"><h2 className="section-heading">Every gathering<br />has its <em>own story.</em></h2><div className="page-intro-copy"><p>From wedding receptions to company celebrations, a live dessert moment can bring people together. These concepts are proposed and subject to approval; no service area, package or availability is currently confirmed.</p><p>Choose an occasion to include it in your enquiry.</p></div></div></section>
    <section className="container" aria-label="Occasions">{occasions.map((occasion, index) => <article className="occasion-detail" key={occasion.id}><div className="photo detail-image"><Image src={occasion.image} alt={occasion.alt} fill sizes="(max-width: 720px) 92vw, 45vw" style={{ objectFit: "cover" }} /></div><div><span className="eyebrow">0{index + 1} / A MOMENT TO CELEBRATE</span><h2>{occasion.name}</h2><p>{occasion.description}</p><Link className="button button--dark" href={`/enquire?occasion=${encodeURIComponent(occasion.shortName)}`}>Enquire about your event <ArrowUpRight size={15} /></Link></div></article>)}</section>
  </main>;
}