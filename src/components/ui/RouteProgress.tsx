"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const startedRef = useRef(false);
  const trickleRef = useRef<number | null>(null);
  const hideRef = useRef<number | null>(null);

  const clearTrickle = () => {
    if (trickleRef.current !== null) {
      window.clearInterval(trickleRef.current);
      trickleRef.current = null;
    }
  };

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    if (hideRef.current !== null) {
      window.clearTimeout(hideRef.current);
      hideRef.current = null;
    }
    setVisible(true);
    setProgress(8);
    clearTrickle();
    // Trickle toward 90% so the bar feels alive while the next page loads.
    trickleRef.current = window.setInterval(() => {
      setProgress((p) => (p >= 90 ? p : Math.min(90, p + (90 - p) * 0.08 + 0.5)));
    }, 200);
  };

  const done = () => {
    if (!startedRef.current) return;
    startedRef.current = false;
    clearTrickle();
    setProgress(100);
    hideRef.current = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400);
  };

  // Begin the bar when an internal link is clicked.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");
      if (!href || (targetAttr && targetAttr !== "_self")) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // external
      if (url.pathname === window.location.pathname && url.search === window.location.search) return; // same page
      start();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Complete the bar once the new route is committed.
  useEffect(() => {
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Cleanup timers on unmount.
  useEffect(
    () => () => {
      clearTrickle();
      if (hideRef.current !== null) window.clearTimeout(hideRef.current);
    },
    []
  );

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 pointer-events-none"
      style={{
        zIndex: 10000,
        height: "2px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, rgba(201,169,110,0.35), #C9A96E)",
          boxShadow: "0 0 10px rgba(201,169,110,0.7), 0 0 4px rgba(201,169,110,0.5)",
          transition: "width 0.2s ease",
        }}
      />
    </div>
  );
}
