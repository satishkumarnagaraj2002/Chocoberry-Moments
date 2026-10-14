import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { experiences } from "@/data/experiences";

export const metadata: Metadata = { title: "Live Dessert Experiences", description: "Explore proposed live waffle, crêpe, chocolate and dessert station concepts for celebrations and events.", alternates: { canonical: "/experiences" } };

export default function ExperiencesPage() {
  return <main id="main-content">
    <PageHero eyebrow="Proposed live dessert concepts" title={<>The art of<br /><em>live indulgence.</em></>} subtitle="Beautifully crafted desserts. Unforgettable shared experiences." image={experiences[1].image} alt={experiences[1].alt} />
    <section className="page-section"><div className="container page-intro"><h2 className="section-heading">Made before your eyes.<br /><em>Shared together.</em></h2><div className="page-intro-copy"><p>Chocoberry Moments is a proposed live dessert experience division. Each concept below is an invitation to imagine what could be part of your celebration, not a confirmed package or service.</p><p>Tell us about your event and we can discuss dessert ideas, presentation and practical details for owner approval.</p><span className="proposed-note">All offerings remain subject to business approval and availability.</span></div></div></section>
    <section className="container" aria-label="Proposed dessert experiences">{experiences.map((experience) => <article className="experience-detail" id={experience.id} key={experience.id}><div className="photo detail-image"><Image src={experience.image} alt={experience.alt} fill sizes="(max-width: 720px) 92vw, 45vw" style={{ objectFit: "cover" }} /></div><div className="detail-copy"><span className="eyebrow">{experience.number} / A PROPOSED EXPERIENCE</span><h2>{experience.name}</h2><p>{experience.description}</p><h3>Possibilities to discuss</h3><ul className="detail-list">{experience.possibilities.map((item) => <li key={item}>{item}</li>)}</ul><p><strong>May suit:</strong> {experience.occasions}</p><Link className="button button--dark" href={`/enquire?experience=${encodeURIComponent(experience.name)}`}>Enquire about this idea <ArrowUpRight size={15} /></Link></div></article>)}</section>
    <section className="page-section soft-band"><div className="container page-intro"><h2 className="section-heading">Your event.<br /><em>Your experience.</em></h2><div className="page-intro-copy"><p>Event needs are different. Dessert selections and presentation can be discussed in relation to your occasion, venue and guest count. Final availability, service details and any offering would need confirmation by the business.</p><Link className="text-link" href="/enquire">Start a conversation <ArrowRight size={15} /></Link></div></div></section>
  </main>;
}