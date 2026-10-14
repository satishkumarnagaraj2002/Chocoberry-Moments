import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experiences";
import { occasions } from "@/data/occasions";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EntrySplash } from "@/components/home/EntrySplash";

export default function Home() {
  return (
    <main id="main-content">
      <EntrySplash />
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-media"><Image src={experiences[3].image} alt={experiences[3].alt} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 48%" }} /></div>
        <div className="container hero-content">
          <p className="eyebrow">A Chocoberry Experience</p>
          <h1 className="hero-title" id="home-title"><span>We make</span><span>moments</span><span className="italic">sweeter.</span></h1>
          <p className="hero-copy">From intimate celebrations to unforgettable grand occasions, we bring the magic of freshly crafted desserts directly to your event.</p>
          <div className="hero-actions"><Link className="button" href="/experiences">Explore the experience <ArrowUpRight size={15} /></Link><Link className="button button--outline" href="/enquire">Plan your event <ArrowUpRight size={15} /></Link></div>
        </div>
        <span className="hero-index">01 / A SWEETER KIND OF CELEBRATION</span><span className="hero-note">Scroll to discover <ArrowDown size={13} /></span>
      </section>

      <section className="intro-section" id="experience-intro"><div className="container intro-grid">
        <Reveal className="intro-images"><div className="photo intro-main-image"><Image src={experiences[1].image} alt={experiences[1].alt} fill sizes="(max-width: 720px) 80vw, 40vw" style={{ objectFit: "cover" }} /></div><div className="photo intro-detail-image"><Image src={experiences[0].image} alt={experiences[0].alt} fill sizes="35vw" style={{ objectFit: "cover" }} /></div></Reveal>
        <Reveal><SectionHeading eyebrow="More than something sweet">Not just dessert.<br /><em>An experience.</em></SectionHeading><p className="section-copy intro-copy">Picture warm waffles made before your eyes. Silky chocolate over fresh strawberries. The irresistible aroma of freshly prepared crêpes. Every creation becomes part of your celebration.</p><p className="handwritten">Made fresh. Made memorable.</p><Link className="text-link" href="/about">Discover our story <ArrowRight size={15} /></Link></Reveal>
      </div></section>

      <div className="marquee" aria-label="Live desserts, sweet celebrations, unforgettable moments"><div className="marquee-track" aria-hidden="true">{Array.from({ length: 2 }).map((_, i) => <span key={i}>LIVE DESSERTS <b>✳</b> SWEET CELEBRATIONS <b>✳</b> UNFORGETTABLE MOMENTS <b>✳</b> </span>)}</div></div>

      <section className="experience-section" id="signature-experiences"><div className="container">
        <div className="section-head-row"><SectionHeading eyebrow="Proposed experiences">The sweetest part<br />of your <em>event.</em></SectionHeading><div><p className="proposed-note">Concepts for discussion and owner approval.</p><Link className="text-link" href="/experiences">View all experiences <ArrowRight size={15} /></Link></div></div>
        <div className="experience-grid">{experiences.map((experience) => <Link className="experience-card" href={`/experiences#${experience.id}`} key={experience.id}><Image src={experience.image} alt={experience.alt} fill sizes="(max-width: 720px) 92vw, (max-width: 980px) 45vw, 30vw" style={{ objectFit: "cover" }} /><div className="experience-card-content"><span className="experience-number">{experience.number} / PROPOSED EXPERIENCE</span><h3>{experience.name}</h3><p>{experience.description}</p><ArrowUpRight className="card-arrow" size={18} aria-hidden="true" /></div></Link>)}</div>
      </div></section>

      <section className="occasion-section"><div className="container occasion-layout"><div className="photo occasion-photo"><Image src={occasions[0].image} alt={occasions[0].alt} fill sizes="(max-width: 980px) 90vw, 45vw" style={{ objectFit: "cover" }} /></div><Reveal><SectionHeading eyebrow="For every gathering">Every occasion<br />deserves something <em>sweet.</em></SectionHeading><p className="section-copy">From the biggest milestones to a gathering close to home, imagine a dessert moment made for the way you celebrate.</p><div className="occasion-list">{occasions.map((occasion) => <Link href={`/enquire?occasion=${encodeURIComponent(occasion.shortName)}`} key={occasion.id}>{occasion.name}<ArrowUpRight size={15} /></Link>)}</div><Link className="text-link" href="/occasions">Discover your occasion <ArrowRight size={15} /></Link></Reveal></div></section>

      <section className="statement"><Image src={experiences[5].image} alt={experiences[5].alt} fill sizes="100vw" style={{ objectFit: "cover" }} /><div className="statement-content"><p className="eyebrow" style={{ justifyContent: "center" }}>Made for the moments</p><h2>The moments they remember.<br /><em>The desserts they talk about.</em></h2><p>Crafted live. Remembered forever.</p></div></section>

      <section className="process-section"><div className="container"><SectionHeading eyebrow="A thoughtful beginning">A little planning.<br /><em>A lot to savour.</em></SectionHeading><div className="process-grid">{[["01", "Tell us your vision", "Share your celebration, guest numbers and the experience you have in mind."], ["02", "We explore the details", "Dessert options and presentation can be discussed around your event."], ["03", "Let the moment unfold", "If the concept is right for your event, we can discuss the next steps together."]].map(([number, title, description]) => <Reveal className="process-step" key={number}><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p></Reveal>)}</div></div></section>

      <section className="gallery-preview"><div className="container"><SectionHeading eyebrow="A taste of the possibilities">A feast for<br />the <em>senses.</em></SectionHeading><div className="gallery-strip">{experiences.slice(0, 3).map((item) => <Link className="gallery-preview-item" href="/gallery" key={item.id}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 720px) 48vw, 32vw" style={{ objectFit: "cover" }} /><span>{item.shortName} · demonstration image</span></Link>)}</div><div className="gallery-footer"><span className="demo-caption">Demonstration photography only. Approved brand imagery to be added.</span><Link className="text-link" href="/gallery">Explore the gallery <ArrowRight size={15} /></Link></div></div></section>

      <section className="enquiry-cta"><div className="container cta-inner"><div><p className="eyebrow">Your celebration starts here</p><h2 className="section-heading">Let’s make your<br />next event <em>unforgettable.</em></h2><p className="cta-copy">Tell us what you’re celebrating. We’ll help you explore the sweetest possibilities.</p><Link className="button" href="/enquire">Plan your event <ArrowUpRight size={15} /></Link></div><svg className="cta-decoration" viewBox="0 0 180 220" fill="none" aria-hidden="true"><path d="M88 45c-39 0-61 24-53 56 7 29 35 70 53 79 18-9 46-50 53-79 8-32-14-56-53-56Z" stroke="#C9A46A" strokeWidth="1.5"/><path d="M90 47c-10-17-10-29-5-42 13 11 18 23 12 43M83 51C66 34 53 31 40 34c10 15 22 22 39 23m19-5c12-17 26-22 41-19-8 16-21 24-39 27" stroke="#D98A98" strokeWidth="1.5" strokeLinecap="round"/><path d="M67 99h.1m24-11h.1m22 19h.1m-37 26h.1m26 18h.1" stroke="#C9A46A" strokeWidth="4" strokeLinecap="round"/></svg></div></section>
    </main>
  );
}
