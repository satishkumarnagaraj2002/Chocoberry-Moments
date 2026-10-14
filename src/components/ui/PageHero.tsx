import Image from "next/image";

export function PageHero({ eyebrow, title, subtitle, image, alt }: { eyebrow: string; title: React.ReactNode; subtitle: string; image: string; alt: string }) {
  return <section className="page-hero"><div className="page-hero-media"><Image src={image} alt={alt} fill priority sizes="100vw" style={{ objectFit: "cover" }} /></div><div className="container page-hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{subtitle}</p></div></section>;
}