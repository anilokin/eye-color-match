import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "ecm-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage blocked – skip banner */
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Съгласие за бисквитки"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-4 backdrop-blur"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-card-foreground">
          Използваме бисквитки за анализ на трафика и за персонализирани реклами чрез Google
          AdSense. Виж{" "}
          <Link to="/privacy" className="text-primary underline">
            политиката за поверителност
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button
            onClick={() => decide("rejected")}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-card-foreground transition active:scale-95"
          >
            Откажи
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition active:scale-95"
            style={{ background: "var(--gradient-primary)" }}
          >
            Приемам
          </button>
        </div>
      </div>
    </div>
  );
}
