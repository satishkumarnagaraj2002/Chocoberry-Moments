import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand-lockup" href="/" aria-label="Chocoberry Moments home">
      <svg className="brand-mark" viewBox="0 0 40 44" role="img" aria-label="Strawberry flourish">
        <path d="M20 15C10 15 5 21 7 28c2 7 8 13 13 14 5-1 11-7 13-14 2-7-3-13-13-13Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 16c-4-5-8-6-11-5 2 3 5 5 9 6m3-1c3-5 6-7 10-7-1 4-4 7-9 8m-3-3c-1-5 0-9 2-12 3 4 3 8 1 12" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M14 25h.1m6-3h.1m6 5h.1m-10 7h.1m8-1h.1" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="brand-type"><span>CHOCOBERRY</span><span>MOMENTS</span><small>LIVE DESSERT EXPERIENCES</small></span>
    </Link>
  );
}