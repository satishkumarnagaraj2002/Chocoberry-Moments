import { brand } from "@/config/brand";

export function EntrySplash() {
  return <div className="entry-splash" aria-hidden="true"><div className="entry-splash-lockup"><span>{brand.name}</span><small>{brand.descriptor}</small><i /></div></div>;
}