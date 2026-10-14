import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import { Logo } from "@/components/layout/Logo";

const footerLinks = [["Home", "/"], ["Experiences", "/experiences"], ["Occasions", "/occasions"], ["Gallery", "/gallery"], ["Our Story", "/about"], ["Plan your event", "/enquire"], ["Privacy", "/privacy"]] as const;

export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div className="footer-brand"><Logo /><p>{brand.tagline}</p><a className="text-link" href={brand.parentWebsite} target="_blank" rel="noreferrer">{brand.parentLabel} <ArrowUpRight size={14} /></a></div>
      <div><h2 className="footer-title">Discover</h2><nav className="footer-links" aria-label="Footer navigation">{footerLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></div>
      <div><h2 className="footer-title">A note from us</h2><div className="footer-links"><span>Proposed live dessert experiences</span><span>Event details are discussed individually</span><a href={brand.parentWebsite} target="_blank" rel="noreferrer">Visit Chocoberry <ArrowUpRight size={13} /></a></div></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Chocoberry Moments</span><span>Making Every Moment Sweeter.</span><span>Privacy-first. No tracking cookies.</span></div>
  </div></footer>;
}