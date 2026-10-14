"use client";

import { Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallButton() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [instructions, setInstructions] = useState("Use your browser's install option to add Chocoberry Moments to your device.");

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => setInstallPrompt(null);
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!helpOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setHelpOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [helpOpen]);

  const install = async () => {
    if (!installPrompt) {
      const platform = navigator.userAgent;
      if (/iPad|iPhone|iPod/.test(platform)) {
        setInstructions("In Safari, tap Share, then choose Add to Home Screen.");
      } else if (/Android/.test(platform)) {
        setInstructions("Open your browser menu and choose Install app or Add to Home screen.");
      }
      setHelpOpen(true);
      return;
    }
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return <>
    <button className="install-link" type="button" onClick={install}><Smartphone size={15} aria-hidden="true" /> Get the app</button>
    {helpOpen && <div className="install-help-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setHelpOpen(false); }}>
      <section className="install-help" role="dialog" aria-modal="true" aria-labelledby="install-help-title">
        <button className="install-help-close" type="button" onClick={() => setHelpOpen(false)} aria-label="Close installation instructions"><X size={19} /></button>
        <p className="eyebrow">Chocoberry Moments</p>
        <h2 id="install-help-title">Take us with you.</h2>
        <p>{instructions}</p>
      </section>
    </div>}
  </>;
}
