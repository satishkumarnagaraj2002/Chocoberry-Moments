import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { experiences } from "@/data/experiences";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Our Story", description: "Discover the idea behind Chocoberry Moments, a proposed live dessert experience from the Chocoberry brand.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <main id="main-content">
    <PageHero eyebrow="A Chocoberry Experience" title={<>The sweetest<br /><em>stories begin here.</em></>} subtitle="A new way to bring the Chocoberry dessert spirit into the moments you celebrate." image={experiences[0].image} alt={experiences[0].alt} />
    <section className="page-section"><div className="container page-intro"><h2 className="section-heading">A familiar love<br />for <em>something sweet.</em></h2><div className="page-intro-copy"><p>Chocoberry Moments is a proposed new division of Chocoberry, imagined to bring its indulgent dessert identity into the world of live celebrations and events.</p><p>The idea is simple: desserts prepared fresh, presented with care and enjoyed as part of the occasion itself. The experience is about hospitality as much as the final bite: the anticipation, the craft and the pleasure of sharing.</p><p>Service details, availability and offerings remain subject to business approval. This website introduces the concept and gathers enquiries while those details are confirmed.</p></div></div></section>
    <section className="page-section soft-band"><div className="container intro-grid"><div className="photo" style={{ position: "relative", minHeight: 570 }}><Image src={experiences[2].image} alt={experiences[2].alt} fill sizes="(max-width: 720px) 92vw, 45vw" style={{ objectFit: "cover" }} /></div><div><p className="eyebrow">From Chocoberry to your celebration</p><h2 className="section-heading">The dessert<br />becomes part<br />of the <em>story.</em></h2><p className="section-copy intro-copy">Fresh preparation, thoughtful presentation and a little theatre can turn dessert into a shared moment. Chocoberry Moments explores how that spirit might travel from the café into celebrations.</p><a className="button button--dark" href={brand.parentWebsite} target="_blank" rel="noreferrer">Discover Chocoberry <ArrowUpRight size={15} /></a></div></div></section>
    <section className="page-section"><div className="container page-intro"><h2 className="section-heading">Crafted with care.<br /><em>Shared with joy.</em></h2><div className="page-intro-copy"><p>Every part of the concept is grounded in the pleasure of dessert craftsmanship and warm hospitality: making something fresh, presenting it beautifully and inviting guests to enjoy it together.</p><p>Chocoberry Moments is presented as a distinct events concept with a clear relationship to the parent brand, without implying that every Chocoberry café provides event catering.</p><Link className="text-link" href="/enquire">Plan your event <ArrowUpRight size={15} /></Link></div></div></section>
  </main>;
}