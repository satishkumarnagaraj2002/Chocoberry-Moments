import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, children, className = "" }: { eyebrow: string; children: ReactNode; className?: string }) {
  return <div className={className}><p className="eyebrow">{eyebrow}</p><h2 className="section-heading">{children}</h2></div>;
}