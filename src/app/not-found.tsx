import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="not-found"><div><p className="eyebrow" style={{ justifyContent: "center" }}>A little detour</p><h1>Not found.</h1><p className="section-copy" style={{ margin: "0 auto 2rem" }}>This page isn’t part of the celebration. Let’s find something sweeter.</p><Link className="button" href="/">Return home <ArrowUpRight size={15} /></Link></div></main>;
}