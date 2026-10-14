"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { galleryCategories, galleryItems } from "@/data/gallery";

export function GalleryExperience() {
  const [category, setCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const filtered = galleryItems.filter((item) => category === "All" || item.category === category);
  const current = activeIndex === null ? null : filtered[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);
  const move = useCallback((direction: number) => {
    setActiveIndex((index) => index === null ? null : (index + direction + filtered.length) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, move]);

  return <>
    <div className="gallery-filters" role="group" aria-label="Filter gallery by category">
      {galleryCategories.map((option) => <button className="gallery-filter" type="button" key={option} aria-pressed={category === option} onClick={() => { setCategory(option); setActiveIndex(null); }}>{option}</button>)}
    </div>
    <div className="gallery-grid">
      {filtered.map((item, index) => <motion.button className="gallery-item" type="button" layout key={item.id} onClick={() => setActiveIndex(index)} aria-label={`Open image: ${item.title}`}>
        <div className="gallery-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 720px) 46vw, 31vw" style={{ objectFit: "cover" }} /></div>
        <span className="gallery-caption"><strong>{item.title}</strong><small>{item.category} · demonstration</small></span>
      </motion.button>)}
    </div>
    <p className="demo-caption">All images are demonstration photography, not representations of Chocoberry Moments events. Replace centrally with approved brand images.</p>
    <AnimatePresence>
      {current && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={`${current.title}, gallery image`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
        <button className="lightbox-control lightbox-close" type="button" onClick={close} aria-label="Close image"><X size={21} /></button>
        <button className="lightbox-control" type="button" onClick={() => move(-1)} aria-label="Previous image"><ArrowLeft size={19} /></button>
        <div className="lightbox-image"><Image src={current.image} alt={current.alt} fill sizes="80vw" priority style={{ objectFit: "contain" }} /></div>
        <button className="lightbox-control" type="button" onClick={() => move(1)} aria-label="Next image"><ArrowRight size={19} /></button>
        <p className="lightbox-caption">{current.title} · {current.caption}</p>
      </motion.div>}
    </AnimatePresence>
  </>;
}